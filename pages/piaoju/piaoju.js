// pages/piaoju/piaoju.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        const eventChannel = this.getOpenerEventChannel();
        let that=this;
        eventChannel.once('acceptDataFromOpenerPage', function(data) {
          let temp=data.data;
          console.log("******recieve******"+JSON.stringify(temp.VatInvoiceInfos));
          that.setData({
            resultData:temp.VatInvoiceInfos
          })
        })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that=this;
    var obj = wx.createSelectorQuery().in(this);
    obj.selectAll('.bottom').boundingClientRect(function(rect) {
      let height = wx.getSystemInfoSync().windowHeight - rect[0].height  + "px"
      that.setData({
        height: height
      })
    })
    obj.exec();
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