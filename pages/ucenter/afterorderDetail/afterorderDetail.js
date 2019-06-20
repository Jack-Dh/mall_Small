var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data: {
    orderId: 0,
    orderInfo: {},
    orderGoods: {},
    expressInfo: {},
    flag: false,
    handleOption: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.id
    });
    this.getOrderDetail();
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getOrderDetail();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  expandDetail: function () {
    let that = this;
    this.setData({
      flag: !that.data.flag
    })
  },
  getOrderDetail: function () {
    wx.showLoading({
      title: '加载中',
    });

    setTimeout(function () {
      wx.hideLoading()
    }, 2000);

    let that = this;
    util.request(api.aftersaledetail, {
      id: that.data.orderId
    }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          orderGoods: res.data
        });


        //获取改条订单当前状态
        let states = that.data.orderGoods.aftersaleStatus
        let setDatanew = that.data.orderGoods


        switch (states) {
          case 1:
            states === 1
            setDatanew.aftersaleStatus = '退款申请'
            that.setData({
              orderGoods: setDatanew
            })
            break;
          case 2:
            states === 2
            setDatanew.aftersaleStatus = '退款退货申请'
            that.setData({
              orderGoods: setDatanew
            })

            break;
          case 3:
            states === 3
            setDatanew.aftersaleStatus = '退款成功'
            that.setData({
              orderGoods: setDatanew
            })

            break;
          case 4:
            states === 4
            setDatanew.aftersaleStatus = '等待买家退货'
            that.setData({
              orderGoods: setDatanew
            })
            break;
          case 5:
            states === 5
            setDatanew.aftersaleStatus = '已收货，确认退款'
            that.setData({
              orderGoods: setDatanew
            })
            break;
          case 6:
            states === 6
            setDatanew.aftersaleStatus = '退款退货成功'
            that.setData({
              orderGoods: setDatanew
            })
            break;
          case 7:
            states === 7
            setDatanew.aftersaleStatus = '已拒绝'
            that.setData({
              orderGoods: setDatanew
            })
            break;
          case 8:
            states === 8
            setDatanew.aftersaleStatus = '已取消'
            that.setData({
              orderGoods: setDatanew
            })
            break;
          case 9:
            states === 9
            setDatanew.aftersaleStatus = '退款处理中'
            that.setData({
              orderGoods: setDatanew
            })
            break;
          case 10:
            states === 10
            setDatanew.aftersaleStatus = '维修申请'
            that.setData({
              orderGoods: setDatanew
            })
            break;
          case 11:
            states === 11
            setDatanew.aftersaleStatus = '已受理维修'
            that.setData({
              orderGoods: setDatanew
            })
            break;
          case 12:
            states === 12
            setDatanew.aftersaleStatus = '维修中',
              that.setData({
                orderGoods: setDatanew
              })
            break;
          case 13:
            states === 13
            setDatanew.aftersaleStatus = '维修成功'
            that.setData({
              orderGoods: setDatanew
            })
            break;
        }
   
      }

      wx.hideLoading();
    });
  },
  // “去付款”按钮点击效果
  payOrder: function () {
    let that = this;
    util.request(api.OrderPrepay, {
      orderId: that.data.orderId
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        const payParam = res.data;
        console.log("支付过程开始");
        wx.requestPayment({
          'timeStamp': payParam.timeStamp,
          'nonceStr': payParam.nonceStr,
          'package': payParam.packageValue,
          'signType': payParam.signType,
          'paySign': payParam.paySign,
          'success': function (res) {
            console.log("支付过程成功");
            util.redirect('/pages/ucenter/order/order');
          },
          'fail': function (res) {
            console.log("支付过程失败");
            util.showErrorToast('支付失败');
          },
          'complete': function (res) {
            console.log("支付过程结束")
          }
        });
      }
    });

  },
  // “取消订单”点击效果
  cancelOrder: function () {
    let that = this;
    let orderInfo = that.data.orderInfo;

    wx.showModal({
      title: '',
      content: '确定要取消此订单？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.OrderCancel, {
            orderId: orderInfo.id
          }, 'POST').then(function (res) {
            if (res.errno === 0) {
              wx.showToast({
                title: '取消订单成功'
              });
              util.redirect('/pages/ucenter/order/order');
            } else {
              util.showErrorToast(res.errmsg);
            }
          });
        }
      }
    });
  },
  // “取消订单并退款”点击效果
  refundOrder: function () {
    let that = this;
    let orderInfo = that.data.orderInfo;

    wx.showModal({
      title: '',
      content: '确定要取消此订单？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.OrderRefund, {
            orderId: orderInfo.id
          }, 'POST').then(function (res) {
            if (res.errno === 0) {
              wx.showToast({
                title: '取消订单成功'
              });
              util.redirect('/pages/ucenter/order/order');
            } else {
              util.showErrorToast(res.errmsg);
            }
          });
        }
      }
    });
  },
  // “删除”点击效果
  deleteOrder: function () {
    let that = this;
    let orderInfo = that.data.orderInfo;

    wx.showModal({
      title: '',
      content: '确定要删除此订单？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.OrderDelete, {
            orderId: orderInfo.id
          }, 'POST').then(function (res) {
            if (res.errno === 0) {
              wx.showToast({
                title: '删除订单成功'
              });
              util.redirect('/pages/ucenter/order/order');
            } else {
              util.showErrorToast(res.errmsg);
            }
          });
        }
      }
    });
  },
  // “确认收货”点击效果
  confirmOrder: function () {
    let that = this;
    let orderInfo = that.data.orderInfo;

    wx.showModal({
      title: '',
      content: '确认收货？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.OrderConfirm, {
            orderId: orderInfo.id
          }, 'POST').then(function (res) {
            if (res.errno === 0) {
              wx.showToast({
                title: '确认收货成功！'
              });
              util.redirect('/pages/ucenter/order/order');
            } else {
              util.showErrorToast(res.errmsg);
            }
          });
        }
      }
    });
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {

    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})