import {
  createRouter,
  createWebHistory,
  isNavigationFailure,
  NavigationFailureType,
} from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import homeRouter from "@/modules/Home/router";
import adminRouter from "@/modules/Admin/router";
import { collectSubRoutes } from "./subRouter";

const subRouters = [homeRouter, adminRouter];

// Vue Router中文文档 https://router.vuejs.org/zh/
const routes: Array<RouteRecordRaw> = [
  {
    path: "/401",
    name: "401",
    component: () => import("../views/401/index.vue"),
  },
  {
    path: "/403",
    name: "403",
    component: () => import("../views/403/index.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404/index.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("../views/500/index.vue"),
  },
  // 兜底：未匹配任何路由的路径渲染404（vue-router按特异性匹配，通配路由永远最后命中）
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/404/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 串行短路执行子模块守卫：第一个给出明确意见的模块说了算（顺序即subRouters顺序）
router.beforeEach(async (to, from) => {
  try {
    for (const sub of subRouters) {
      const result = await sub.beforeEach(to, from);
      if (result !== undefined) return result;
    }
  } catch (err: any) {
    console.error("从", from, "到", to, "路由守卫出现错误！", err);
    // 守卫本身出错时拦截导航，避免带错误状态进入页面
    return false;
  }
});

router.afterEach(async (to, from, failure) => {
  try {
    for (const sub of subRouters) {
      await sub.afterEach(to, from, failure);
    }
    if (!failure) return;
    if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
      console.warn("从", from, "到", to, "路由被阻止", failure);
    } else if (isNavigationFailure(failure, NavigationFailureType.cancelled)) {
      console.warn("从", from, "到", to, "路由已取消", failure);
    } else if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
      console.warn("从", from, "到", to, "路由已到达", failure);
    } else {
      console.error("从", from, "到", to, "路由出现未知错误", failure);
    }
  } catch (err: any) {
    console.error("路由出现错误！", err);
  }
});

const initRoutes = async () => {
  const subRoutes = await collectSubRoutes(subRouters);
  subRoutes.forEach((route) => {
    if (!route.name) return console.warn("不存在路由名！", route);
    if (router.hasRoute(route.name)) return console.warn("路由已存在", route);
    router.addRoute(route);
  });
};

export default router;

export { initRoutes };
