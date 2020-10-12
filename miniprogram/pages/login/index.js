Page({
  loginUser(e) {
    const { userInfo } = e.detail;
    wx.setStorageSync("userInfo", userInfo);
    //返回页面
    wx.navigateBack({
      delta: 1
    });
  }
})