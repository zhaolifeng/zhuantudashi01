// pages/groupMultiResult/groupMutliResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    result:[[{"name":"BusInvoiceOCR2.jpg","size":276207,"time":1597116453,"path":"http://tmp/wx927059c0e3ba4ff6.o6zAJs0YuqgyYShiLZNo96KdPsa4.b5TawVkKFZwNbfa7246053f5acf16a879883a27bd50b.jpg","type":"image","width":800,"height":660},{"name":"CarInvoiceOCR1.jpg","size":319211,"time":1597141062,"path":"http://tmp/wx927059c0e3ba4ff6.o6zAJs0YuqgyYShiLZNo96KdPsa4.bhd6w9ymuaR4deed3f26e3338e58e0a72bf390c2b782.jpg","type":"image","width":1000,"height":1000}],[{"name":"BusInvoiceOCR2.jpg","size":276207,"time":1597116453,"path":"http://tmp/wx927059c0e3ba4ff6.o6zAJs0YuqgyYShiLZNo96KdPsa4.b5TawVkKFZwNbfa7246053f5acf16a879883a27bd50b.jpg","type":"image","width":800,"height":660},{"name":"CarInvoiceOCR1.jpg","size":319211,"time":1597141062,"path":"http://tmp/wx927059c0e3ba4ff6.o6zAJs0YuqgyYShiLZNo96KdPsa4.bhd6w9ymuaR4deed3f26e3338e58e0a72bf390c2b782.jpg","type":"image","width":1000,"height":1000}],[{"name":"BusInvoiceOCR2.jpg","size":276207,"time":1597116453,"path":"http://tmp/wx927059c0e3ba4ff6.o6zAJs0YuqgyYShiLZNo96KdPsa4.b5TawVkKFZwNbfa7246053f5acf16a879883a27bd50b.jpg","type":"image","width":800,"height":660},{"name":"CarInvoiceOCR1.jpg","size":319211,"time":1597141062,"path":"http://tmp/wx927059c0e3ba4ff6.o6zAJs0YuqgyYShiLZNo96KdPsa4.bhd6w9ymuaR4deed3f26e3338e58e0a72bf390c2b782.jpg","type":"image","width":1000,"height":1000}]]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //   const eventChannel = this.getOpenerEventChannel();
  //   let that=this;
  //  this.data.typeCode= options.typeCode;
  //   eventChannel.once('acceptDataFromOpenerPage', function(data) {
  //     that.data.result=data.imageFiles;
  //     that.setImageFiles();
  //   })
   

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
    console.log("@@@+itemData.length@@@@"+JSON.stringify(item))  
      wx.getImageInfo({
        src: item.path,
        success (res) {
          item["width"]=res.width;
          item["height"]=res.height;       
          console.log("@@@itemIndex@@@@")
          if(that.data.index == that.data.result.length-1){
            that.setData({
              result:that.data.result      
            })
            console.log("############"+JSON.stringify(that.data.result));
          }
          itemIndex++
          console.log("@@@itemIndex@@@@"+itemData.length)
          if(itemIndex < itemData.length){
            that.setItem(itemData,that,itemIndex,len);
          }else{
            console.log("@@@len@@@@"+len+"@@@@@@@@@@"+that.data.index)
            that.data.index++ ;
            that.setImageFiles();
          }
          
        },
        fail(res){
           console.log("&&&&&&&&&"+JSON.stringify(res))
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
    console.log("----------------infos ---------"+infos)
    var that=this;
    var x=infos.split(":!|#")[0];
    var y=infos.split(":!|#")[1];
    console.log("----------------x ---------"+x)
    console.log("----------------y ---------"+y)
    this.data.result[x].splice(y,1)
    console.log("---------this.data.result------------"+JSON.stringify(this.data.result[x].length));
    if(this.data.result[x].length == 0){
      this.data.result.splice(x,1)
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
      itemList:["相册图片","聊天记录选图片"],
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
    wx.chooseImage({
            count: that.data.maxCount,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
              var imageFiles=res.tempFiles;
              var finalFiles=[];
              var index=0;
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
                that.setData({
                   result:finalFiles
                })
            }     
    });
  },
  mutliMessageImageUpload:function(){
    var that = this;
    wx.chooseMessageFile({
      count: that.data.maxCount,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res){
        var imageFiles=res.tempFiles;
        var finalFiles=[];
        var index=0;
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
        that.setData({
            result:finalFiles
        })
      }       
    });
  }
})