//index.js
var util = require('../../utils/login.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    images:[],
    selected:1,
    fankui:""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({
      selected:1
    })
    console.log("------0-------"+JSON.stringify(app.globalData.userInfo))
    if (app.globalData.userInfo) {
      console.log("------1--------"+JSON.stringify(app.globalData.userInfo))
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log("------2--------"+JSON.stringify(res.userInfo))
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow:function(){
    var historyIndex=wx.getStorageSync('historyIndex');
    this.setData({
      historyIndex:historyIndex
    })
  },
  chooseImages:function(){
    var that = this;
    var count=4-that.data.images.length;
    wx.chooseImage({
            count: count,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
              var imageFiles=res.tempFiles;

              for(var i=0;i<imageFiles.length;i++){
                that.data.images.push(imageFiles[i])              
            }
              that.setData({
                images:that.data.images
              })
            }     
    });
  },
  delImage:function(e){
    var index = e.target.dataset.key;
    this.data.images.splice(index,1);
    this.setData({
      images:this.data.images
    })
  },
  switchTab:function(e){
      var current=e.target.dataset.key;
      this.setData({
        selected:current
      })
  },
  inputText:function(e){
    this.data.fankui=e.detail.value;
  },
  submitData:function(){
        if(this.data.images.length > 0){
          var successUp = 0; //成功
          var failUp = 0; //失败
          var count = this.data.images.length; //总数
          var index = 1; //第几张
          var fankui=this.data.fankui;
          var openUserId= util.getOpenId();
          this.uploadOneByOne( openUserId,fankui,"",successUp, failUp, count, index)
        }
        if(this.data.fankui.length >0 && this.data.images.length==0){
          this.sendMail();
        }
    },

     /**
  * 采用递归的方式上传多张
  */
 uploadOneByOne( openUserId,fankui,path,successUp, failUp, count, index){
  var that = this;
  wx.showLoading({
     title: '正处理第'+(index)+'张',
   })
   var url='https://www.coolpov.com/bakInfo/upload';
        wx.uploadFile({
          filePath:that.data.images[index-1].path,
          name: 'file',
          formData:{
            "path":path,
            "count":count,
            "index":index,
            "fankui":fankui,
            "openUserId":openUserId
          },
          url: url, 
          success(res){
            wx.hideLoading();
          },
          fail(res){
            failUp++;//失败+1
          },
          complete(res){
            wx.hideLoading();
            var resData=res.data;
            if(resData!= 'object'){
              resData= JSON.parse(resData);
            }
            var path=resData.data
            if(index <count){
              index++;//下一张 
              that.uploadOneByOne( openUserId,fankui,path,successUp, failUp, count, index)    
            }else{
              that.setData({
                images:[],
                fankui:""
              })
              var mytoast01=that.selectComponent("#mytoast");
              mytoast01.showMessage("感谢宝贵建议，我们努力！！");  
            }
          }
        })
},
sendMail:function(){
  var that=this;
  var fankui=this.data.fankui
  var openUserId= util.getOpenId();
  var  url='https://www.coolpov.com/bakInfo/sendMail';
  wx.request({
    url: url, 
    method:"POST",
    header: {
      'content-type': 'application/json;charset=utf-8'
    },
    scriptCharset: 'utf-8',
    data:{ 
      "fankui":fankui,
      "openUserId":openUserId
    },
    success (res) {
      that.setData({
        images:[],
        fankui:""
      })
      var mytoast01=that.selectComponent("#mytoast");
      mytoast01.showMessage("感谢宝贵建议，我们努力！！");  

      console.log(res.data)
    }
  })
},
deleRecord:function(e){
 var index = e.target.dataset.key;
 var historyIndex=wx.getStorageSync('historyIndex');
 var hisResults=wx.getStorageSync('hisResults');
     historyIndex.splice(index,1);
     hisResults.splice(index,1);
    wx.setStorage({
      key: "historyIndex",
      data:historyIndex
    })

    wx.setStorage({
      key: "hisResults",
      data:hisResults
    })
 this.setData({
     historyIndex:historyIndex
 })
},
shareRecord:function(e){
  var index = e.target.dataset.key;
  var hisResults=wx.getStorageSync('hisResults');
  wx.navigateTo({
    url: '/pages/viewResult/viewResult',
    success:function(res){
          // 通过eventChannel向被打开页面传送数据 
         res.eventChannel.emit('acceptDataFromOpenerPage', { data:hisResults[index],backCount:1})
    }
  })
}
})
