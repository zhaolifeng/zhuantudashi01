// pages/suanshu/suanshu.js
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
    this.data.typeCode=options.typeCode;
    const eventChannel = this.getOpenerEventChannel();
    let that=this;
    var statusBarHeight= wx.getSystemInfoSync().statusBarHeight
    var windowHeight=wx.getSystemInfoSync().windowHeight;
    var mainHeight=(windowHeight-statusBarHeight-44)
    var mainWidth=wx.getSystemInfoSync().windowHeight
    eventChannel.once('acceptDataFromOpenerPage', function(data) {
      let temp=data.data;
      let backCount=data.backCount
      

      
      // var temData={"path":"wxfile://tmp_81a2218759df57f7a1a2e1dcbdda99806a23faa38e56781c.jpg","response":[{"height":53,"name":"40*40=1600","result":true,"width":323,"x":202,"y":292},{"height":53,"name":"40*50=2000","result":true,"width":332,"x":204,"y":406},{"height":50,"name":"55*66=121","result":false,"width":286,"x":212,"y":524},{"height":49,"name":"128*5=640","result":true,"width":279,"x":223,"y":634},{"height":52,"name":"500-(100+20)=380","result":true,"width":430,"x":217,"y":743},{"height":50,"name":"48-(10+20)=18","result":true,"width":349,"x":222,"y":854}],"width":1080,"height":1391}


      // console.log("-----------data---------"+temData.response[0].name)
      // console.log("-----------data---------"+temData.response[0].x)
      // console.log("-----------data---------"+temData.response[0].y)
      // console.log("-----------data---------"+temData.response[0].width)
      // console.log("-----------data---------"+temData.response[0].height)
      // console.log("-----------data---------"+temData.iamgeWidth)
      // console.log("-----------data---------"+temData.imageHeigth)
      // console.log("-----------data---------"+mainHeight)
      console.log("-----------data---------"+JSON.stringify(temp))
      var hf=mainHeight/temp[0].height;
      var wf=mainWidth/temp[0].width*0.56;
      that.setData({
        result:temp[0],
        backCount: 1,
        mainHeight:mainHeight,
        mainWidth:mainWidth,
        hf:hf,
        wf:wf
      })
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

  }
})