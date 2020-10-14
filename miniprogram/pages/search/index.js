import {
  request
} from "../../request/index";
Page({
  data: {
    goods: [],
    // 取消按钮是否显示
    isFocus: false,
    inpValue: ""
  },
  // 全局定时器
  TimeId: -1,
  handleInput(e) {
    const { value } = e.detail;
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      return;
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);

  },
  async qsearch(query) {
    const res = await request({ url: "/goods/qsearch", data: { query } })
    this.setData({
      goods: res.data.message
    })
  },
  // 点击取消按钮
  handleCancel() {
    this.setData({
      inpValue: "",
      isFocus: false,
      goods: []
    })
  }
})