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
        this.setData({
          src: res.tempImagePath
        });
        let base64 = wx.getFileSystemManager().readFileSync(res.tempImagePath, 'base64') ;
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
                    url: '/pages/kazheng/kazheng?typeCode='+typeCode,
                    success:function(res){
                        console.log("****kazheng******"+JSON.stringify(newData))
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
  }
})