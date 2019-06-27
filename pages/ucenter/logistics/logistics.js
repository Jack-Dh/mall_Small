var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        expCode: '', //快递公司名称
        expNo: '', //物流单号
        TracesList: [], //物流信息
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //接收上个页面传递过来的参数
        console.log(options)
        this.setData({
            expCode: options.expCode,
            expNo: options.expNo
        })
        this.getOrderTracesQuery()
    },

    getOrderTracesQuery() {
        //获取物流信息
        let that = this
        let data = {
            shipChannel: that.data.expCode,
            shipSn: that.data.expNo
        }
        util.request(api.getOrderTraces, data).then(res => {

            that.setData({
                    TracesList: res
                })
                /**
                 * 数据排序
                 * **/
            let list = that.data.TracesList
            list.Traces = that.data.TracesList.Traces.reverse()
            that.setData({
                TracesList: list
            })

            let state = that.data.TracesList.ShipperCode
            let data = that.data.TracesList
            switch (state) {
                case 'YZPY':
                    /* state === 'YZPY' */

                    data.ShipperCode = '邮政快递包裹'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'SF':

                    data.ShipperCode = '顺丰速运'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'HTKY':
                    /* state === 'YZPY' */

                    data.ShipperCode = '百世快递'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'ZTO':
                    /* state === 'YZPY' */

                    data.ShipperCode = '中通快递'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'STO':
                    /* state === 'YZPY' */

                    data.ShipperCode = '申通快递'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'YTO':
                    /* state === 'YZPY' */

                    data.ShipperCode = '圆通速递'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'YD':
                    /* state === 'YZPY' */

                    data.ShipperCode = '韵达速递'
                    that.setData({
                        TracesList: data
                    })
                    break;

                case 'EMS':
                    /* state === 'YZPY' */

                    data.ShipperCode = 'EMS'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'HHTT':

                    data.ShipperCode = '天天快递'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'JD':
                    /* state === 'YZPY' */

                    data.ShipperCode = '京东快递'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'UC':
                    /* state === 'YZPY' */

                    data.ShipperCode = '优速快递'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'DBL':
                    /* state === 'YZPY' */

                    data.ShipperCode = '德邦快递'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'ZJS':
                    /* state === 'YZPY' */

                    data.ShipperCode = '宅急送'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'TNT':
                    /* state === 'YZPY' */

                    data.ShipperCode = 'TNT快递'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'UPS':
                    /* state === 'YZPY' */

                    data.ShipperCode = 'UPS'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'DHL':
                    /* state === 'YZPY' */

                    data.ShipperCode = 'DHL'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'FEDEX':
                    /* state === 'YZPY' */

                    data.ShipperCode = 'FEDEX联邦(国内件）'
                    that.setData({
                        TracesList: data
                    })
                    break;
                case 'FEDEX_GJ':
                    /* state === 'YZPY' */

                    data.ShipperCode = 'FEDEX联邦(国际件）'
                    that.setData({
                        TracesList: data
                    })
                    break;

            }

        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})