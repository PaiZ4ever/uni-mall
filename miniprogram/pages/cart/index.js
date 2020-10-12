// pages/cart/index.js
Page({
  data: {
    address: {},
    cartGoods: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    // 获取缓存地址信息
    const address = wx.getStorageSync("address");
    //获取缓存中购物车数据
    const cartGoods = wx.getStorageSync("cartGoods") || [];
    // 计算全选
    // const allChecked = cartGoods.length ? cartGoods.every(v => v.checked) : false;
    // //总商品价格数量
    // let totalPrice = 0;
    // let totalNum = 0;
    // cartGoods.forEach(v => {
    //   if (v.checked) {
    //     totalPrice += v.num * v.goods_price;
    //     totalNum += v.num;
    //   }
    // });
    this.setCart(cartGoods);
    this.setData({
      address
    })
  },
  onLoad: function (options) {

  },
  // 获取地址
  chooseAddress() {
    wx.chooseAddress({
      success: (res) => {
        res.all = res.provinceName + res.cityName + res.countyName + res.detailInfo;
        wx.setStorageSync("address", res);
      }
    });
  },
  //商品选中切换
  checkChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let { cartGoods } = this.data;
    let index = cartGoods.findIndex(v => v.goods_id === goods_id);
    cartGoods[index].checked = !cartGoods[index].checked;
    this.setCart(cartGoods);

  },
  //封装设置购物车状态 进行的全选价格数量的更改
  setCart(cartGoods) {
    const allChecked = cartGoods.length ? cartGoods.every(v => v.checked) : false;
    //总商品价格数量
    let totalPrice = 0;
    let totalNum = 0;
    cartGoods.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    });
    this.setData({
      cartGoods,
      allChecked,
      totalNum,
      totalPrice
    });
    wx.setStorageSync("cartGoods", cartGoods);
  },
  //全选
  allCheckChange() {
    let { cartGoods, allChecked } = this.data;
    allChecked = !allChecked;
    cartGoods.forEach(v => v.checked = allChecked);
    this.setCart(cartGoods);
  },
  //商品数量编辑
  numChange(e) {
    const { way, id } = e.currentTarget.dataset;
    let { cartGoods } = this.data;
    const index = cartGoods.findIndex(v => v.goods_id === id);
    //判断是否删除
    if (cartGoods[index].num === 1 && way === -1) {
      wx.showModal({
        title: '提示',
        content: '是否要删除',
        success: (result) => {
          if (result.confirm) {
            cartGoods.splice(index, 1);
            this.setCart(cartGoods);
          }
        }
      });
    } else {
      cartGoods[index].num += way;
      this.setCart(cartGoods);
    }

  },
  //结算
  cartPay() {
    //判断地址
    const { address, totalNum } = this.data;
    if (!address.userName) {
      wx.showToast({
        title: '你还没有选择收货地址',
        icon: 'none',
      });
      return;
    }
    //判断商品
    if (totalNum === 0) {
      wx.showToast({
        title: '你还没有选择商品',
        icon: 'none',
      });
      return;
    }
    //跳转页面
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
})