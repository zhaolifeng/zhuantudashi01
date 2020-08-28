// pages/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newData:{}
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
    this.ctx.takePhoto({
      quality : "high",
      success: (res) => {
        wx.showLoading({
          title: '上传中...'
        });
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
              var kanzheng=/^(002)/;
              var piaojue=/^(001)/;
            if(count==2){ // 需要正反面或者是两页扫描的情况
              if (Object.keys(that.data.newData).length === 0) {
                    that.data.newData=newData;
              }else{
                  let temJson=that.data.newData;
                  for(var attr in temJson){
                    if(temJson[attr] !=''){
                      newData[attr]=temJson[attr];
                    }                   
                  } 
                  wx.navigateTo({
                    url: '/pages/piaoju/piaoju?typeCode='+typeCode,
                    success:function(res){
                        console.log("****send******"+JSON.stringify(newData))
                          // 通过eventChannel向被打开页面传送数据
                         res.eventChannel.emit('acceptDataFromOpenerPage', { data:newData})
                    }
                  }) 
              }         
            }else{
                wx.navigateTo({
                  url: '/pages/piaoju/piaoju?typeCode='+typeCode,
                  success:function(res){
                      console.log("****send******"+JSON.stringify(newData))
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
      }
    });
  },
  chooseImage:function(){
    let that=this;
     wx.chooseImage({
      count: 1,
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
      count: 1,
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
          }else{
              let temJson=that.data.newData;
              for(var attr in temJson){
                if(temJson[attr] !=''){
                  newData[attr]=temJson[attr];
                }                   
              } 
              wx.navigateTo({
                url: '/pages/piaoju/piaoju?typeCode='+typeCode,
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
              url: '/pages/piaoju/piaoju?typeCode='+typeCode,
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
  }
})