// pages/component/operator/operator.js
Component({
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log("-----operator组件开始-------")
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
      console.log("-----operator组件结束-------")
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
 
  },

  /** 
   * 组件的初始数据
   */
  data: {
    zindex:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
      preventTouchMove:function() {
        return false 
      },
      startOper:function (message,touchData) {
        this.data.sourceData=message
        console.log("$$$$$$$$$$$$$$"+JSON.stringify(this.data.sourceData));
        this.setData({
          zindex:false,
          top:touchData,
          right:1
        });
      },
      operator:function (e) {       
        let message=e.target.dataset.key;
        if(message == "viewImage"){
          console.log("********viewImage*******"+JSON.stringify(this.data.sourceData.path))
          var path=this.data.sourceData.path;
          var paths=[path];
          wx.previewImage({
            current:path,  
            urls: paths  
          })
        }
        if(message == "copySignal"){
        var copyData=""
          var sourceData=this.data.sourceData.response;
          for(var i=0;i<sourceData.length;i++){          
            copyData=copyData + sourceData[i].name+":"+sourceData[i].value+"\n";           
          }
          wx.setClipboardData({
            data: copyData,
            success (res) {
              wx.getClipboardData({
                success (res) {
                  console.log("-----copyOk----------"+res.data) // data
                }
              })
            }
          })
        }
        if(message == "exportFile"){
          this.exportFile();
        }
      },
      endOperator:function () {
        console.log("%%%%%%endOperator%%%%%%%")
        this.setData({
          zindex:true
        });
      },
      onCopyInfo:function(){
        var checkboxItems = this.data.selectData;
        var resultData=this.data.resultData;
        console.log("&&&###checkboxItems###&&"+(JSON.stringify(checkboxItems))); 
        console.log("&&&###resultData###&&"+JSON.stringify(resultData));
        if(checkboxItems==undefined || JSON.stringify(checkboxItems) == "{}"){
          var mytoast01=this.selectComponent("#mytoast");
          mytoast01.showMessage("请选择要复制信息");   
          return
        }
        let lenI = checkboxItems.length;
        let lenG = resultData.length;
        var selected='';
    
        for (var i = 0; i < lenI; ++i) {
            for(var j=0;j<lenG;j++){
              if(checkboxItems[i] == resultData[j].name){
                selected=selected + resultData[j].name+":"+resultData[j].value+"\n";
              }
            }
        }
        console.log("&&&###resultData###&&"+selected);
        wx.setClipboardData({
          data: selected,
          success (res) {
            wx.getClipboardData({
              success (res) {
                console.log(res.data) // data
              }
            })
          }
        })
      },
      exportFile:function(){
        var paht=this.data.sourceData.path;
        wx.saveFile({
          tempFilePath: paht,
          success (res) {
            const savedFilePath = res.savedFilePath
            console.log("-------savedFilePath----------"+JSON.stringify(res)) 
          }
        })
      }
  }
})