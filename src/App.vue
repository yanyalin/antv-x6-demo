<template>
  <div :class="$style.tree">
    <Tree />
  </div>
  <div :class="$style.content" id="container">
    <Flow />
  </div>
  <div :class="$style.nodeInfo">
     <p>节点信息</p>
  </div>
</template>
<script lang="ts" setup>
import Tree from "./components/Tree.vue";
import Flow from "./components/Flow.vue";
</script>

<style>
#app {
  height: 100%;
  padding: 0.02px;
  display: flex;
}
#app > div {
  height: 100%;
}
</style>
<style module>
.tree {
  width: 200px;
  border-right: 1px solid #999;
  overflow-y: auto;
}
.content {
  width: calc(100% - 500px);
}
.nodeInfo {
  width: 300px;
  border-left: 1px solid #999;
}
</style>