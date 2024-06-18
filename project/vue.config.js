const { defineConfig } = require("@vue/cli-service");

// PWA中文博客 https://www.cnblogs.com/LiangSenCheng/p/16702710.html
// console.log(process.env);

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  publicPath: process.env.BASE_URL,
  outputDir: "../website",

  // PWA官方配置 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
  pwa: {
    name: "XUX的Github主页",
  },

  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      // 标志位说明 https://cn.vuejs.org/api/compile-time-flags.html
      Object.assign(definitions[0], {
        // 启用/禁用选项式 API 支持。禁用此功能将减小打包结果的体积，但如果第三方库依赖选项式 API，则可能影响兼容性。
        __VUE_OPTIONS_API__: process.env.__VUE_OPTIONS_API__,
        // 在生产环境中启用/禁用开发者工具支持。启用会在打包结果中包含更多代码，因此建议仅在调试时启用此功能。
        __VUE_PROD_DEVTOOLS__: process.env.__VUE_PROD_DEVTOOLS__,
        // 启用/禁用生产环境构建下激活 (hydration) 不匹配的详细警告。启用会在打包结果中包含更多代码，因此建议仅在调试时启用此功能。
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__:
          process.env.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__,
      });
      return definitions;
    });
  },
});
