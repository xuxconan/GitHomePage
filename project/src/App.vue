<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import NavBar from "@/components/NavBar/index.vue";

const route = useRoute();

// 除封面(home)外的页面显示全局导航栏（面包屑）
const showNavBar = computed(() => route.name !== "home");
</script>

<template>
  <NavBar v-if="showNavBar" />
  <RouterView />
</template>
