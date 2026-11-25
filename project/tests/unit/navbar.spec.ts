import { describe, expect, it } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";

import App from "@/App.vue";
import NavBar from "@/components/NavBar/index.vue";

// 构建带meta.label的嵌套路由环境
async function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: "/",
        name: "home",
        component: { template: "<div>home</div>" },
        meta: { label: "首页" },
      },
      {
        path: "/admin",
        name: "admin",
        component: { template: "<div>admin</div>" },
        meta: { label: "管理后台" },
        children: [
          {
            path: "erp",
            name: "erp",
            component: { template: "<div>erp</div>" },
            meta: { label: "ERP" },
          },
        ],
      },
    ],
  });
}

describe("NavBar", () => {
  it("按路由匹配链渲染面包屑，当前项为纯文本", async () => {
    const router = await createTestRouter();
    await router.push("/admin/erp");
    await router.isReady();
    const wrapper = mount(NavBar, { global: { plugins: [router] } });
    expect(wrapper.text()).toContain("首页");
    expect(wrapper.text()).toContain("管理后台");
    expect(wrapper.text()).toContain("ERP");
    // 首页与管理后台是可点击链接，当前项ERP不是
    expect(wrapper.findAll("a")).toHaveLength(2);
  });

  it("点击返回按钮跳转面包屑上一级", async () => {
    const router = await createTestRouter();
    await router.push("/admin/erp");
    await router.isReady();
    const wrapper = mount(NavBar, { global: { plugins: [router] } });
    const backBtn = wrapper.find(".navbar__back");
    expect(backBtn.exists()).toBe(true);
    // /admin/erp的上一级是/admin（而非浏览器历史后退）
    await backBtn.trigger("click");
    await flushPromises();
    expect(router.currentRoute.value.path).toBe("/admin");
    // /admin的上一级是首页
    await backBtn.trigger("click");
    await flushPromises();
    expect(router.currentRoute.value.path).toBe("/");
  });
});

describe("App", () => {
  it("home页不显示导航栏，其余页面显示", async () => {
    const router = await createTestRouter();
    await router.push("/");
    await router.isReady();
    const wrapper = mount(App, { global: { plugins: [router] } });
    expect(wrapper.findComponent(NavBar).exists()).toBe(false);

    await router.push("/admin/erp");
    await flushPromises();
    expect(wrapper.findComponent(NavBar).exists()).toBe(true);
  });
});
