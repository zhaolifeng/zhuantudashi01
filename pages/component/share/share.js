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
    zindex:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    preventTouchMove:function() {
      return false 
      },
      toShare:function(){
        this.setData({
          zindex:false 
        })
      }, 
    cancelEditor:function(){
      this.setData({
        zindex:true 
      })
    },    
    finishShare:function () {
      this.setData({
        zindex:true
      });
    }
  }
})
