# git_home_page

XUX 的 Github 个人主页，Vue 3 + Vite + Pinia + TypeScript + PWA。

## 技术栈

| 项 | 说明 |
| --- | --- |
| 构建 | Vite 7 |
| 框架 | Vue 3（SFC + `<script setup>` + TS） |
| 状态 | Pinia |
| 单测 | Vitest + @vue/test-utils |
| PWA | vite-plugin-pwa |

## Project setup

```
npm install
```

### 本地开发（hot-reload）

```
npm run dev
```

### 单元测试 / 类型检查 / lint

```
npm run test
npm run type-check
npm run lint
```

### 打包部署

```
npm run build:github
```

构建产物输出到仓库根目录的 `website/`，提交并 push 到 `master` 后由
GitHub Actions 自动部署到 GitHub Pages。

## 目录说明

```
project/
├── public/          静态资源（图标、robots.txt）
├── src/
│   ├── App.vue      根组件
│   ├── main.ts      入口（装配 Pinia / Router / PWA）
│   ├── router/      路由
│   ├── store/       Pinia 状态
│   ├── styles/      全局样式
│   └── views/Home/  主页
├── tests/unit/      单元测试
└── index.html       Vite 入口页面
```
