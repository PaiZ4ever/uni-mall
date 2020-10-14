import {
  request
} from "../../request/index";
Page({
  data: {
    tabs: [{
      id: 0,
      value: "综合",
      isActive: true
    }, {
      id: 1,
      value: "销量",
      isActive: false
    }, {
      id: 2,
      value: "价格",
      isActive: false
    }],
    goodsList: []
  },

  // 接口需要的参数
  Query: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  //总页数
  totalPages: 1,

  onLoad: function (options) {
    this.Query.cid = options.cid || "";
    this.Query.query = options.query || "";
    this.getGoodsList();
  },

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: '/goods/search',
      data: this.Query
    });
    //获取总条数来计算总页数判断触底是否下一页
    const total = res.data.message.total;
    this.totalPages = Math.ceil(total / this.Query.pagesize);
    this.setData({
      //拼接数组，不然是重新10条，下拉刷新不成功
      goodsList: [...this.data.goodsList, ...res.data.message.goods]
    })

    //关闭下拉刷新窗口
    wx.stopPullDownRefresh();

  },

  //标题点击事件，子组件传值
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

  // 页面上划 滚动条触底事件
  onReachBottom() {
    if (this.Query.pagenum >= this.totalPages) {
      //消息提示框
      wx.showToast({
        title: '没有下一页数据了'
      });
    } else {
      this.Query.pagenum++;
      this.getGoodsList();
    }
  },

  //下拉刷新事件
  onPullDownRefresh() {
    //重置数组
    this.setData({
      goodsList: []
    });
    //重置页码
    this.Query.pagenum = 1;
    //发送请求
    this.getGoodsList();
  }
})