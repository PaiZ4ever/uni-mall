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
    currentIndex: 0
  },

  //接口返回数据
  Cates: [],

  //options(Object)
  onLoad: function (options) {
    this.getCates();
  },

  // 获取分类数据
  getCates() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'
    }).then(res => {
      this.Cates = res.data.message;
      let leftMenuList = this.Cates.map(v => v.cat_name);
      let rightProduct = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightProduct
      })

    })
  }

});