import { request } from "../../request/index";
Page({
  data: {
    swiperList: []
  },
  //options(Object)
  onLoad: function (options) {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
    }).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  }
});

