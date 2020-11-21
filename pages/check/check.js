// pages/check/check.js
var util = require('../../utils/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxCount:8,
    newData:{path:[],response:[]},
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
    let title=""
    //一直向后传递的参数
    wx.setStorageSync('typeCode', options.typeCode)
    if(typeCode.indexOf("-") >0){
      let temp =typeCode.split("-");
      typeCode=temp[0];
      count=temp[1];
      title=temp[2] ;
    }
    wx.setNavigationBarTitle({
      title: title,
    })
    let that=this;
    that.setData({
      typeCode:typeCode,
      count:count
    })
    //需要双面识别情况下判断是否需要双面识别
    if(count ==2 ){
      wx.showModal({
        title: '识别模式提示',
        content: '需要双面或双页识别吗？',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击确定')
            that.setData({
              typeCode:typeCode,
              count:1
            })
          }
        }
      })
    }
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.newData.path=[];
    this.data.newData.response=[];
    this.data.takeImageFiles=[]
    let len=this.data.newData.response.length
    this.setData({
      takePhones:0
    })
    console.log("------onShow-------"+this.data.takePhones)
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
         if(len >= this.data.maxCount){
           mytoast01.showMessage("一批最多拍"+this.data.maxCount+"张");  
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
        title: '处理中...'
      })

      var openUserId= util.getOpenId();
      this.ctx.takePhoto({
        quality : "high",
        success: (res) => {
          var imagePath=res.tempImagePath;
          var url='https://www.coolpov.com/uploadFile/upload';
          wx.uploadFile({
            filePath:imagePath,
            name: 'file',
            formData:{"indexType":typeCode,"openUserId":openUserId},
            
            url: url,
            success(res){
              wx.hideLoading();
              let resultData=res.data;
              let newData;
              if(res.statusCode == 200){              
                if(typeof(resultData) != 'object'){
                  newData= JSON.parse(resultData);               
                  if(newData.status == 200){
                    newData= newData.data;
                  }else{
                    var mytoast01=that.selectComponent("#mytoast");
                    mytoast01.showMessage("异常请重试");  
                    return ;
                  }
                }
              }else{
                var mytoast01=that.selectComponent("#mytoast");
                mytoast01.showMessage("异常请重试");  
                return ;
              }

              if(count==2){ // 需要正反面或者是两页扫描的情况
                  let len=that.data.newData.path.length;
                  that.data.newData.path[len]=imagePath;
                  for(var i=0;i<newData.length;i++){
                    if(newData[i].value !=""){
                      that.data.newData.response.push(newData[i])
                    }
                  }
                  if(len == 0){
                      var mytoast01=that.selectComponent("#mytoast");
                      mytoast01.showMessage("请上传另一面");  
                  }else{
                    wx.navigateTo({
                      url: '/pages/multiResult/multiResult',
                      success:function(res){
                            // 通过eventChannel向被打开页面传送数据
                           res.eventChannel.emit('acceptDataFromOpenerPage', { data:[that.data.newData]})
                      }
                    }) 
                  }     
              }else{
                that.data.newData.path=imagePath;
                that.data.newData.response=newData 
                wx.navigateTo({
                  url: '/pages/multiResult/multiResult',
                  success:function(res){
                        // 通过eventChannel向被打开页面传送数据
                       res.eventChannel.emit('acceptDataFromOpenerPage', { data:[that.data.newData]})
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
    var imageFiles=that.data.takeImageFiles;
    var redirectPath;
    var finalFiles=[];
    var index=0;
    if(this.data.count==2){
      redirectPath="/pages/groupMultiResult/groupMutliResult?typeCode=";
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
      imageFiles=finalFiles;
    }else{
      redirectPath="/pages/imageList/imageList?typeCode=";
    }
    wx.navigateTo({
      url: redirectPath+that.data.typeCode,
      success:function(res){
            // 通过eventChannel向被打开页面传送数据
           res.eventChannel.emit('acceptDataFromOpenerPage', {"imageFiles":imageFiles})
      }
    })
  },
  chooseImages:function (e) {
    var that=this;
    var count=this.data.count;
    var tips;
    if(count == 2){ //需要拍两面的完成的
        tips=["相册连续两张图一组","聊天记录连续两张图一组"];
    }else{
        tips=["相册图片","聊天记录选图片"];
    }
    wx.showActionSheet({
      itemList:tips,
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
  mutliImageUpload:function(){
    var that = this;
    var takeCount=this.data.count;
    wx.chooseImage({
            count: that.data.maxCount,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
              var imageFiles=res.tempFiles;
              var redirectPath;
              var finalFiles=[];
              var index=0;
              if(takeCount==2){
                redirectPath="/pages/groupMultiResult/groupMutliResult?typeCode=";
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
                imageFiles=finalFiles;
              }else{
                redirectPath="/pages/imageList/imageList?typeCode=";
              }
              wx.navigateTo({
                url: redirectPath+that.data.typeCode,
                success:function(res){
                      // 通过eventChannel向被打开页面传送数据
                     res.eventChannel.emit('acceptDataFromOpenerPage', {"imageFiles":imageFiles})
                }
              })
            }     
    });
  },
  mutliMessageImageUpload:function(){
    var that = this;
    var takeCount=this.data.count;
    wx.chooseMessageFile({
      count: that.data.maxCount,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res){
        var imageFiles=res.tempFiles;
        var redirectPath;
        var finalFiles=[];
        var index=0;
        if(takeCount==2){
          redirectPath="/pages/groupMultiResult/groupMutliResult?typeCode=";
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
          imageFiles=finalFiles;
        }else{
          redirectPath="/pages/imageList/imageList?typeCode=";
        }
        wx.navigateTo({
          url: redirectPath+that.data.typeCode,
          success:function(res){
                // 通过eventChannel向被打开页面传送数据
               res.eventChannel.emit('acceptDataFromOpenerPage', {"imageFiles":imageFiles})
          }
        })
      }       
    });
  }
})