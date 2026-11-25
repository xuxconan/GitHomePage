import { afterEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";

import Loading from "@/components/Loading/index.vue";

// Vitest文档 https://vitest.dev/ Vue Test Utils文档 https://test-utils.vuejs.org/
// Loading默认Teleport到body，用document查询实际渲染结果
async function mountLoading(props = {}) {
  const wrapper = mount(Loading, { props });
  const vm = wrapper.vm as unknown as { show: () => void; hide: () => void };
  await flushPromises();
  return { wrapper, vm };
}

describe("Loading", () => {
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("静默期内不显示，超过delay才显示（防闪显）", async () => {
    vi.useFakeTimers();
    const { wrapper, vm } = await mountLoading({ delay: 1000 });

    vm.show();
    await flushPromises();
    expect(document.querySelector(".loading--visible")).toBeNull();

    vi.advanceTimersByTime(999);
    await flushPromises();
    expect(document.querySelector(".loading--visible")).toBeNull();

    vi.advanceTimersByTime(1);
    await flushPromises();
    expect(document.querySelector(".loading--visible")).toBeTruthy();
    wrapper.unmount();
  });

  it("静默期内用户点击屏幕立即显示", async () => {
    vi.useFakeTimers();
    const { wrapper, vm } = await mountLoading({ delay: 1000 });

    vm.show();
    await flushPromises();
    document.dispatchEvent(new Event("pointerdown"));
    await flushPromises();
    // 计时器已取消，再推进时间也不会有副作用
    vi.advanceTimersByTime(5000);
    await flushPromises();
    expect(document.querySelector(".loading--visible")).toBeTruthy();
    wrapper.unmount();
  });

  it("静默期内hide取消，完全不显示", async () => {
    vi.useFakeTimers();
    const { wrapper, vm } = await mountLoading({ delay: 1000 });

    vm.show();
    vm.hide();
    await flushPromises();
    vi.advanceTimersByTime(5000);
    await flushPromises();
    expect(document.querySelector(".loading--visible")).toBeNull();
    wrapper.unmount();
  });

  it("显示后hide移除visible类触发淡出", async () => {
    vi.useFakeTimers();
    const { wrapper, vm } = await mountLoading({ delay: 1000 });

    vm.show();
    vi.advanceTimersByTime(1000);
    await flushPromises();
    expect(document.querySelector(".loading--visible")).toBeTruthy();

    vm.hide();
    await flushPromises();
    expect(document.querySelector(".loading--visible")).toBeNull();
    wrapper.unmount();
  });

  it("mask=false时无遮罩背景类", async () => {
    const { wrapper } = await mountLoading({ mask: false });
    const el = document.querySelector(".loading");
    expect(el).toBeTruthy();
    expect(el?.classList.contains("loading--mask")).toBe(false);
    wrapper.unmount();
  });
});
