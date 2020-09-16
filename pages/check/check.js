// pages/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newData:{},
    array:["相册选5张图片","聊天记录选5张图片"],
    mode:false, //单选多选模式 f
    takePhones:0,  //拍照数量
    takeImageFiles:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let count=1;
    let typeCode=options.typeCode;
    if(typeCode.indexOf("-") >0){
      let temp =typeCode.split("-");
      typeCode=temp[0];
      count=temp[1];
    }
    let that=this;
    that.setData({
      typeCode:typeCode,
      count:count
    })
  },
  //拍照模式
  changeMode:function (e){
    var isMulti = e.detail.value;
    var len = this.data.takeImageFiles.length;
    var that=this;
    if(!isMulti && len > 0){
        wx.showModal({
          title: '提示',
          content: '转换后会丢失已拍摄图片',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({
                mode:false,
                takePhones:0,
                takeImageFiles:[]
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
              that.setData({
                mode:true
              })
            }
          }
        })
    }else{
      that.setData({
        mode:isMulti
      })
    }
  },
  startCamera: function (event) {
    var mytoast01=this.selectComponent("#mytoast");
    var typeCode=this.data.typeCode;
    var count=this.data.count;
    var len=this.data.takeImageFiles.length;
    var that =this;
    this.ctx = wx.createCameraContext();
    console.log("*****typeCode*****"+typeCode);
    if(this.data.mode){ //多页识别
         if(len >= 6){
           mytoast01.showMessage("一批最多拍6张"); 
           return;  
         }

      this.ctx.takePhoto({
        quality : "high",
        success: (res) => {
          let temObj = {"path":res.tempImagePath}
          that.data.takeImageFiles[len++] = temObj;
          that.setData({
            takePhones:len
          })
          console.log("####################"+JSON.stringify(that.data.takeImageFiles))
        }
      })
    }else{ //单页识别
      wx.showLoading({
        title: '上传中...'
      })
      this.ctx.takePhoto({
        quality : "high",
        success: (res) => {
          wx.uploadFile({
            filePath: res.tempImagePath,
            name: 'file',
            formData:{"indexType":typeCode},
            url: 'http://120.92.14.251/out/imageToWord/uploadFile/upload',
            success(res){
              wx.hideLoading();
              let resultData=res.data;
              resultData=resultData.replace(" ","");
              let newData;
              if(typeof resultData != 'object'){
                  resultData=resultData.replace(/\ufeff/g,"");
                  newData = JSON.parse(resultData);
                }
              if(count==2){ // 需要正反面或者是两页扫描的情况
                if (Object.keys(that.data.newData).length === 0) {
                      that.data.newData=newData;
                      // var mytoast01=that.selectComponent("#mytoast");
                      mytoast01.showMessage("请上传另一面");   
                }else{
                    let temJson=that.data.newData;
                    for(var attr in temJson){
                      if(temJson[attr] !=''){
                        newData[attr]=temJson[attr];
                      }                   
                    } 
                    wx.navigateTo({
                      url: '/pages/kazheng/kazheng?typeCode='+typeCode,
                      success:function(res){
                           res.eventChannel.emit('acceptDataFromOpenerPage', { data:newData})
                      }
                    }) 
                }         
              }else{
                  wx.navigateTo({
                    url: '/pages/kazheng/kazheng?typeCode='+typeCode,
                    success:function(res){
                         res.eventChannel.emit('acceptDataFromOpenerPage', { data:newData})
                    }
                  })
              }
            },
            fail(res){          
            },
            complete(res){
            }
          })
        }
      });
    }
  },
  startDeal:function(){ //开始批量处理拍的照片
    var that=this;
    wx.navigateTo({
      url: '/pages/imageList/imageList?typeCode='+that.data.typeCode,
      success:function(res){
            // 通过eventChannel向被打开页面传送数据
           res.eventChannel.emit('acceptDataFromOpenerPage', {"imageFiles":that.data.takeImageFiles})
      }
    })
  },
  chooseImages:function (e) {
      var index=e.detail.value;
      if(index==0){
        this.mutliImageUpload();
      } 
      if(index==1){
        this.mutliMessageImageUpload();
      }
  },
  mutliImageUpload:function(){
    var that = this;
    wx.chooseImage({
            count: 6,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
              var imageFiles=res.tempFiles;  
              console.log("--------imageFiles----------"+JSON.stringify(imageFiles))
              wx.navigateTo({
                url: '/pages/imageList/imageList?typeCode='+that.data.typeCode,
                success:function(res){
                      // 通过eventChannel向被打开页面传送数据
                     res.eventChannel.emit('acceptDataFromOpenerPage', {"imageFiles":imageFiles})
                }
              })
            },        
    });
  },
  mutliMessageImageUpload:function(){
    var that = this;
    wx.chooseMessageFile({
            count: 6,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
              var imageFiles=res.tempFiles;  
              wx.navigateTo({
                url: '/pages/imageList/imageList?typeCode='+that.data.typeCode,
                success:function(res){
                      // 通过eventChannel向被打开页面传送数据
                     res.eventChannel.emit('acceptDataFromOpenerPage', {"imageFiles":imageFiles})
                }
              })
            },        
    });
  }
})