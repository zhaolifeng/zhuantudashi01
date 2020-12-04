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
    let typeCode=options.typeCode;
    let title=""
    //一直向后传递的参数
    wx.setStorageSync('typeCode', options.typeCode)
    if(typeCode.indexOf("-") >0){
      let temp =typeCode.split("-");
      typeCode=temp[0];
      title=temp[2] ;
    }
    wx.setNavigationBarTitle({
      title: title,
    })
    let that=this;
    let funkey = wx.getStorageSync("fun"+typeCode)
    console.table(funkey)
    that.setData({
      typeCode:typeCode,
      funkey:funkey
    })
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
  
  startCamera: function (event) {
    var typeCode=this.data.typeCode;
    var that =this;
    this.ctx = wx.createCameraContext();
    console.log("*****typeCode*****"+typeCode);
      wx.showLoading({
        title: '处理中...'
      })

      var openUserId= util.getOpenId();
      this.ctx.takePhoto({
        quality : "high",
        success: (res) => {
          var imagePath=res.tempImagePath;
          var url='https://www.coolpov.com/uploadFile/upload';
          console.log("########imageInfo#######"+JSON.stringify(res))
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
              wx.getImageInfo({
                src: imagePath,
                success(res){
                  that.data.newData.width=res.width
                  that.data.newData.height=res.height; 
                  that.data.newData.path=imagePath;
                  that.data.newData.response=newData 
                  console.log("$$$$$$$$$$$$$$"+JSON.stringify(that.data.newData))
                  wx.navigateTo({
                    url: '/pages/suanshu/suanshu',
                    success:function(res){
                          // 通过eventChannel向被打开页面传送数据
                          res.eventChannel.emit('acceptDataFromOpenerPage', { data:[that.data.newData]})
                    }
                  })
                }
              })
              
            }
          })
        }
      });
  }
})