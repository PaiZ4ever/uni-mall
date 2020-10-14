Page({
  data: {
    tabs: [{
      id: 0,
      value: "体验问题",
      isActive: true
    }, {
      id: 1,
      value: "商品、商家投诉",
      isActive: false
    }],
    chooseImages: [],
    textVal: ""
  },
  Change(e) {
    let index = e.detail.index;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          chooseImages: [...this.data.chooseImages, ...result.tempFilePaths]
        })
      }
    });
  },
  // 移除图片
  removeImg(e) {
    const { index } = e.currentTarget.dataset;
    let { chooseImages } = this.data;
    chooseImages.splice(index, 1);
    this.setData({
      chooseImages
    })
  },
  // 文本域输入事件
  handleTextInp(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  // 提交
  formSubmit() {
    const { textVal } = this.data;
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return;
    }
    this.setData({
      textVal: "",
      chooseImages: []
    })
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      mask: true,
      success: () => {
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1000)
      }
    });

  }



})