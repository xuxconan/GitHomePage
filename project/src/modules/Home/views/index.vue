<script setup lang="ts">
import { useHomeStore } from "../store";

const home = useHomeStore();

// 封面入口按钮：后续新增演示页在这里追加即可
const entries = [
  {
    label: "管理后台",
    desc: "Admin Demo",
    to: "/admin",
  },
];
</script>

<template>
  <main class="home">
    <header class="home__header">
      <h1>{{ home.title }}</h1>
      <p>{{ home.subtitle }}</p>
    </header>
    <!-- 滚动视口：高度固定为可见行数，按钮多出时上下滑动 -->
    <nav class="home__viewport" aria-label="演示入口">
      <ul class="entry-grid">
        <li v-for="entry in entries" :key="entry.to">
          <RouterLink class="entry-btn" :to="entry.to">
            <span class="entry-btn__label">{{ entry.label }}</span>
            <span class="entry-btn__desc">{{ entry.desc }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </main>
</template>

<style lang="scss" scoped>
@import url("./styles/index@default.scss");
@import url("./styles/index@min_ratio_2x3.scss");
@import url("./styles/index@min_ratio_4x3.scss");
@import url("./styles/index@min_ratio_15x9.scss");
</style>
