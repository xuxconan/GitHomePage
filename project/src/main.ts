import { createApp } from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

// PWA所需服务worker
import "./registerServiceWorker";

createApp(App).use(store).use(router).mount("#app");
