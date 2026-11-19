/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

// 自定义环境变量类型声明
interface ImportMetaEnv {
  /** 部署子路径，如 /GitHomePage/ */
  readonly VITE_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
