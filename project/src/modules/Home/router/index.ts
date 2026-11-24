import type { SubRouter } from "@/router/subRouter";

const useRoutes = async () => {
  const routes = [
    {
      path: "/",
      name: "home",
      component: () => import("../views/index.vue"),
    },
  ];
  return routes;
};

const beforeEach: SubRouter["beforeEach"] = async (to, from) => {};

const afterEach: SubRouter["afterEach"] = async (to, from, failure) => {};

export default { useRoutes, beforeEach, afterEach } satisfies SubRouter;
