<script setup lang="ts">
import RouteButton from "@/components/RouteButton/index.vue";

// 入口按钮数据：由使用方页面传入（封面传演示入口，admin传子模块入口）
export interface RouteItem {
  to: string;
  label: string;
  desc?: string;
}

defineProps<{
  routes: RouteItem[];
}>();
</script>

<template>
  <!-- 滚动视口：高度固定为可见行数，按钮多出时上下滑动；aria-label等透传到nav -->
  <nav class="layout-viewport">
    <ul class="button-layout">
      <li v-for="route in routes" :key="route.to">
        <RouteButton :to="route.to" :label="route.label" :desc="route.desc" />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import url("./styles/index@default.scss");
@import url("./styles/index@min_ratio_2x3.scss");
@import url("./styles/index@min_ratio_4x3.scss");
@import url("./styles/index@min_ratio_15x9.scss");
</style>
