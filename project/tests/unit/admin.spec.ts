import { describe, expect, it } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";

import Admin from "@/modules/Admin/views/index.vue";

// 用memory history构建可跳转的嵌套路由环境
async function mountAdminAtAdmin() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", name: "home", component: { template: "<div>home</div>" } },
      {
        path: "/admin",
        name: "admin",
        component: Admin,
        children: [
          { path: "erp", name: "erp", component: { template: "<div>erp</div>" } },
          { path: "mes", name: "mes", component: { template: "<div>mes</div>" } },
          { path: "plm", name: "plm", component: { template: "<div>plm</div>" } },
        ],
      },
    ],
  });
  await router.push("/admin");
  await router.isReady();
  const wrapper = mount(Admin, { global: { plugins: [router] } });
  return { router, wrapper };
}

describe("Admin", () => {
  it("父路由渲染子模块入口按钮", async () => {
    const { wrapper } = await mountAdminAtAdmin();
    expect(wrapper.text()).toContain("ERP");
    expect(wrapper.text()).toContain("MES");
    expect(wrapper.text()).toContain("PLM");
  });

  it("点击子模块入口跳转嵌套路径", async () => {
    const { router, wrapper } = await mountAdminAtAdmin();
    const erpLink = wrapper.findAll("a").find((a) => a.text().includes("ERP"));
    expect(erpLink).toBeTruthy();
    await erpLink!.trigger("click");
    await flushPromises();
    expect(router.currentRoute.value.path).toBe("/admin/erp");
  });
});
