<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

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
    <p class="admin__placeholder">管理后台 Demo（建设中）</p>
  </main>
</template>

<style lang="scss" scoped>
@import url("./styles/index@default.scss");
</style>
