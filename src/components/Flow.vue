<template>
    <div :class="$style.box">
        <p :class="$style.tools">
            <span>工具栏</span>
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
import { onMounted, ref } from "vue";
import { Graph, Path, Shape } from "@antv/x6";
import { useFullscreen } from "@vueuse/core";
import { ExpandAltOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons-vue";
const graph = ref();
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
            connector: "algo-connector",
            connectionPoint: "boundary",
            anchor: "midSide",
            validateMagnet({ magnet }) {
                // return magnet.getAttribute('port-group') !== 'top'
                // 限制连线配置
                return true;
            },
            createEdge() {
                return graph.value.createEdge({
                    shape: "dag-edge",
                    attrs: {
                        line: {
                            strokeDasharray: "5 5",
                            targetMarker: {
                                name: "block",
                                width: 12,
                                height: 8,
                            },
                        },
                    },
                    zIndex: -1,
                });
            },
        },
        keyboard: true,
    })
})

const flowDom = ref(null);
const { enter, exit } = useFullscreen(flowDom);
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
    height: calc(100% - 40px);
}
</style>