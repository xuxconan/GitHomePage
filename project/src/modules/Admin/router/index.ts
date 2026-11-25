import type { RouteRecordRaw } from "vue-router";

import { collectSubRoutes, type SubRouter } from "@/router/subRouter";

import erpRouter from "../modules/ERP/router";
import mesRouter from "../modules/MES/router";
import plmRouter from "../modules/PLM/router";

const subRouters = [erpRouter, mesRouter, plmRouter];

const useRoutes = async () => {
  const children = await collectSubRoutes(subRouters);
  const routes: Array<RouteRecordRaw> = [
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/index.vue"),
      // NavBar面包屑展示名
      meta: { label: "管理后台" },
      children,
    },
  ];
  return routes;
};

const beforeEach: SubRouter["beforeEach"] = async (to, from) => {};

const afterEach: SubRouter["afterEach"] = async (to, from, failure) => {};

export default { useRoutes, beforeEach, afterEach } satisfies SubRouter;
