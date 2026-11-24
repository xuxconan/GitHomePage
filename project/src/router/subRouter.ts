import type {
  NavigationFailure,
  NavigationGuardReturn,
  RouteLocationNormalized,
  RouteLocationNormalizedGeneric,
  RouteRecordName,
  RouteRecordRaw,
} from "vue-router";

// 子模块路由协议：每个模块的 router/index.ts 导出该结构，由上层聚合
// 守卫为返回值式（不接触next，由顶层统一转换）：
//   返回 false = 拦截导航；返回路由地址 = 重定向；返回 undefined = 无意见放行
export interface SubRouter {
  useRoutes: () => Promise<Array<RouteRecordRaw>>;
  beforeEach: (
    to: RouteLocationNormalized,
    from: RouteLocationNormalizedGeneric
  ) => Promise<NavigationGuardReturn | void>;
  afterEach: (
    to: RouteLocationNormalized,
    from: RouteLocationNormalizedGeneric,
    failure: NavigationFailure | void | undefined
  ) => Promise<void>;
}

// 聚合子模块路由：加载失败的模块会上报并跳过，重名路由仅保留首个
export const collectSubRoutes = async (subRouters: Array<SubRouter>) => {
  const reses = await Promise.allSettled(
    subRouters.map((r) => r.useRoutes())
  );
  const routes: Array<RouteRecordRaw> = [];
  const names = new Set<RouteRecordName>();
  reses.forEach((res) => {
    if (res.status === "rejected") {
      console.error("子模块路由加载失败", res.reason);
      return;
    }
    res.value?.forEach((route) => {
      if (!route.name) {
        console.warn("不存在路由名！", route);
        return;
      }
      if (names.has(route.name)) {
        console.warn("路由名重复，仅保留首个", route.name);
        return;
      }
      names.add(route.name);
      routes.push(route);
    });
  });
  return routes;
};
