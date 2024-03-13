<template>
    <a-tree :tree-data="treeData" default-expand-all :selectable="false">
        <template v-slot:title="e">
            <template v-if="e.desc">
                <a-tooltip placement="rightTop">
                    <template v-slot:title>
                       <p>名字：{{ e.title }}</p>
                       <p>描述：{{ e.desc }}</p> 
                       <p>单位：{{ e.symbol }}</p>
                    </template>
                    <span :draggable="true" @dragstart="handleDraggable(e)">{{ e.title }}</span>
                </a-tooltip>
            </template>
            <template v-else>
                {{ e.title }}
            </template>
        </template>
    </a-tree>
</template>
<script setup lang="ts">
import { reactive, toRaw } from "vue";
import type { TreeProps } from 'ant-design-vue';
import { generateRandomString } from "../utils";
import { useGetTreeItem } from "./treeItem.js";
import { zh_CN, Faker } from '@faker-js/faker';
const faker = new Faker({
    locale: [zh_CN],
});

const list: { desc: string; name: string; symbol: string; }[] = reactive([]);

for (let i = 0; i < 20; i++) {
    list.push({
        ...faker.science.unit(),
        desc: faker.commerce.department()
    })
}


const treeData: TreeProps['treeData'] = reactive([
    {
        title: '节点内容',
        key: '0',
        children: [

        ],
    },
]);
list.forEach((item) => {
    treeData[0].children.push({
        title: item.name,
        key: generateRandomString(10),
        desc: item.desc,
        symbol: item.symbol
    })
})
const { setItems } = useGetTreeItem()

const handleDraggable = ({data}) => {
  setItems(data)
}
</script>

<style scoped>
p {
    margin-bottom: 0!important;
}
</style>