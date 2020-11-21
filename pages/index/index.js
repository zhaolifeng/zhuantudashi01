const app = getApp()
// pages/home/home.js
var login = require('../../utils/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zindex:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var util = require('../../utils/util.js');
    var time = util.formatTime(new Date());
    
    var openUserId= login.getOpenId();
    console.log("***************openUserId**************"+openUserId)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else{
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
     
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
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
    console.log("*****************"+JSON.stringify(this.data))
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


  initAddPage: function(){
  wx.navigateTo({
    url: '/pages/select/select',
  })
  },

  check:function(event){
    console.log(event.currentTarget.dataset.gid);
    let gid=event.currentTarget.dataset.gid;
    wx.navigateTo({
      url: '/pages/check/check?typeCode='+gid
    })
  },

  showtoast:function () {
    // var sendMailMode=this.selectComponent("#sendMailMode");
    // sendMailMode.sendMail();

    var saveResult=this.selectComponent("#saveResult");
    saveResult.saveResult();
      // wx.navigateTo({
      //   url: '/pages/groupMultiResult/groupMutliResult'
      //   // url: '/pages/multiResult/multiResult'
      // })

  }
})