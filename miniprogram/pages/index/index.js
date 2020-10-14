import {
  request
} from "../../request/index";
Page({
  data: {
    //轮播图
    swiperList: [],
    //分类导航
    catesList: [],
    //楼层
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  //获取轮播图数据
  getSwiperList() {
    request({
      url: '/home/swiperdata'
    }).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  //获取分类导航数据 
  getCateList() {
    request({
      url: '/home/catitems'
    }).then(result => {
      this.setData({
        catesList: result.data.message
      })
    })
  },

  //获取楼层数据 
  getFloorList() {
    request({
      url: '/home/floordata'
    }).then(result => {
      for (let k = 0; k < result.data.message.length; k++) {
        result.data.message[k].product_list.forEach(v => {
          v.navigator_url = v.navigator_url.slice(0, 17) + "/index" + v.navigator_url.slice(17)
        })
      }
      this.setData({
        floorList: result.data.message
      })
    })
  }

});