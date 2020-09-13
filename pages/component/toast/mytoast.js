// pages/component/mytoast/mytoast.js
Component({
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
     showMessage:function (message) {
       var that=this;
              setTimeout(function () {
                that.setData({
                  zindex:false,
                  message:message
                });
                setTimeout(function () {
                  that.setData({
                    zindex:true
                  });
                },2000,0)
              },0,0);
     }
  }
})
