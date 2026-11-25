/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import "vue-router";

// 自定义环境变量类型声明
interface ImportMetaEnv {
  /** 部署子路径，如 /GitHomePage/ */
  readonly VITE_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// 路由meta字段类型声明（声明合并进vue-router的RouteMeta）
declare module "vue-router" {
  interface RouteMeta {
    /** NavBar面包屑展示名 */
    label?: string;
  }
}

