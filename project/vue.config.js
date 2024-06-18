const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  publicPath: process.env.BASE_URL,
  outputDir: "../website",
});
