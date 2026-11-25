import type { SubRouter } from "@/router/subRouter";

const useRoutes = async () => {
  const routes = [
    {
      // 相对路径：作为/admin的子路由，最终URL为/admin/mes
      path: "mes",
      name: "mes",
      component: () => import("../views/index.vue"),
      // NavBar面包屑展示名
      meta: { label: "MES" },
    },
  ];
  return routes;
};

const beforeEach: SubRouter["beforeEach"] = async (to, from) => {};

const afterEach: SubRouter["afterEach"] = async (to, from, failure) => {};

export default { useRoutes, beforeEach, afterEach } satisfies SubRouter;
