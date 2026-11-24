import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router, { initRoutes } from "./router";

// 全局基础样式
import "./styles/index.scss";

// PWA的service worker注册，说明 https://vite-pwa-org.netlify.sh/guide/auto-update.html
import { registerSW } from "virtual:pwa-register";
registerSW({ immediate: true });

// 模块路由初始化失败时上报错误但仍挂载（静态路由+404兜底仍可用）
initRoutes()
  .catch((err) => console.error("模块路由初始化失败", err))
  .finally(() => {
    createApp(App).use(createPinia()).use(router).mount("#app");
  });
