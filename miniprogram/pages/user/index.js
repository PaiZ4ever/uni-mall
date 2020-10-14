Page({
  data: {
    userInfo: {},
    // 收藏
    collectNum: 0
  },
  onShow() {
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect") || [];

    this.setData({
      userInfo,
      collectNum: collect.length
    })
  }


})