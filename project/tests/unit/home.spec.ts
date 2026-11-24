import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { createMemoryHistory, createRouter, RouterLink } from "vue-router";

import Home from "@/modules/Home/views/index.vue";

// Vitest文档 https://vitest.dev/ Vue Test Utils文档 https://test-utils.vuejs.org/
function mountHome() {
  // RouterLink需要router上下文，用memory history避免依赖浏览器地址
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", component: Home },
      { path: "/admin", component: { template: "<div>admin</div>" } },
    ],
  });
  return mount(Home, {
    global: { plugins: [router, createPinia()] },
  });
}

describe("Home", () => {
  it("渲染主页标题和副标题", () => {
    const wrapper = mountHome();
    expect(wrapper.text()).toContain("XUX的Github主页");
    expect(wrapper.text()).toContain("2026-11");
  });

  it("包含跳转管理后台的入口按钮", () => {
    const wrapper = mountHome();
    const link = wrapper.findComponent(RouterLink);
    expect(link.exists()).toBe(true);
    expect(link.props("to")).toBe("/admin");
    expect(link.text()).toContain("管理后台");
  });
});
