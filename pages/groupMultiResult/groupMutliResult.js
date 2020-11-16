// pages/groupMultiResult/groupMutliResult.js
var util = require('../../utils/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    indexDeal:0,
    result:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    let that=this;
    this.data.typeCode= options.typeCode;
    var statusBarHeight= wx.getSystemInfoSync().statusBarHeight
    var windowHeight=wx.getSystemInfoSync().windowHeight;
    this.data.mainHeight=(windowHeight-statusBarHeight-44)
    eventChannel.once('acceptDataFromOpenerPage', function(data) {
      that.data.result=data.imageFiles;
      that.setImageFiles();
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
  setImageFiles:function(){
    var temdata=this.data.result;
    var that=this;
   
    if(that.data.index < temdata.length){
      var itemData =temdata[that.data.index];
      var itemIndex=0; 
      var len=itemData.length
      if(itemIndex < itemData.length){
        that.setItem(itemData,that,itemIndex,len)  
      }
    }
  },
  setItem:function(itemData,that,itemIndex,len){    
    var item = itemData[itemIndex];
      wx.getImageInfo({
        src: item.path,
        success (res) {
          item["width"]=res.width;
          item["height"]=res.height;       
          if(that.data.index == that.data.result.length-1){
            that.setData({
              result:that.data.result,
              mainHeight:that.data.mainHeight    
            })
          }
          itemIndex++
          if(itemIndex < itemData.length){
            that.setItem(itemData,that,itemIndex,len);
          }else{
            that.data.index++ ;
            that.setImageFiles();
          }
        }
      })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var that=this;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: [current] // 需要预览的图片http链接列表  
    })
  },
  delImage:function(e){
    var infos = e.target.dataset.key;
    var that=this;
    var x=infos.split(":!|#")[0];
    var y=infos.split(":!|#")[1];
    this.data.result[x].splice(y,1)
    if(this.data.result[x].length == 0){
      this.data.result.splice(x,1)
      this.data.index= this.data.result.length;
      this.setData({
        result:this.data.result
      })
    }else{
      this.setData({
        result:this.data.result
      })
    }
  },
  chooseImages:function (e) {
    var that=this;
    wx.showActionSheet({
      itemList:["相册选两张一组图片","聊天记录选两张一组图片"],
      success (res) {
        console.log(res.tapIndex)
        let index=res.tapIndex;
        if(index==0){
          that.mutliImageUpload();
        } 
        if(index==1){
          that.mutliMessageImageUpload();
        }
        
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },
  chooseImages01:function (e) {
    var that=this;
    var indexKey=e.target.dataset.key;
    wx.showActionSheet({
      itemList:["相册选一张图片","聊天记录选一张图片"],
      success (res) {
        console.log(res.tapIndex)
        let index=res.tapIndex;
        if(index==0){
          that.mutliImageUpload01(indexKey);
        } 
        if(index==1){
          that.mutliMessageImageUpload01(indexKey);
        }
        
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },
  mutliImageUpload:function(){
    var that = this;
    wx.chooseImage({
            count: 8,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
              var imageFiles=res.tempFiles;
              var finalFiles=that.data.result;
              var index=that.data.result.length;
              var tempObj=[];
                for(var i=0;i<imageFiles.length;i++){
                  if(i%2==1 && i/2 <= (imageFiles.length-1)/2){
                    tempObj[1]=imageFiles[i];
                    finalFiles[index]=tempObj;
                    tempObj=[];
                    index++;
                  }
                  if(i%2==0 && i/2 <= (imageFiles.length-1)/2){
                    tempObj[0]=imageFiles[i];
                  }                  
                }
                that.setImageFiles();
            }     
    });
  },
  mutliImageUpload01:function(indexKey){
    var index=indexKey;
    var that = this;
    wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
              var imageFiles=res.tempFiles;
              var finalData=that.data.result[index];
              var tempObj={}
              wx.getImageInfo({
                src: imageFiles[0].path,
                success (res) {
                  tempObj["width"]=res.width;
                  tempObj["height"]=res.height;     
                  tempObj["path"]=res.path
                  finalData[1]=tempObj;
                  that.setData({
                    result:that.data.result
                  })
                }
              })
            }     
    });
  },
  mutliMessageImageUpload:function(){
    var that = this;
    wx.chooseMessageFile({
      count: 8,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res){
        var imageFiles=res.tempFiles;
        var finalFiles=that.data.result;
        var index=that.data.result.length;
        var tempObj=[];
        for(var i=0;i<imageFiles.length;i++){
          if(i%2==1 && i/2 <= (imageFiles.length-1)/2){
            tempObj[1]=imageFiles[i];
            finalFiles[index]=tempObj;
            tempObj=[];
            index++;
          }
          if(i%2==0 && i/2 <= (imageFiles.length-1)/2){
            tempObj[0]=imageFiles[i];
          }                  
        }
        that.setImageFiles();
      }       
    });
  },
  mutliMessageImageUpload01:function(indexKey){
    var that = this;
    var index=indexKey;
    wx.chooseMessageFile({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res){
        var imageFiles=res.tempFiles;
        var finalData=that.data.result[index];
        var tempObj={}
        wx.getImageInfo({
          src: imageFiles[0].path,
          success (res) {
            tempObj["width"]=res.width;
            tempObj["height"]=res.height;     
            tempObj["path"]=res.path
            finalData[1]=tempObj;
            that.setData({
              result:that.data.result
            })
          }
        })
      }       
    });
  },
  toIdentify:function(){
    var itemsData=this.data.result;
    var flag=true;
    for(var i=0;i<itemsData.length;i++){
       let  subItem=itemsData[i]
        if(subItem.length !=2){
          flag=false;
          break
        }
    }
    if(flag){
      this.setResponse()
    }else{
      var mytoast01=this.selectComponent("#mytoast");
      mytoast01.showMessage("每组补全图片");   
    }
  },
  setResponse:function(){
    var temdata=this.data.result;
    var that=this;
    if(that.data.indexDeal < temdata.length){
      var itemData =temdata[that.data.indexDeal];
      var itemIndex=0; 
      var len=itemData.length
      if(itemIndex < itemData.length){
        wx.showLoading({
          title: '正处理第'+(that.data.indexDeal+1)+'组',
        })
        that.setResItem(itemData,that,itemIndex,len)  

      }
    }
  },
  setResItem:function(itemData,that,itemIndex,len){
    var item = itemData[itemIndex];
    var typeCode = this.data.typeCode;
    var that=this;
    var openUserId= util.getOpenId();
    var url='https://www.coolpov.com/uploadFile/upload';
    wx.uploadFile({
      filePath:item.path,
      name: 'file',
      formData:{"indexType":typeCode,"openUserId":openUserId},
      url: url,
      success(res){
          if(typeof res.data != Object){
              let srcData=JSON.parse(res.data);
              if(srcData.status == 200){
                item["response"] = srcData.data;
              }else{
                item["response"] = [];
              }
          }else{
            item["response"] = res.data.data;
          }  
          itemIndex++
          if(itemIndex < itemData.length){
            that.setResItem(itemData,that,itemIndex,len);
          }else{
            if(that.data.indexDeal == that.data.result.length-1){
            //上传完毕，作一下提示
            wx.showToast({
              title: '处理成功' + that.data.result.length+"组",
              icon: 'success',
              duration: 2000
            })
              that.megerObj()
            }
            that.data.indexDeal++ ;
            that.setResponse();
          }
        }
      })
  },
  megerObj:function(){
     var items=this.data.result;
     var that=this;
     var responseData=[];
     for(var i=0;i<items.length;i++){
       var temItem = items[i];
       var temObj={};
       var firstItem = temItem[0];
       var secondItem = temItem[1];
       var paths=[];
       paths[0]=firstItem.path;
       paths[1]=secondItem.path;
       temObj["path"]=paths;
       var response1=firstItem.response;
       var response2=secondItem.response;
       var response=[];
       for(var h=0;h<response1.length;h++){
          if(response1[h].value != ""){
            response.push(response1[h])
          }
       }
       for(var j=0;j<response2.length;j++){        
          if(response2[j].value != ""){
            response.push(response2[j])
          }
       }
     temObj["response"]=response;
       responseData[i]= temObj;
     }
     this.data.result = responseData;
     wx.navigateTo({
      url: '/pages/multiResult/multiResult',
      success:function(res){
            // 通过eventChannel向被打开页面传送数据
           res.eventChannel.emit('acceptDataFromOpenerPage', { data:that.data.result,backCount:2})
      }
    })
  }
})