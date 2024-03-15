<template>
    <div :class="$style.box">
        <p :class="$style.tools">
            <span>工具栏 <a-button type="primary" @click="handleSave">保存到本地</a-button><a-button
                    @click="handleClear">清除本地缓存</a-button></span>
            <span>
                <ExpandAltOutlined :class="$style.icon" @click="enter" />
                <MinusCircleOutlined :class="$style.icon" />
                <span :class="$style.num">100%</span>
                <PlusCircleOutlined :class="$style.icon" />
            </span>
        </p>
        <div :class="$style.draw" ref="flowDom" class="drag"></div>
    </div>
</template>
<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { Graph, Path, Shape } from "@antv/x6";
import { useFullscreen } from "@vueuse/core";
import { debounce } from "lodash";
import { ExpandAltOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { useGetTreeItem } from "./treeItem.js";
import { generateRandomString } from "../utils";
const graph = ref();
const nodeList = [];
const lineList = [];
(function(){
    
})()
onMounted(() => {
    graph.value = new Graph({
        grid: true,
        background: {
            color: "#fffefa",
        },
        container: document.querySelector(".drag"),
        interacting: true,
        panning: {
            enabled: true,
            eventTypes: ["leftMouseDown", "mouseWheel"],
        },
        mousewheel: {
            enabled: true,
            modifiers: "ctrl",
            factor: 1.1,
            maxScale: 1.5,
            minScale: 0.5,
        },
        connecting: {
            snap: true,
            allowBlank: false,
            allowLoop: false,
            highlight: true,
            // connector: "algo-connector",
            connectionPoint: "boundary",
            anchor: "midSide",
            validateMagnet({ magnet }) {
                // return magnet.getAttribute('port-group') !== 'top'
                // 限制连线配置
                return true;
            },
            // createEdge() {
            //     return graph.value.createEdge({
            //         shape: "dag-edge",
            //         attrs: {
            //             line: {
            //                 strokeDasharray: "5 5",
            //                 targetMarker: {
            //                     name: "block",
            //                     width: 12,
            //                     height: 8,
            //                 },
            //             },
            //         },
            //         zIndex: -1,
            //     });
            // },
        },
        keyboard: true,
    })

    graph.value.on("node:mousemove", ({ e, x, y, node, view }) => {
        const item = graph.value.toJSON().cells.find((item) => item.id === node.id);
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].id === item.id) {
                nodeList.splice(i, 1, item)
                break;
            }
        }
    })

    const nodes = JSON.parse(localStorage.getItem("graghNode"));
    if (Array.isArray(nodes)) {
        nodes.forEach((item) => {
            graph.value.addNode(item);
            nodeList.push(item);
        })
    }

    // 获取画布元素
    const canvas = graph.value.container;

    // 阻止默认的拖放行为
    canvas.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    canvas.addEventListener("dragenter", (e) => {
        e.preventDefault();
    });
    canvas.addEventListener("dragleave", (e) => {
        e.preventDefault();
    });
    const { getItems } = useGetTreeItem();
    canvas.addEventListener("drop", (e) => {
        const id = generateRandomString(15);
        const p = graph.value.pageToLocal(e.x, e.y);
        const json = {
            id,
            shape: 'rect', // 指定使用何种图形，默认值为 'rect'
            x: 100,
            y: 200,
            width: 200,
            height: 40,
            attrs: {
                body: {
                    fill: 'blue',
                },
                label: {
                    text: getItems().title,
                    fill: 'white',
                },
            },
            data: getItems(),
            ports: {
                groups: {
                    // 输入链接桩群组定义
                    in: {
                        position: 'top',
                        attrs: {
                            circle: {
                                r: 4,
                                magnet: true,
                                stroke: '#31d0c6',
                                strokeWidth: 1,
                                fill: '#fff',
                            },
                        },
                    },
                    // 输出链接桩群组定义
                    out: {
                        position: 'bottom',
                        attrs: {
                            circle: {
                                r: 4,
                                magnet: true,
                                stroke: '#31d0c6',
                                strokeWidth: 1,
                                fill: '#fff',
                            },
                        },
                    },
                },
                items: getItems().ports,
            },
        }
        graph.value.addNode(Object.assign({}, json, p));
        const node = graph.value.toJSON().cells.find((item) => item.id === id);
        nodeList.push(node)
    });
})

const handleSave = function () {
    if (nodeList.length) {
        localStorage.setItem("graghNode", JSON.stringify(nodeList));
        message.success("保存成功")
    } else {
        message.warn("暂无数据")
    }
}
const handleClear = function () {
    localStorage.clear()
    message.success("清除成功")
}
//////////////////////////////////////////
const flowDom = ref(null);
const { enter } = useFullscreen(flowDom);
//////////////////////////////////////////////
const refresh = debounce(() => {
    const dom = document.getElementById("container");
    //画布重绘
    if (dom) {
        graph.value.resize(dom.offsetWidth, dom.offsetHeight - 40);
        const timer = setTimeout(() => {
            graph.value.centerContent();
            clearTimeout(timer);
        });
    }
}, 10);

onUnmounted(() => {
    refresh.cancel();
});

onMounted(() => {
    window.addEventListener("resize", refresh);
});
window.removeEventListener("resize", refresh);
/////////////////////////////////////////
</script>

<style module>
.box {
    width: 100%;
    height: 100%;
}

.tools {
    height: 40px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #999;
    margin-bottom: 0;
}

.icon {
    cursor: pointer;
    margin-left: 20px;
}

.num {
    padding-left: 20px;
}

.draw {
    width: 100%;
    height: calc(100% - 40px);
}
</style>