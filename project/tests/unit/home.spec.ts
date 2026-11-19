import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";

import Home from "@/views/Home/index.vue";

// Vitest文档 https://vitest.dev/ Vue Test Utils文档 https://test-utils.vuejs.org/
describe("Home", () => {
  it("渲染主页标题和副标题", () => {
    const wrapper = mount(Home, {
      global: { plugins: [createPinia()] },
    });
    expect(wrapper.text()).toContain("XUX的Github主页");
    expect(wrapper.text()).toContain("2026-11");
  });
});
