// pages/component/editor/editor.js
Component({
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log("-----组件开始-------")
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
      console.log("-----组件结束-------")
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
    message:"ssss",
    zindex:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    preventTouchMove:function() {
      return false 
      },
    inputText:function(e){
      this.setData({
         updateText:e.detail.value
      })
    },
    startEditor:function (message) {
      var infos=message.split(":!|#")
      var prefix=infos[0]+":!|#"+infos[1]+":!|#";
      this.setData({
        zindex:false,
        message:infos[2],
        updateText:"",
        prefix:prefix
      });
    },
    finishEditor:function(){
      if(this.data.updateText != ""){
        var updateInfo=this.data.prefix+this.data.updateText;
        this.triggerEvent("updateText",{message:updateInfo});
      }
      this.setData({
        zindex:true
      })

 
    },
    cancelEditor:function(){
      this.setData({
        zindex:true
      })
    }
  }
})
