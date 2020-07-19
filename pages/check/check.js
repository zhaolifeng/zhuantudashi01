// pages/check/check.js
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
      let typeCode=data.typeCode;
      console.log("******recieve******"+JSON.stringify(typeCode));
      that.setData({
        typeCode:typeCode
      })
    })

  },

  
  startCamera: function () {
    let typeCode=event.currentTarget.dataset.typeCode;
    this.ctx = wx.createCameraContext();
    this.ctx.takePhoto({
      quality : "high",
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        });
        let base64 = wx.getFileSystemManager().readFileSync(res.tempImagePath, 'base64') ;
        console.log("*****开始*****");
        wx.showLoading({
          title: '上传中...'
        });
        console.log("*****结束*****");
        wx.uploadFile({
          filePath: res.tempImagePath,
          name: 'file',
          formData:{"indexType":typeCode},
          url: 'http://120.92.14.251/out/imageToWord/uploadFile/upload',
         // url: 'http://localhost:8050/uploadFile/upload',
          success(res){
            wx.hideLoading();
            console.log("*****success*****"+JSON.stringify(res.data)); 
            let resultData=res.data;
            resultData=resultData.replace(" ","");
            let newData;
            if(typeof resultData != 'object'){
                resultData=resultData.replace(/\ufeff/g,"");
                newData = JSON.parse(resultData);
                console.log("newData:"+JSON.stringify(newData));
                console.log("new code :" + newData.RequestId);
              }
            wx.navigateTo({
              url: '/pages/piaoju/piaoju',
              success:function(res){
                  console.log("****send******"+JSON.stringify(newData))
                    // 通过eventChannel向被打开页面传送数据
                   res.eventChannel.emit('acceptDataFromOpenerPage', { data:newData})
              }
            })
          },
          fail(res){
            wx.hideLoading();
            console.log("*****fail*****"+JSON.stringify(res));
          },
          complete(res){
            wx.hideLoading();
            console.log("*****complete*****");
          }
        })
      }
    });
  },

  uploadfile:function(){
    wx.chooseImage({
      success: res => {
      wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log('data:image/png;base64,=====' + res.data);
          }
        })

		//以下两行注释的是同步方法，不过我不太喜欢用。
       	 //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64') 
        //console.log(base64)
      }
    })
  }
})