import {
  request
} from "../../request/index";
Page({
  data: {
    goodsDetail: {}
  },

  onLoad: function (options) {
    const { goods_id } = options;
    this.getGoodsDetail(goods_id)
  },

  //获取商品详情
  async getGoodsDetail(goods_id) {
    const res = await request({ url: '/goods/detail', data: { goods_id } });
    const goodsObj = res.data.message;
    this.setData({
      goodsDetail: {
        goods_small_logo: goodsObj.goods_small_logo,
        goods_id: goodsObj.goods_id,
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        pics: goodsObj.pics,
        //webp=>jpg
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg')
      }
    })
  },

  //点击轮播图放大预览
  imageTap(e) {
    //构造预览的图片数组
    const urls = this.data.goodsDetail.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      //选择被点击的图片来放大，要监听事件传值
      current,
      urls
    });
  },

  //加入购物车功能
  addGoods() {
    let cartGoods = wx.getStorageSync("cartGoods") || [];
    let decide = cartGoods.some(v => {
      if (v.goods_id === this.data.goodsDetail.goods_id) { v.num++ }
      return v.goods_id === this.data.goodsDetail.goods_id;
    })
    if (!decide) {
      this.data.goodsDetail.num = 1;
      this.data.goodsDetail.checked = true;
      cartGoods.push(this.data.goodsDetail);
    }
    wx.setStorageSync("cartGoods", cartGoods);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mask: true,
    });

  }

})