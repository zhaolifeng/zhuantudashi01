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
  properties:{
    showKeys:{
      type:Array,
      value:["view","save","copy","share","mail"]
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
      preventTouchMove:function() {
        return false 
      },
      startOper:function (message,index,touchData) {
        this.data.sourceData=message
        this.setData({
          zindex:false,
          top:touchData,
          index:index,
          right:1,
          showKeys:this.data.showKeys
        });
      },
      operator:function (e) {       
        let message=e.target.dataset.key;
        if(message == "viewImage"){
          var paths=[]
          var path=this.data.sourceData.path;
          if(path instanceof Array){
            paths=this.data.sourceData.path
          }
          if(typeof(path) == "string"){
            paths=[this.data.sourceData.path];           
          }      
          wx.previewImage({
            current:paths[0],  
            urls: paths  
          })
        }
        if(message == "copySignal"){
          this.copyInfo()
        }
        if(message == "shareInfo"){
          this.shareInfo();
        }
        if(message == "senMail"){
          this.senMail();
        }
        if(message == "saveResult"){
          this.saveResult();
        }
      },
      endOperator:function () {
        this.setData({
          zindex:true
        });
      },
      copyInfo:function(){
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
          }
        })
      },
      shareInfo:function(){
        this.copyInfo();
        var index=this.data.index;
        this.triggerEvent("toOperater",{dataIndex:index,operater:"share"});
      },
      senMail:function(){
        var index=this.data.index;
        this.triggerEvent("toOperater",{dataIndex:index,operater:"sendMail"});
      },
      saveResult:function(){
        var index=this.data.index;
        this.triggerEvent("toOperater",{dataIndex:index,operater:"saveResult"}); 
      }
  }
})
