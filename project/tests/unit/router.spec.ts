import { describe, expect, it } from "vitest";

import router, { initRoutes } from "@/router";

// 顶层路由聚合的集成行为：动态注册的模块路由可导航，未知路径兜底到404
describe("router", () => {
  it("initRoutes后模块路由与404兜底均可用", async () => {
    await initRoutes();

    await router.push("/");
    expect(router.currentRoute.value.name).toBe("home");

    await router.push("/admin");
    expect(router.currentRoute.value.name).toBe("admin");

    // 子模块路由应为/admin的嵌套路径而非顶层绝对路径
    await router.push("/admin/erp");
    expect(router.currentRoute.value.name).toBe("erp");
    await router.push("/admin/mes");
    expect(router.currentRoute.value.name).toBe("mes");
    await router.push("/admin/plm");
    expect(router.currentRoute.value.name).toBe("plm");

    // 未知路径应命中catch-all渲染404，而非无匹配
    await router.push("/foo");
    expect(router.currentRoute.value.name).toBe("not-found");
  });
});
