/// <reference types="vitest/config" />
import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// Vite中文文档 https://cn.vitejs.dev/config/
// vite-plugin-pwa文档 https://vite-pwa-org.netlify.app/
export default defineConfig(({ mode }) => {
  // 读取对应mode的.env文件（.env / .env.prod / .env.github）
  const env = loadEnv(mode, fileURLToPath(new URL(".", import.meta.url)));

  return {
    // 部署子路径，来自各环境文件的VITE_BASE
    base: env.VITE_BASE ?? "/",
    plugins: [
      vue(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.ico", "robots.txt"],
        manifest: {
          name: "XUX的Github主页",
          short_name: "XUX主页",
          display: "standalone",
          theme_color: "#4DBA87",
          background_color: "#ffffff",
          icons: [
            {
              src: "img/icons/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "img/icons/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "img/icons/android-chrome-maskable-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "img/icons/android-chrome-maskable-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,png,svg,ico,webmanifest}"],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      // 产物输出到仓库的website目录，由GitHub Actions部署
      outDir: "../website",
      emptyOutDir: true,
    },
    test: {
      environment: "jsdom",
    },
  };
});
