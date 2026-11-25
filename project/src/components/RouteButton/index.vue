<script setup lang="ts">
defineProps<{
  // 跳转目标路由路径
  to: string;
  // 按钮主文字
  label: string;
  // 按钮副文字（可选）
  desc?: string;
}>();
</script>

<template>
  <RouterLink class="route-btn" :to="to">
    <span class="route-btn__label">{{ label }}</span>
    <span v-if="desc" class="route-btn__desc">{{ desc }}</span>
  </RouterLink>
</template>

<style lang="scss" scoped>
@import url("./styles/index@default.scss");
</style>
