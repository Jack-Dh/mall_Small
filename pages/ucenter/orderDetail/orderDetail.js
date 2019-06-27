var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
    data: {
        orderId: 0,
        orderInfo: {},
        orderGoods: [],
        /*   expressInfo: {}, */
        flag: false,
        handleOption: {},
        afterbtnShow: true, //申请售后按钮显示隐藏
        orderInfoCopy: {},
    },
    onLoad: function(options) {
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
    expandDetail: function() {
        let that = this;
        this.setData({
            flag: !that.data.flag
        })
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
                console.log(res.data);
                that.setData({
                    orderInfo: res.data.orderInfo,
                    orderGoods: res.data.orderGoods,
                    handleOption: res.data.orderInfo.handleOption,
                    orderInfoCopy: res.data.orderInfo
                        /*    expressInfo: res.data.expressInfo */
                });

                /**
                 * 根据订单状态，判断申请售后按钮是否显示
                 * */
                if (that.data.orderGoods[0].aftersale === false) {
                    that.setData({
                        afterbtnShow: true
                    })
                } else if (that.data.orderGoods[0].aftersale === true) {
                    that.setData({
                        afterbtnShow: false
                    })
                }
                console.log(that.data.orderInfo)
                let state = that.data.orderInfoCopy.expCode
                let data = that.data.orderInfoCopy
                switch (state) {
                    case 'YZPY':
                        /* state === 'YZPY' */

                        data.expCode = '邮政快递包裹'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'SF':

                        data.expCode = '顺丰速运'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'HTKY':
                        /* state === 'YZPY' */

                        data.expCode = '百世快递'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'ZTO':
                        /* state === 'YZPY' */

                        data.expCode = '中通快递'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'STO':
                        /* state === 'YZPY' */

                        data.expCode = '申通快递'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'YTO':
                        /* state === 'YZPY' */

                        data.expCode = '圆通速递'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'YD':
                        /* state === 'YZPY' */

                        data.expCode = '韵达速递'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;

                    case 'EMS':
                        /* state === 'YZPY' */

                        data.expCode = 'EMS'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'HHTT':

                        data.expCode = '天天快递'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'JD':
                        /* state === 'YZPY' */

                        data.expCode = '京东快递'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'UC':
                        /* state === 'YZPY' */

                        data.expCode = '优速快递'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'DBL':
                        /* state === 'YZPY' */

                        data.expCode = '德邦快递'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'ZJS':
                        /* state === 'YZPY' */

                        data.expCode = '宅急送'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'TNT':
                        /* state === 'YZPY' */

                        data.expCode = 'TNT快递'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'UPS':
                        /* state === 'YZPY' */

                        data.expCode = 'UPS'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'DHL':
                        /* state === 'YZPY' */

                        data.expCode = 'DHL'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'FEDEX':
                        /* state === 'YZPY' */

                        data.expCode = 'FEDEX联邦(国内件）'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;
                    case 'FEDEX_GJ':
                        /* state === 'YZPY' */

                        data.expCode = 'FEDEX联邦(国际件）'
                        that.setData({
                            orderInfoCopy: data
                        })
                        break;

                }


            }

            wx.hideLoading();
        });
    },
    // “去付款”按钮点击效果
    payOrder: function() {
        let that = this;
        util.request(api.OrderPrepay, {
            orderId: that.data.orderId
        }, 'POST').then(function(res) {
            if (res.errno === 0) {
                const payParam = res.data;
                console.log("支付过程开始");
                wx.requestPayment({
                    'timeStamp': payParam.timeStamp,
                    'nonceStr': payParam.nonceStr,
                    'package': payParam.packageValue,
                    'signType': payParam.signType,
                    'paySign': payParam.paySign,
                    'success': function(res) {
                        console.log("支付过程成功");
                        util.redirect('/pages/ucenter/order/order');
                    },
                    'fail': function(res) {
                        console.log("支付过程失败");
                        util.showErrorToast('支付失败');
                    },
                    'complete': function(res) {
                        console.log("支付过程结束")
                    }
                });
            }
        });

    },
    // “取消订单”点击效果
    cancelOrder: function() {
        let that = this;
        let orderInfo = that.data.orderInfo;

        wx.showModal({
            title: '',
            content: '确定要取消此订单？',
            success: function(res) {
                if (res.confirm) {
                    util.request(api.OrderCancel, {
                        orderId: orderInfo.id
                    }, 'POST').then(function(res) {
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
    refundOrder: function() {
        let that = this;
        let orderInfo = that.data.orderInfo;

        wx.showModal({
            title: '',
            content: '确定要取消此订单？',
            success: function(res) {
                if (res.confirm) {
                    util.request(api.OrderRefund, {
                        orderId: orderInfo.id
                    }, 'POST').then(function(res) {
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
    deleteOrder: function() {
        let that = this;
        let orderInfo = that.data.orderInfo;

        wx.showModal({
            title: '',
            content: '确定要删除此订单？',
            success: function(res) {
                if (res.confirm) {
                    util.request(api.OrderDelete, {
                        orderId: orderInfo.id
                    }, 'POST').then(function(res) {
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
    confirmOrder: function() {
        let that = this;
        let orderInfo = that.data.orderInfo;

        wx.showModal({
            title: '',
            content: '确认收货？',
            success: function(res) {
                if (res.confirm) {
                    util.request(api.OrderConfirm, {
                        orderId: orderInfo.id
                    }, 'POST').then(function(res) {
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
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    }
})