import { defineStore } from "pinia";

// Pinia中文文档 https://pinia.vuejs.org/zh/
// 主页文案等全局状态集中在这里管理，方便后续扩展
export const useHomeStore = defineStore("home", {
  state: () => ({
    title: "XUX的Github主页",
    subtitle: "2026-11 重建中",
  }),
});
