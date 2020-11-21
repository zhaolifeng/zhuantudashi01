// pages/imageList/imageList.js
var util = require('../../utils/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    imageFilesArray:[],
    imagePaths:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    let that=this;
   this.data.typeCode= options.typeCode;
    eventChannel.once('acceptDataFromOpenerPage', function(data) {
      that.data.imageFilesArray=data.imageFiles;
      that.setImageFileInfo();
      console.log("############"+JSON.stringify(that.data.imageFiles));
    })
},

setImageFileInfo:function(){
      var temp=this.data.imageFilesArray;
      var that=this;
      if(that.data.index<temp.length){
      wx.getImageInfo({
        src: temp[that.data.index].path,
        success (res) {
          var temps=that.data.imageFilesArray[that.data.index];
          temps["width"]=res.width;
          temps["height"]=res.height;
          temps["path"]=res.path
          that.data.imagePaths[that.data.index]=res.path
          if(that.data.index==(temp.length-1)){
            that.setData({
              imageFilesArray:that.data.imageFilesArray      
            })
          }
          that.data.index++;;
          that.setImageFileInfo();
        }
      })
    } 
},

previewImage: function (e) {
  var current = e.target.dataset.src;
  var that=this;
  wx.previewImage({
    current: current, // 当前显示图片的http链接  
    urls: that.data.imagePaths // 需要预览的图片http链接列表  
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
  toIdentify:function(){
    var successUp = 0; //成功
    var failUp = 0; //失败
    var length = this.data.imageFilesArray.length; //总数
    var count = 0; //第几张
    this.uploadOneByOne(successUp, failUp, count, length)
  },
   /**
  * 采用递归的方式上传多张
  */
 uploadOneByOne(successUp, failUp, count, length){
  var that = this;
  var typeCode=that.data.typeCode;
  wx.showLoading({
     title: '正处理第'+(count+1)+'张',
   })
   var openUserId= util.getOpenId();
   var url='https://www.coolpov.com/uploadFile/upload';
   wx.uploadFile({
    filePath:that.data.imageFilesArray[count].path,
    name: 'file',
    formData:{"indexType":typeCode,"openUserId":openUserId},
    url: url, 
    success(res){
      wx.hideLoading();
      successUp++;//成功+1
      if(typeof(res.data) != Object){
        let srcData=JSON.parse(res.data);
        if(srcData.status == 200){
          that.data.imageFilesArray[count].response = srcData.data;
        }else{
          that.data.imageFilesArray[count].response= [];
        }
      }else{
        that.data.imageFilesArray[count].response=res.data.data;
      }
    },
    fail(res){
      failUp++;//失败+1
    },
    complete(res){
      wx.hideLoading();
      count++;//下一张 
      if(count == length){
        //上传完毕，作一下提示
        wx.showToast({
          title: '处理成功' + successUp+"张",
          icon: 'success',
          duration: 2000
        })
        wx.navigateTo({
          url: '/pages/multiResult/multiResult',
          success:function(res){
                // 通过eventChannel向被打开页面传送数据 
               res.eventChannel.emit('acceptDataFromOpenerPage', {data:that.data.imageFilesArray,backCount:2})
          }
        }) 
      }else{
        //递归调用，上传下一张
        that.uploadOneByOne(successUp, failUp, count, length);
        console.log('正处理第' + count + '张');
      }
    }
  })
},
delImage:function(e){
  var index = e.target.dataset.key;
  this.data.imageFilesArray.splice(index,1);
  this.data.imagePaths.splice(index,1);
  this.data.index--;
  this.setData({
    imageFilesArray:this.data.imageFilesArray,
    imagePaths:this.data.imagePaths
  })
},
chooseImages:function (e) {
  var that=this;
  wx.showActionSheet({
    itemList:["相册选图","聊天记录选图"],
    success (res) {
      console.log(res.tapIndex)
      let index=res.tapIndex;
      if(index==0){
        that.mutliImageUpload();
      } 
      if(index==1){
        that.mutliMessageImageUpload();
      }   
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
            var finalFiles=that.data.imageFilesArray;
            var index=that.data.index;
            var imagePaths=that.data.imagePaths;
              for(var i=0;i<imageFiles.length;i++){
                  finalFiles[index]=imageFiles[i];
                  imagePaths[index]=imageFiles[i].path
                  index++;               
              }
              that.setImageFiles(0,imageFiles);
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
      var finalFiles=that.data.imageFilesArray;
      var index=that.data.index;
      var imagePaths=that.data.imagePaths;
        for(var i=0;i<imageFiles.length;i++){
            finalFiles[index]=imageFiles[i];
            imagePaths[index]=imageFiles[i].path
            index++;               
        }
        that.setImageFiles(0,imageFiles);
    }           
  });
},
setImageFiles:function(start,images){
  var temp=this.data.imageFilesArray;
  var that=this;
  if(start<images.length){
  wx.getImageInfo({
    src: images[start].path,
    success (res) {
      var temps=that.data.imageFilesArray[that.data.index];
      temps["width"]=res.width;
      temps["height"]=res.height;
      temps["path"]=res.path
      start++
      if(that.data.index==(temp.length-1)){
        that.setData({
          imageFilesArray:that.data.imageFilesArray      
        })
      }
      that.data.index++;;
      that.setImageFiles(start++,images);
    }
  })
} 
},
})