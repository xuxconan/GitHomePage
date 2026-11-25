<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import Loading from "@/components/Loading/index.vue";
import NavBar from "@/components/NavBar/index.vue";

const route = useRoute();
const router = useRouter();

// 除封面(home)外的页面显示全局导航栏（面包屑）
const showNavBar = computed(() => route.name !== "home");

// 路由切换loading：静默超过1s或用户再次点击才显示，快速加载不闪显
const loadingRef = ref<InstanceType<typeof Loading>>();
router.beforeEach(() => loadingRef.value?.show());
router.afterEach(() => loadingRef.value?.hide());
// 导航出错（如chunk加载失败）不触发afterEach，兜底隐藏
router.onError(() => loadingRef.value?.hide());
</script>

<template>
  <NavBar v-if="showNavBar" />
  <RouterView />
  <Loading ref="loadingRef" />
</template>
