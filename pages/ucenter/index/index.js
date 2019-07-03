var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
var app = getApp();

Page({
    data: {
        userInfo: {
            nickName: '点击登录',
            avatarUrl: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
        },
        userLevel: '基础会员', //用户等级信息（默认基础会员）
        order: {
            unpaid: 0,
            unship: 0,
            unrecv: 0,
            uncomment: 0
        },
        hasLogin: false
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function() {

    },
    onShow: function() {

        //获取用户的登录信息
        if (app.globalData.hasLogin) {
            let userInfo = wx.getStorageSync('userInfo'); //获取用户信息，微信封装
            let userLevel = wx.getStorageSync('userLevel') //获取用户等级

            this.setData({
                userInfo: userInfo,
                hasLogin: true,
                userLevel: userLevel
            });
            console.log(userInfo)
            console.log(userLevel)
            let that = this;
            util.request(api.UserIndex).then(function(res) {
                if (res.errno === 0) {
                    that.setData({
                        order: res.data.order
                    });
                }

            });
        }

    },
    onHide: function() {
        // 页面隐藏

    },
    onUnload: function() {
        // 页面关闭
    },
    Sign() {
        //用户签到
        /*   util.request(api.AuthLogout, {}, 'POST'); */
        util.request(api.signIn, {}, 'POST').then(function(res) {
            console.log(res)
            wx.showToast({ title: res.data.message })

        });


    },
    goLogin() {
        if (!this.data.hasLogin) {
            wx.navigateTo({
                url: "/pages/auth/login/login"
            })
        }
    },
    goOrder() {
        if (this.data.hasLogin) {
            try {
                wx.setStorageSync('tab', 0);
            } catch (e) {

            }
            wx.navigateTo({
                url: "/pages/ucenter/order/order"
            });
        } else {
            wx.navigateTo({
                url: "/pages/auth/login/login"
            });
        }
    },
    goOrderIndex(e) {
        if (this.data.hasLogin) {
            let tab = e.currentTarget.dataset.index
            let route = e.currentTarget.dataset.route
            try {
                wx.setStorageSync('tab', tab);
            } catch (e) {

            }
            wx.navigateTo({
                url: route,
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
            })
        } else {
            wx.navigateTo({
                url: "/pages/auth/login/login"
            });
        };
    },
    goCoupon() {
        if (this.data.hasLogin) {
            wx.navigateTo({
                url: "/pages/ucenter/couponList/couponList"
            });
        } else {
            wx.navigateTo({
                url: "/pages/auth/login/login"
            });
        };
    },
    goGroupon() {
        if (this.data.hasLogin) {
            wx.navigateTo({
                url: "/pages/groupon/myGroupon/myGroupon"
            });
        } else {
            wx.navigateTo({
                url: "/pages/auth/login/login"
            });
        };
    },
    goCollect() {
        if (this.data.hasLogin) {
            wx.navigateTo({
                url: "/pages/ucenter/collect/collect"
            });
        } else {
            wx.navigateTo({
                url: "/pages/auth/login/login"
            });
        };
    },
    goFeedback(e) {
        if (this.data.hasLogin) {
            wx.navigateTo({
                url: "/pages/ucenter/feedback/feedback"
            });
        } else {
            wx.navigateTo({
                url: "/pages/auth/login/login"
            });
        };
    },
    goFootprint() {
        if (this.data.hasLogin) {
            wx.navigateTo({
                url: "/pages/ucenter/footprint/footprint"
            });
        } else {
            wx.navigateTo({
                url: "/pages/auth/login/login"
            });
        };
    },
    goAddress() {
        if (this.data.hasLogin) {
            wx.navigateTo({
                url: "/pages/ucenter/address/address"
            });
        } else {
            wx.navigateTo({
                url: "/pages/auth/login/login"
            });
        };
    },
    goSign() {
        //会员中心
        if (this.data.hasLogin) {
            wx.navigateTo({
                url: "/pages/ucenter/sign/sign"
            });
        } else {
            wx.navigateTo({
                url: "/pages/auth/login/login"
            });
        };
    },
    bindPhoneNumber: function(e) {
        if (e.detail.errMsg !== "getPhoneNumber:ok") {
            // 拒绝授权
            return;
        }

        if (!this.data.hasLogin) {
            wx.showToast({
                title: '绑定失败：请先登录',
                icon: 'none',
                duration: 2000
            });
            return;
        }

        util.request(api.AuthBindPhone, {
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData
        }, 'POST').then(function(res) {
            if (res.errno === 0) {
                wx.showToast({
                    title: '绑定手机号码成功',
                    icon: 'success',
                    duration: 2000
                });
            }
        });
    },
    goAfterSale: function() {
        if (this.data.hasLogin) {
            wx.navigateTo({
                url: "/pages/ucenter/afterList/afterList"
            });
        } else {
            wx.navigateTo({
                url: "/pages/auth/login/login"
            });
        };
    },
    aboutUs: function() {
        wx.navigateTo({
            url: '/pages/about/about'
        });
    },
    goHelp: function() {
        wx.navigateTo({
            url: '/pages/help/help'
        });
    },
    exitLogin: function() {
        wx.showModal({
            title: '',
            confirmColor: '#b4282d',
            content: '退出登录？',
            success: function(res) {
                if (!res.confirm) {
                    return;
                }

                util.request(api.AuthLogout, {}, 'POST');
                app.globalData.hasLogin = false;
                wx.removeStorageSync('token');
                wx.removeStorageSync('userInfo');
                wx.reLaunch({
                    url: '/pages/index/index'
                });
            }
        })

    }
})