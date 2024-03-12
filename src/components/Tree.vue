<template>
    <a-tree :tree-data="treeData" default-expand-all />
</template>
<script setup lang="ts">
import type { TreeProps } from 'ant-design-vue';

const treeData: TreeProps['treeData'] = [
    {
        title: 'parent 1',
        key: '0-0',
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                children: [
                    { title: 'leaf', key: '0-0-0-0' },
                    { title: 'leaf', key: '0-0-0-1' },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [{ key: '0-0-1-0', title: 'sss' }],
            },
        ],
    },
];
</script>