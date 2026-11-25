<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { RouteRecordName } from "vue-router";

const route = useRoute();
const router = useRouter();

interface Crumb {
  label: string;
  name: RouteRecordName;
}

// 面包屑：首页固定在首位，其后取路由匹配链（route.matched）的meta.label，无label的层级跳过
const crumbs = computed<Crumb[]>(() => {
  const items: Crumb[] = [{ label: "首页", name: "home" }];
  route.matched.forEach((record) => {
    const label = record.meta.label;
    if (!label || record.name === "home") return;
    items.push({ label, name: record.name });
  });
  return items;
});

// 返回上级：跳转面包屑的前一级（顶层页面无上级时回首页）
function goBack() {
  const target = crumbs.value[crumbs.value.length - 2] ?? crumbs.value[0];
  router.push({ name: target.name });
}
</script>

<template>
  <nav class="navbar" aria-label="面包屑导航">
    <button class="navbar__back" type="button" aria-label="返回上一页" @click="goBack">←</button>
    <template v-for="(crumb, i) in crumbs" :key="String(crumb.name)">
      <span v-if="i > 0" class="navbar__separator" aria-hidden="true">›</span>
      <!-- 非当前项可点击跳转，当前项为纯文本 -->
      <RouterLink v-if="i < crumbs.length - 1" class="navbar__crumb" :to="{ name: crumb.name }">
        {{ crumb.label }}
      </RouterLink>
      <span v-else class="navbar__crumb navbar__crumb--current">{{ crumb.label }}</span>
    </template>
  </nav>
</template>

<style lang="scss" scoped>
@import url("./styles/index@default.scss");
</style>
