import { describe, expect, it } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";

import Admin from "@/modules/Admin/views/index.vue";

// 用memory history构建可跳转的路由环境
async function mountAdminAtAdmin() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", component: { template: "<div>home</div>" } },
      { path: "/admin", name: "admin", component: Admin },
    ],
  });
  await router.push("/admin");
  await router.isReady();
  const wrapper = mount(Admin, { global: { plugins: [router] } });
  return { router, wrapper };
}

describe("Admin", () => {
  it("渲染返回按钮和占位文案", async () => {
    const { wrapper } = await mountAdminAtAdmin();
    expect(wrapper.find("button").text()).toContain("返回封面");
    expect(wrapper.text()).toContain("管理后台 Demo");
  });

  it("无站内来历时点击返回按钮跳转首页", async () => {
    // jsdom下history.state无back字段，应走push("/")分支
    const { router, wrapper } = await mountAdminAtAdmin();
    await wrapper.find("button").trigger("click");
    await flushPromises();
    expect(router.currentRoute.value.path).toBe("/");
  });
});
