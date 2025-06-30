const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: [
    // 强制 babel 转译 monaco-editor
    "monaco-editor",
  ],
  chainWebpack(config) {
    // 配置 monaco-editor 插件
    config.plugin("monaco").use(new MonacoWebpackPlugin());

    // 配置 Vue 编译时特性标志，消除警告
    config.plugin("define").tap((args) => {
      // 如果已经有DefinePlugin配置，合并进去
      args[0]["__VUE_PROD_HYDRATION_MISMATCH_DETAILS__"] =
        JSON.stringify(false);
      return args;
    });
  },
});
