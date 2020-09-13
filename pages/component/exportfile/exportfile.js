// pages/component/exportfile/exportfile.js
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
    array:["导出Excel文档","导出JSON文件","导出WORD文档"],
    zindex:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showMessage:function (message) {
      var that=this;
      that.setData({
        zindex:false
      });
            
    }
  }
})
