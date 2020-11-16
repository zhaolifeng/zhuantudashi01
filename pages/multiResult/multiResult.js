// pages/multiResult/multiResult.js
var util = require('../../utils/util.js');
var login = require('../../utils/login.js');
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
    console.log("############页面栈################"+getCurrentPages().length)
    this.data.typeCode=options.typeCode;
    const eventChannel = this.getOpenerEventChannel();
    let that=this;
    var statusBarHeight= wx.getSystemInfoSync().statusBarHeight
    var windowHeight=wx.getSystemInfoSync().windowHeight;
    this.data.mainHeight=(windowHeight-statusBarHeight-44)
    eventChannel.once('acceptDataFromOpenerPage', function(data) {
      let temp=data.data;
      let backCount=data.backCount
      that.setData({
        result:temp,
        backCount: backCount,
        mainHeight:that.data.mainHeight
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

  },
  editorText:function(e){
      var infos=e.detail.message.split(":!|#");
      this.data.result[infos[0]].response[infos[1]].value=infos[2];
      this.setData({
        result:this.data.result
      })
  },
  editor:function(e){
    var editorMode=this.selectComponent("#editorMode");
    let message=e.target.dataset.key;
    if(message != undefined){
        editorMode.startEditor(message);
    }

},
operator:function(e){
    let index=e.target.dataset.key;
    var operatorMode=this.selectComponent("#operatorMode");
    var message=this.data.result[index]
    wx.createSelectorQuery().select('#submenu'+index).boundingClientRect(function(rect){
        rect.top     // 节点的上边界坐标
        operatorMode.startOper(message,index,rect.top);
      }).exec()    
},
copyInfo:function(){
  var copyData=""
  var sourceData=this.data.result;
  for(var i=0;i<sourceData.length;i++){   
    copyData=copyData + "----------第"+(i+1)+"页-------------\n";    
      let temp = sourceData[i].response;
      if(temp != undefined){
        for(var j=0;j<temp.length;j++){
          copyData=copyData + temp[j].name+":"+temp[j].value+"\n";
        }  
      }         
  }
  var kk=0
  wx.setClipboardData({
    data: copyData,
    success (res) {
      wx.getClipboardData({
        success (res) {
          console.log("-----"+kk+"----------\n"+res.data) // data
          kk++;
          
        }
      })
    }
  })
},

toOperater:function(e){
  var index=e.detail.dataIndex;
  var method=e.detail.operater
  if(method=='share'){
    var share=this.selectComponent("#share");
    share.toShare();
  }
  if(method == 'sendMail'){
    var sendMailMode=this.selectComponent("#sendMailMode");
    sendMailMode.sendMail(index);
  }
  if(method == 'saveResult'){
    var saveResult=this.selectComponent("#saveResult");
    saveResult.saveResult(index);
  }
 
},
shareAll:function(e){
  this.copyInfo();
  var share=this.selectComponent("#share");
  share.toShare();
},
navTo:function(e){
  var mailAddr=e.detail.navToPath;
  wx.navigateTo({
    url: '/pages/check/check?typeCode='+this.data.typeCode
  })
},
toSendMail:function(){
  var sendMailMode=this.selectComponent("#sendMailMode");
    sendMailMode.sendMail(-1);
},
sendMail:function(e){
  var index=e.detail.index;
  var mailAddr=e.detail.mailAddr;
  var copyData=""
  var sourceData=this.data.result;
  if(index == -1){ //全部发邮件
    for(var i=0;i<sourceData.length;i++){   
      copyData=copyData + "----------第"+(i+1)+"页-------------<br>";    
        let temp = sourceData[i].response;
        if(temp != undefined){
          for(var j=0;j<temp.length;j++){
            copyData=copyData + temp[j].name+":"+temp[j].value+"<br>";
          }  
        }         
    }
  }else{ 
      let temp = sourceData[index].response;
      if(temp != undefined){
        for(var j=0;j<temp.length;j++){
          copyData=copyData + temp[j].name+":"+temp[j].value+"<br>";
        }  
      }
  }
  var url='https://www.coolpov.com/mail/sendMail';
  var openUserId= login.getOpenId();
  wx.request({
    url: url, 
    method:"POST",
    header: {
      'content-type': 'application/json;charset=utf-8'
    },
    scriptCharset: 'utf-8',
    data:{ 
      title:"识别结果",
      recipientMail:mailAddr,
      content:copyData,
      openUserId:openUserId
    },
    success (res) {
      wx.showToast({
        title: '发送成功',
        icon: 'success',
        duration: 2000
      })
      console.log(res.data)
    },
    fail(res){
      wx.showToast({
        title: '重新发送',
        icon: 'fail',
        duration: 2000
      })
    }
  })
},
showImages:function(){
   var paths=[];
   var sourceData=this.data.result;
   for(var i=0;i<sourceData.length;i++){   
      let path = sourceData[i].path;
      paths.push(path)         
  }
  wx.previewImage({
    current:paths[0],  
    urls: paths  
  })
},
setTitle:function(e){

  var title= e.detail.title;
  var index=e.detail.index;
  var data=[];
  if(index == -1){
    data=this.data.result
  }else{
    data[0]=this.data.result[index]
  }
  var time = util.formatTime(new Date());
  var titleObje={"title":title,"dateTime":time};
  var historyIndex=wx.getStorageSync('historyIndex');
  var hisResults=wx.getStorageSync('hisResults');
      historyIndex.unshift(titleObje)
      hisResults.unshift(data)
      wx.setStorage({
        key: "historyIndex",
        data:historyIndex
      })
  
      wx.setStorage({
        key: "hisResults",
        data:hisResults
      })
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })

},
saveResult:function(){
  var saveResult=this.selectComponent("#saveResult");
  saveResult.saveResult(-1);
}
})


