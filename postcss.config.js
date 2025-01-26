module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue({ file }) {
        // 判断是否是element-plus的文件
        return file.indexOf("element-plus") !== -1 ? 16 : 16;
      },
      propList: ["*"],
      // 排除element-plus相关类名
      selectorBlackList: [
        ".norem",
        "el-", // 排除element-plus的类名
        ".el-", // 排除element-plus的类名
      ],
      replace: true,
      mediaQuery: false,
      minPixelValue: 1,
      // 排除node_modules下的其他文件
      exclude: /node_modules\/(?!element-plus)/,
    },
  },
};
