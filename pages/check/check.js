// pages/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newData:{},
    array:["相册选5张图片","聊天记录选5张图片"],
    mode:false, //单选多选模式
    phones:0  //拍照数量
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
    console.log("*****data*****"+JSON.stringify(that.data));
  },

  
  startCamera: function (event) {
    var typeCode=this.data.typeCode;
    var count=this.data.count;
    var that =this;
    this.ctx = wx.createCameraContext();
    console.log("*****typeCode*****"+typeCode);
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
            console.log("*****success*****"+res.data); 
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
              console.log("count:" +count);
            if(count==2){ // 需要正反面或者是两页扫描的情况
              if (Object.keys(that.data.newData).length === 0) {
                    that.data.newData=newData;
                    var mytoast01=that.selectComponent("#mytoast");
                    mytoast01.showMessage("请上传另一面");   
              }else{
                  let temJson=that.data.newData;
                  for(var attr in temJson){
                    if(temJson[attr] !=''){
                      newData[attr]=temJson[attr];
                    }                   
                  } 
                  wx.navigateTo({
                    // url: '/pages/piaoju/piaoju?typeCode='+typeCode,
                    url: '/pages/kazheng/kazheng?typeCode='+typeCode,
                    success:function(res){
                        console.log("****send******"+JSON.stringify(newData))
                          // 通过eventChannel向被打开页面传送数据
                         res.eventChannel.emit('acceptDataFromOpenerPage', { data:newData})
                    }
                  }) 
              }         
            }else{
                wx.navigateTo({
                  // url: '/pages/piaoju/piaoju?typeCode='+typeCode,
                  url: '/pages/kazheng/kazheng?typeCode='+typeCode,
                  success:function(res){
                      console.log("****send******"+JSON.stringify(newData))
                        // 通过eventChannel向被打开页面传送数据
                       res.eventChannel.emit('acceptDataFromOpenerPage', { data:newData})
                  }
                })
            }
          },
          fail(res){
           
          },
          complete(res){
            wx.hideLoading();
          }
        })
      }
    });
  },
  chooseImage:function(){
    let that=this;
     wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
       success: (res) => {
          let filePath=res.tempFilePaths[0];
          console.log("------filepath----------"+res.tempFilePaths[0]);
          console.log("------filepath----------"+JSON.stringify(res));
          that.uploadFile(filePath);
       },
     }) 
  },
  chooseMessageFile:function(){
    let that=this;
    wx.chooseMessageFile({
      count: 6,
      type:"image",
      success(res){
        console.log("------filepath----------"+JSON.stringify(res));
        console.log("------filepath----------"+res.tempFiles[0].path);
        let filePath=res.tempFiles[0].path;
        that.uploadFile(filePath);
      }
    })
  },
  uploadFile:function(filePath){
    var typeCode=this.data.typeCode;
    var count=this.data.count;
    var that =this;
    console.log("*****typeCode*****"+typeCode); 
    wx.uploadFile({
      filePath: filePath,
      name: 'file',
      formData:{"indexType":typeCode},
      url: 'http://120.92.14.251/out/imageToWord/uploadFile/upload',
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
          console.log("count:" +count); 
        if(count==2){ // 需要正反面或者是两页扫描的情况
          if (Object.keys(that.data.newData).length === 0) {
                that.data.newData=newData;
                var mytoast01=that.selectComponent("#mytoast");
                mytoast01.showMessage("请上传另一面");  
          }else{
              let temJson=that.data.newData;
              for(var attr in temJson){
                if(temJson[attr] !=''){
                  newData[attr]=temJson[attr];
                }                   
              } 
              wx.navigateTo({
                // url: '/pages/piaoju/piaoju?typeCode='+typeCode,
                url: '/pages/kazheng/kazheng?typeCode='+typeCode,
                success:function(res){
                    console.log("****send******"+JSON.stringify(newData))
                      // 通过eventChannel向被打开页面传送数据
                     res.eventChannel.emit('acceptDataFromOpenerPage', { data:newData})
                }
              }) 
          }         
        }else{
          console.log("****send**############################****"+JSON.stringify(newData))
            wx.navigateTo({
              // url: '/pages/piaoju/piaoju?typeCode='+typeCode,
              url: '/pages/kazheng/kazheng?typeCode='+typeCode,
              success:function(res){
                console.log("****typeCode**############################****"+typeCode)
                    // 通过eventChannel向被打开页面传送数据
                   res.eventChannel.emit('acceptDataFromOpenerPage', { data:newData})
              }
            })
        }
      },
      fail(res){
        wx.hideLoading();
      },
      complete(res){
        wx.hideLoading();
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
      
      console.log("-------------picker-----"+this.data.array[index])
  },
  changeMode:function (e){
    this.setData({
      mode:e.detail.value,
      phones:0
    })
    console.log("-------------switch-----"+e.detail.value)
  },
  mutliImageUpload:function(){
    var that = this;
    wx.chooseImage({
            count: 6,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
                var successUp = 0; //成功
                var failUp = 0; //失败
                var length = res.tempFiles.length; //总数
                var count = 0; //第几张
               that.uploadOneByOne(res.tempFiles,successUp,failUp,count,length);
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
                var successUp = 0; //成功
                var failUp = 0; //失败
                var length = res.tempFiles.length; //总数
                var count = 0; //第几张
              //  that.uploadOneByOne(res.tempFiles,successUp,failUp,count,length);
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
  },
  /**
  * 采用递归的方式上传多张
  */
 uploadOneByOne(imgPaths,successUp, failUp, count, length){
  console.log("%%%%%%%%%%%%"+JSON.stringify(imgPaths))
  var that = this;
  var typeCode=that.data.typeCode;
  wx.showLoading({
     title: '正在上传第'+count+'张',
   })
  wx.uploadFile({
    filePath: imgPaths[count].path,
    name: 'file',
    formData:{"indexType":typeCode},
    url: 'http://120.92.14.251/out/imageToWord/uploadFile/upload',
    success:function(e){
      successUp++;//成功+1
    },
    fail:function(e){
      console.log("%%%%%%%%%%%%"+JSON.stringify(e))
      failUp++;//失败+1
    },
    complete:function(e){
      count++;//下一张
      if(count == length){
        //上传完毕，作一下提示
        console.log('上传成功' + successUp + ',' + '失败' + failUp);
        wx.showToast({
          title: '上传成功' + successUp,
          icon: 'success',
          duration: 2000
        })
      }else{
        //递归调用，上传下一张
        that.uploadOneByOne(imgPaths, successUp, failUp, count, length);
        console.log('正在上传第' + count + '张');
      }
    }
  })
}
})