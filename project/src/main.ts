import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// 全局基础样式
import "./styles/index.sass";

// PWA的service worker注册，说明 https://vite-pwa-org.netlify.sh/guide/auto-update.html
import { registerSW } from "virtual:pwa-register";
registerSW({ immediate: true });

createApp(App).use(createPinia()).use(router).mount("#app");
