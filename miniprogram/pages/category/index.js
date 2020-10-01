import {
  request
} from "../../request/index";
Page({
  data: {
    //左侧菜单
    leftMenuList: [],
    //右侧商品
    rightProduct: [],
    //点击索引
    currentIndex: 0,
    //滚动条距离顶部的距离
    scrollTop: 0
  },

  //接口返回数据
  Cates: [],

  //options(Object)
  onLoad: function (options) {
    //缓存，先判断有没有旧数据(未过期)来判断是否请求
    //1.获取本地存储
    const Cates = wx.getStorageSync("cates");
    //2.判断
    if (!Cates) {
      this.getCates();
    } else {
      if (Date.now() - Cates.time > 1000 * 50) {
        this.getCates();

      } else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightProduct = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightProduct
        })
      }
    }


  },
  /**
    // 获取分类数据
    getCates() {
      request({
        url: '/categories'
      }).then(res => {
        this.Cates = res.data.message;
        //把接口数据存入本地存储(与web不同value值可以不为字符串)
        wx.setStorageSync("cates", {
          time: Date.now(),
          data: this.Cates
        });
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightProduct = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightProduct
        })

      })
    },
  **/

  //async写法 es7
  async getCates() {
    const res = await request({
      url: '/categories'
    });
    this.Cates = res.data.message;
    //把接口数据存入本地存储(与web不同value值可以不为字符串)
    wx.setStorageSync("cates", {
      time: Date.now(),
      data: this.Cates
    });
    let leftMenuList = this.Cates.map(v => v.cat_name);
    let rightProduct = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightProduct
    })
  },

  //左侧栏点击事件
  itemTap(e) {
    let {
      index
    } = e.target.dataset;

    let rightProduct = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightProduct,
      //重置滚动条
      scrollTop: 0
    });

  }

});