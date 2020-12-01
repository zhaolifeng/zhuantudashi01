// pages/component/explain/explain.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     isShow:{type:Boolean,value:true}
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeExplain:function(){
      wx.setStorageSync('explain', true)
      this.setData({
        isShow:true
      })
     }
  },
  attached() {
    var self = this;
    wx.getSystemInfo({
      success(res) {
        var isIos = res.system.indexOf('iOS') > -1;
        var statusHeight = res.statusBarHeight
        var navHeight = isIos ? 44 : 48
        self.setData({
          top:statusHeight+navHeight,
          isShow:true
        })
      }
    })
  }
})
