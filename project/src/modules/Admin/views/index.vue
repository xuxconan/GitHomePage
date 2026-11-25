<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import ButtonLayout from "@/components/ButtonLayout/index.vue";

const route = useRoute();

// 父路由本身（/admin）显示子模块入口，命中子模块（ERP/MES/PLM）时渲染其页面
const isRoot = computed(() => route.name === "admin");

// 子模块入口按钮
const routes = [
  {
    label: "ERP",
    desc: "企业资源计划",
    to: "/admin/erp",
  },
  {
    label: "MES",
    desc: "制造执行系统",
    to: "/admin/mes",
  },
  {
    label: "PLM",
    desc: "产品生命周期管理",
    to: "/admin/plm",
  },
];
</script>

<template>
  <main class="admin">
    <ButtonLayout v-if="isRoot" :routes="routes" aria-label="子模块入口" />
    <RouterView v-else class="admin__content" />
  </main>
</template>

<style lang="scss" scoped>
@import url("./styles/index@default.scss");
</style>
