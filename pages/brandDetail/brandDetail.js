var util = require('../../utils/util.js');
var api = require('../../config/api.js');


var app = getApp();

Page({
    data: {
        id: 0,
        brand: {},
        goodsList: [],
        page: 1,
        limit: 10,
        tips: '上拉加载更多',
        isLastPage: false
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        var that = this;
        that.setData({
            id: parseInt(options.id)
        });
        this.getBrand();
    },
    getBrand: function() {
        let that = this;
        util.request(api.BrandDetail, {
            id: that.data.id
        }).then(function(res) {
            if (res.errno === 0) {
                that.setData({
                    brand: res.data
                });

                that.getGoodsList();
            }
        });
    },
    getGoodsList() {
        var that = this;

        util.request(api.GoodsList, {
                brandId: that.data.id,
                page: that.data.page,
                limit: that.data.limit
            })
            .then(function(res) {
                if (res.errno === 0) {
                    if (res.data.total <= that.data.goodsList.length) {
                        that.setData({
                            tips: '已显示全部啦',
                        })
                    } else {
                        that.setData({
                            goodsList: res.data.list
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

    },
    onPullDownRefresh: function() {

        /* 下拉刷新 */
        this.getBrand();

    },
    onReachBottom: function() {
        /*   上拉事件 */


        // 最后一页了，取消下拉功能
        if (this.data.isLastPage) {
            return
        }
        var that = this;
        that.setData({ page: this.data.page + 1 })
        util.request(api.GoodsList, {
                brandId: that.data.id,
                page: that.data.page,
                limit: that.data.limit
            })
            .then(function(res) {
                if (res.errno === 0) {

                    if (res.data.total <= that.data.goodsList.length) {
                        that.setData({
                            tips: '已显示全部啦',
                        })
                    } else {
                        let newData = []
                        newData = that.data.goodsList.concat(res.data.list)
                        that.setData({
                            goodsList: newData
                        })

                    }



                }
            });


        console.log(1)
    },

})