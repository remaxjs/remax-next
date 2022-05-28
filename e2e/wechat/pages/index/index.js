// index.js
// 获取应用实例
// const codeModule = require('../../h5code/react');
const mp = require('miniprogram-render');
const app = getApp();

Page({
  data: {
    motto: 'Hello World',
  },
  // 事件处理函数
  bindViewTap() {},
  onLoad() {
    const { window, document, pageId } = mp.createPage('index', {
      optimization: {},
      runtime: {},
    });

    require('../../h5code/remax-vendors')(window, document);
    require('../../h5code/index')(window, document);

    console.log(window);

    this.setData({
      pageId,
    });
  },
});
