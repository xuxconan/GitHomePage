<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 父路由本身（/admin）显示占位；命中子模块（ERP/MES/PLM）时渲染其页面
const isRoot = computed(() => route.name === "admin");

// 返回封面：有站内来路时后退（保留滚动位置），直接打开本页时回首页
function goBack() {
  if (window.history.state?.back) {
    router.back();
  } else {
    router.push("/");
  }
}
</script>

<template>
  <main class="admin">
    <button class="admin__back" type="button" @click="goBack">← 返回封面</button>
    <RouterView v-if="!isRoot" class="admin__content" />
    <p v-else class="admin__placeholder">管理后台 Demo（建设中）</p>
  </main>
</template>

<style lang="scss" scoped>
@import url("./styles/index@default.scss");
</style>
