// pages/piaoju/piaoju.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeCode:"002007",
    resultData:[{"name":"姓名","value":"赵利锋","disable":"false"},{"name":"性别","value":"男","disable":"false"}],
  },
  orginalData:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        const eventChannel = this.getOpenerEventChannel();
        let that=this;
        let typeCode= options.typeCode;
        eventChannel.once('acceptDataFromOpenerPage', function(data) {
          let temp=data.data;
          that.orginalData= JSON.parse(JSON.stringify(temp));
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
      console.log("-----selectAll-----------resultData-------"+JSON.stringify(checkboxItems))
      var orginalData=JSON.stringify(this.orginalData);
      console.log("-----selectAll-----------orginalData----1---"+JSON.stringify(this.orginalData))
      for (var i = 0; i < lenI; ++i) {
        checkboxItems[i].checked = true;
        selectItems[i]=checkboxItems[i].name;
      }
      this.setData({
        resultData: checkboxItems,
        selectData:selectItems
      });
      if(typeof orginalData != 'object'){
        orginalData=orginalData.replace(/\ufeff/g,"");
        this.orginalData= JSON.parse(orginalData);
      }

      console.log("-----selectAll-----------orginalData---2----"+JSON.stringify(this.orginalData))
  },
 
  onCopyInfo:function(){
    var checkboxItems = this.data.selectData;
    var resultData=this.data.resultData;
    console.log("&&&###checkboxItems###&&"+(JSON.stringify(checkboxItems))); 
    console.log("&&&###resultData###&&"+JSON.stringify(resultData));
    if(checkboxItems==undefined || JSON.stringify(checkboxItems) == "{}"){
      var mytoast01=this.selectComponent("#mytoast");
      mytoast01.showMessage("请选择要复制信息");   
      return
    }
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
    console.log("&&&###resultData###&&"+selected);
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
  },
  onEditor:function(){
    console.log("--------------");
    var checkboxItems = this.data.selectData;
    var resultData=this.data.resultData;
    if(checkboxItems==undefined || JSON.stringify(checkboxItems) == "{}"){
      var mytoast01=this.selectComponent("#mytoast");
      mytoast01.showMessage("请选择要编辑信息");   
      return
    }
    let lenI=0; 
    lenI = checkboxItems.length;
    let lenG = resultData.length;
    console.log("*******************"+lenI);
    var editorObjects=[];
    for (var i = 0; i < lenI; ++i) {
      var tempObj={};
        for(var j=0;j<lenG;j++){
          if(checkboxItems[i] == resultData[j].name){
            tempObj.disable=false;
            tempObj.checked=true;
            tempObj.value=resultData[j].value;
            tempObj.name=checkboxItems[i];
            editorObjects[i]=tempObj;
          }
        }
    }
    this.setData({
      editorData:editorObjects,
      show:55
    });
    console.log("*********WWW**********"+JSON.stringify(this.orginalData));
  },
  bindFormSubmit: function(e) {
    var editorObject=e.detail.value;
    var resultData=this.data.resultData;
    console.log("&&&&&"+JSON.stringify(this.orginalData));
    
    var orginalData=JSON.stringify(this.orginalData);
    for(var p in editorObject){
      for(var i=0;i<resultData.length;i++){
        if(resultData[i].name==p){
          resultData[i].value=editorObject[p];
          resultData[i].checked=true;
        }
      }
    }
    console.log("&&&###WWWWWWWWWWWWWWWWW###&&"+JSON.stringify(orginalData)); 
    if(typeof orginalData != 'object'){
      orginalData=orginalData.replace(/\ufeff/g,"");
      this.orginalData= JSON.parse(orginalData);
    }
    
    this.setData({
      resultData:resultData,
      show:-111
    })
    console.log("&&&######&&"+JSON.stringify(this.orginalData));
  },
  closeEditor:function(){
    this.setData({
      editorData:{},
      show:-111
    });
  },
  rest:function(){
    var orginalData=this.orginalData;
    this.data.selectData={};
    console.log("---------orginalData-------------"+JSON.stringify(orginalData));
    console.log("---------this.data.selectData-------------"+this.data.selectData);
    this.setData({
      resultData:orginalData
    });
  }
})