// pages/Calendar/Calendar.js
//打卡日历页面
/* var util = require('../../utils/util.js');
var Bmob = require('../../utils/bmob.js'); */
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectId: '',
    days: [{ isSign: true }],
    signUp: [18],
    cur_year: 0,
    cur_month: 0,
    count: 10,

    userInfo: {
      nickName: '点击登录',
      avatarUrl: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    userLevel:'',//用户等级信息
    order: {
      unpaid: 0,
      unship: 0,
      unrecv: 0,
      uncomment: 0
    },
    hasLogin: false,
    userGrowValue:0,//成长值
    userIntegral:0,//积分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*  this.setData({objectId : options.objectId}); */

    //获取当前年月  
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    //获取当前用户当前任务的签到状态
    this.onGetSignUp();

    this.setData({
      cur_year,
      cur_month,
      weeks_ch
    })
    console.log(this.data.days)
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
     //获取用户的登录信息
     if (app.globalData.hasLogin) {
      let userInfo = wx.getStorageSync('userInfo'); //获取用户信息，微信封装
      let userLevel=wx.getStorageSync('userLevel') //获取用户等级
      
      this.setData({
        userInfo: userInfo,
        hasLogin: true,
        userLevel:userLevel
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

  },
  // 获取当月共多少天
  getThisMonthDays: function (year, month) {
    return new Date(year, month, 0).getDate()
  },

  // 获取当月第一天星期几
  getFirstDayOfWeek: function (year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },

  // 计算当月1号前空了几个格子，把它填充在days数组的前面
  calculateEmptyGrids: function (year, month) {
    var that = this;
    //计算每个月时要清零
    that.setData({ days: [] });
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        var obj = {
          date: null,
          isSign: false
        }
        that.data.days.push(obj);
      }
      this.setData({
        days: that.data.days
      });
      //清空
    } else {
      this.setData({
        days: []
      });
    }
  },

  // 绘制当月天数占的格子，并把它放到days数组中
  calculateDays: function (year, month) {
    var that = this;
    const thisMonthDays = this.getThisMonthDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      var obj = {
        date: i,
        isSign: false
      }
      that.data.days.push(obj);
    }
    this.setData({
      days: that.data.days
    });
  },

  //匹配判断当月与当月哪些日子签到打卡
  onJudgeSign: function () {
    var that = this;
    var signs = that.data.signUp;
    var daysArr = that.data.days;
    for (var i = 0; i < signs.length; i++) {
      var current = new Date(signs[i].date.replace(/-/g, "/"));
      var year = current.getFullYear();
      var month = current.getMonth() + 1;
      var day = current.getDate();
      day = parseInt(day);
      for (var j = 0; j < daysArr.length; j++) {
        //年月日相同并且已打卡
        if (year == that.data.cur_year && month == that.data.cur_month && daysArr[j].date == day && signs[i].isSign == "今日已打卡") {
          daysArr[j].isSign = true;
        }
      }
    }
    that.setData({ days: daysArr });
  },

  // 切换控制年月，上一个月，下一个月
  handleCalendar: function (e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      this.onGetSignUp();
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      this.onGetSignUp();
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  },

  //获取当前用户该任务的签到数组
  onGetSignUp: function () {
    util.request(api.signInList).then(res => {
      /**
       * 请求服务端接口舞曲当前用户签到数量
       * 循环遍历并更改日历上签到数据
       * */ 
      let days = this.data.days
      let data = res.data.signRecord.mask
      data.forEach((item, index) => {
        days.forEach((jtem, i) => {
          if (jtem.date === item) {
            jtem.isSign = true
          }
        })
      })
      //改变签到状态后赋值
      this.setData({
         days: days, 
         count: res.data.signRecord.continueSignDays,
         userGrowValue:res.data.userGrowValue,
         userIntegral:res.data.userIntegral,
        });
      console.log(res)
    })

  }
})
