// pages/component/navbar/navbar.js
Component({
  properties: {
    /**
     * 自定义返回事件处理
     * customBackReturn="{{true}}" bind:customBackReturn="customBackReturn"
     */
    customBackReturn: {
      type: Number,
      value: 1
    },
    navToPath:{
      type:String,
      value:""
    },
    title: {
      type: String,
      value: "识别结果"
    }
  },
  data: {

  },
  methods: {
    backClick() {
      // if (this.data.customBackReturn) {
      //   this.triggerEvent("customBackReturn")
      // } else {
      //   if (getCurrentPages().length == 1) {
      //     wx.switchTab({
      //       url: '/pages/index/index',
      //     })
      //   } else {
      //     wx.navigateBack({
      //       delta: this.data.customBackReturn
      //     })
      //   } 
      // }
      if(this.data.navToPath !=''){
        this.triggerEvent("navTo",{navToPath:this.data.navToPath})
      }else{
        wx.navigateBack({
          delta: this.data.customBackReturn
        })
      }

    }
  },
  attached() {
    var self = this;
    wx.getSystemInfo({
      success(res) {
        var isIos = res.system.indexOf('iOS') > -1;
        self.setData({
          statusHeight: res.statusBarHeight,
          navHeight: isIos ? 44 : 48
        })
      }
    })
  }
})