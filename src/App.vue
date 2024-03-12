<template>
  <div class="tree">
    <Tree />
  </div>
  <div class="content">
    <Flow />
  </div>
  <div class="nodeInfo">
     <p>节点信息</p>
  </div>
</template>
<script lang="ts" setup>
import Tree from "./components/Tree.vue";
import Flow from "./components/Flow.vue";

import { zh_CN, Faker } from '@faker-js/faker';
const faker = new Faker({
  locale: [zh_CN],
});
console.log(faker.animal.bear());
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
.tree {
  width: 200px;
  border-right: 1px solid #999;
}
.content {
  width: calc(100% - 500px);
}
.nodeInfo {
  width: 300px;
  border-left: 1px solid #999;
}
</style>