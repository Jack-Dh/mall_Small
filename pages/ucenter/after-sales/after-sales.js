var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

// pages/ucenter/after-sales/after-sales.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: 0,
    orderInfo: {},
    orderGoods: [],
    expressInfo: {},
    flag: false,
    handleOption: {},
    array: ['维修', '仅退款', '退货退款'],
    index:'',
    afterData:{
      reason:'',//售后理由
      type:'',
      refundAmount:''
    }
  },
  bindPickerChange: function(e) {
    let that=this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
   /*  this.data.afterData[type]= this.data.array[e.detail.value] */
    console.log(e)
    console.log(this.data.array[e.detail.value])
    
    that.data.afterData.type=that.data.array[e.detail.value]
    console.log(this.data.afterData)
  },
  submitBtn(){
    //提交售后
    let that=this
    if(that.data.afterData.type!==''){
      console.log(that.data.afterData)
    }else{
      wx.showModal({
        title: '提示',
        content: '请选择处理方式',
        showCancel:false
      })
     
    }
    
  },
  blurchange(e){
    //获取售后理由
      
      let that=this
      that.data.afterData.reason=e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // 页面初始化 options为页面跳转所带来的参数
  this.setData({
    orderId: options.id
  });
  this.getOrderDetail();
  },
  getOrderDetail: function() {
    wx.showLoading({
      title: '加载中',
    });

    setTimeout(function() {
      wx.hideLoading()
    }, 2000);

    let that = this;
    util.request(api.OrderDetail, {
      orderId: that.data.orderId
    }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          orderInfo: res.data.orderInfo,
          orderGoods: res.data.orderGoods,
          handleOption: res.data.orderInfo.handleOption,
          expressInfo: res.data.expressInfo
          
        });
        that.data.afterData.refundAmount=res.data.orderGoods[0].price
        console.log(res)
        console.log(that.data.orderId)
        console.log(that.data.afterData)
      }

      wx.hideLoading();
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})