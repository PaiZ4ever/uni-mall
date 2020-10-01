// pages/cart/index.js
Page({
  data: {
    cartGoods: []
  },
  onLoad: function (options) {
    let cartGoods = wx.getStorageSync("cartGoods") || [];
    this.setData({
      cartGoods
    })
  },
})