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
        let typeCode= options.typeCode;
        eventChannel.once('acceptDataFromOpenerPage', function(data) {
          let temp=data.data;
          that.setData({
            typeCode:typeCode,
            resultData:temp,
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

    var checkboxItems = that.data.resultData;
    let lenI = checkboxItems.length;
    for (var i = 0; i < lenI; ++i) {
      checkboxItems[i].checked = false;
    }
    this.setData({
      resultData: checkboxItems
    });
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

  checkboxChange:function(e){
      this.setData({
      selectData:e.detail.value
    }); 
  },
  selectAll:function(){
      var checkboxItems = this.data.resultData;
      let lenI = checkboxItems.length;
      var selectItems=[];
      for (var i = 0; i < lenI; ++i) {
        checkboxItems[i].checked = false;
      }
      for (var i = 0; i < lenI; ++i) {
        checkboxItems[i].checked = true;
        selectItems[i]=checkboxItems[i].name;
      }
    
      this.setData({
        resultData: checkboxItems,
        selectData:selectItems
      });
  },

  onCopyInfo:function(){
    var checkboxItems = this.data.selectData;
    var resultData=this.data.resultData;
    let lenI = checkboxItems.length;
    let lenG = resultData.length;
    var selected='';
    for (var i = 0; i < lenI; ++i) {
        for(var j=0;j<lenG;j++){
          if(checkboxItems[i] == resultData[j].name){
            selected=selected + resultData[j].name+":"+resultData[j].value+"\n";
          }
        }
    }
    wx.setClipboardData({
      data: selected,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  }
})