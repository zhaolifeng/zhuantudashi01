// pages/imageList/imageList.js
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
      
      that.data.imageFiles=data.imageFiles;
      that.setImageFileInfo();
      console.log("############"+JSON.stringify(that.data.imageFiles));
    })
},

setImageFileInfo:function(){
      var temp=this.data.imageFiles;
      var that=this;
      if(that.data.index<temp.length){
      var tempObj={};
      wx.getImageInfo({
        src: temp[that.data.index].path,
        success (res) {
          tempObj["width"]=res.width;
          tempObj["height"]=res.height;
          tempObj["path"]=res.path
          that.data.imagePaths[that.data.index]=res.path;
          that.data.imageFilesArray[that.data.index]=tempObj;
          if(that.data.index==(temp.length-1)){
            that.setData({
              imageFiles:that.data.imageFilesArray      
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
  console.log("$$$$$$$$$$$$"+current);
  console.log("$$$$$$$$$$$$"+JSON.stringify(e.target.dataset));
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
    var length = this.data.imageFiles.length; //总数
    var count = 0; //第几张
    this.uploadOneByOne(successUp, failUp, count, length)
  },
   /**
  * 采用递归的方式上传多张
  */
 uploadOneByOne(successUp, failUp, count, length){
  var imgPaths=this.data.imageFiles;
  var that = this;
  var typeCode=that.data.typeCode;
  wx.showLoading({
     title: '正上传第'+(count+1)+'张',
   })
   wx.uploadFile({
    filePath:that.data.imageFiles[count].path,
    name: 'file',
    formData:{"indexType":typeCode},
    url: 'http://120.92.14.251/out/imageToWord/uploadFile/upload',
    success(res){
      wx.hideLoading();
      successUp++;//成功+1
      if(typeof res.data != 'object'){
        that.data.imageFiles[count].response = JSON.parse(res.data.replace(/\ufeff/g,""));
      }else{
        that.data.imageFiles[count].response=res.data;
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
          title: '上传成功' + successUp+"张",
          icon: 'success',
          duration: 2000
        })
        wx.navigateTo({
          url: '/pages/multiResult/multiResult',
          success:function(res){
              console.log("****send******"+JSON.stringify(that.data.imageFiles))
                // 通过eventChannel向被打开页面传送数据
               res.eventChannel.emit('acceptDataFromOpenerPage', { data:that.data.imageFiles})
          }
        }) 
      }else{
        //递归调用，上传下一张
        that.uploadOneByOne(successUp, failUp, count, length);
        console.log('正在上传第' + count + '张');
      }
    }
  })
},
delImage:function(e){
  var index = e.target.dataset.key;
  var that=this;
console.log("-------index-----"+this.data.index)
console.log("-------imageFilesArray-----"+JSON.stringify(this.data.imageFilesArray))
console.log("-------imagePaths-----"+this.data.imagePaths)

  var x=infos.split(":!|#")[0];
  var y=infos.split(":!|#")[1];
  this.data.result[x].splice(y,1)
  if(this.data.result[x].length == 0){
    this.data.result.splice(x,1)
    this.data.index= this.data.result.length-1;
    this.setData({
      result:this.data.result
    })
  }else{
    this.setData({
      result:this.data.result
    })
  }
},
})