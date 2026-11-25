<script setup lang="ts">
import ButtonLayout from "@/components/ButtonLayout/index.vue";

import { useHomeStore } from "../store";

const home = useHomeStore();

// 封面入口按钮：后续新增演示页在这里追加即可
const routes = [
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
    <ButtonLayout :routes="routes" aria-label="演示入口" />
  </main>
</template>

<style lang="scss" scoped>
@import url("./styles/index@default.scss");
@import url("./styles/index@min_ratio_2x3.scss");
@import url("./styles/index@min_ratio_4x3.scss");
@import url("./styles/index@min_ratio_15x9.scss");
</style>
