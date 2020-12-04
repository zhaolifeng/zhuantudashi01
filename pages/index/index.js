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
    let funkey = wx.getStorageSync("fun100000")
    var openUserId= login.getOpenId();
    console.log("***************openUserId**************"+openUserId)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        funkey:funkey,
        typeCode:"100000"
      })
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
   
  },


  initAddPage: function(){
  wx.navigateTo({
    url: '/pages/select/select',
  })
  },
  check:function(event){
    console.log(event.currentTarget.dataset.gid);
    let gid=event.currentTarget.dataset.gid;
    if(gid.includes('005002-1')){
      wx.navigateTo({
        url: '/pages/danyeDeal/danyeDeal?typeCode='+gid
      })
    }else{
      wx.navigateTo({
        url: '/pages/check/check?typeCode='+gid
      })
    }

  },

  showtoast:function () {
    // var sendMailMode=this.selectComponent("#sendMailMode");
    // sendMailMode.sendMail();

    // var saveResult=this.selectComponent("#saveResult");
    // saveResult.saveResult();
      wx.navigateTo({
        url: '/pages/fanyi/fanyi'
        // url: '/pages/multiResult/multiResult'
      })

  }
})