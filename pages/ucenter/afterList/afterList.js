var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data: {
    orderList: [],
    showType: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this
    that.getOrderList()
  },
  getOrderList() {
    let that = this;





    util.request(api.aftersalelist, {
      page: that.data.page,
      limit: that.data.limit
    }).then(function (res) {

      if (res.errno === 0) {

        that.setData({
          orderList: that.data.orderList.concat(res.data.list),
          totalPages: res.data.pages
        });

          /**
           * 循环判断订单状态
           * 
          */
        that.data.orderList.forEach((item, index) => {
          let states = item.aftersaleStatus
          let temp = 'orderList[' + index + '].aftersaleStatus'
        
          switch (states) {
            case 1:
              states === 1
              that.setData({
                [temp]: '退款申请'
              })
              break;
            case 2:
              states === 2
           
              that.setData({
                [temp]: '退款退货申请'
              })

              break;
            case 3:
              states === 3
         
              that.setData({
                [temp]: '退款成功'
              })

              break;
            case 4:
              states === 4
             
              that.setData({
                [temp]: '等待买家退货'
              })
              break;
            case 5:
              states === 5
              that.setData({
                [temp]: '已收货，确认退款'
              })
              break;
            case 6:
              states === 6
              that.setData({
                [temp]: '退款退货成功'
              })
              break;
            case 7:
              states === 7
              that.setData({
                [temp]: '已拒绝'
              })
              break;
            case 8:
              states === 8
              that.setData({
                [temp]: '已取消'
              })
              break;
            case 9:
              states === 9
              that.setData({
                [temp]: '退款处理中'
              })
              break;
            case 10:
              states === 10
              that.setData({
                [temp]: '维修申请'
              })
              break;
            case 11:
              states === 11
              that.setData({
                [temp]: '已受理维修'
              })
              break;
            case 12:
              states === 12
                that.setData({
                  [temp]: '维修中'
                })
              break;
            case 13:
              states === 13
              that.setData({
                [temp]: '维修成功'
              })
              break;
          }

        })
      }
    });



  },
  onReachBottom() {
    console.log(this.data.orderList)
    if (this.data.totalPages > this.data.page) {
      this.setData({
        page: this.data.page + 1
      });
      this.getOrderList();
    } else {
      wx.showToast({
        title: '没有更多订单了',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
  },
  /*  switchTab: function (event) {
     let showType = event.currentTarget.dataset.index;
     this.setData({
       orderList: [],
       showType: showType,
       page: 1,
       limit: 10,
       totalPages: 1
     });
     this.getOrderList();
   }, */
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