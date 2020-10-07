// pages/cart/index.js
Page({
  data: {
    address: {},
    cartGoods: []
  },
  onShow() {
    // 获取缓存地址信息
    const address = wx.getStorageSync("address");
    //获取缓存中购物车数据
    const cartGoods = wx.getStorageSync("cartGoods");
    this.setData({
      address,
      cartGoods
    })
  },
  onLoad: function (options) {

  },
  // 获取地址
  chooseAddress() {
    wx.chooseAddress({
      success: (res) => {
        res.all = res.provinceName + res.cityName + res.countyName + res.detailInfo;
        wx.setStorageSync("address", res);
      }
    });
  }
})
