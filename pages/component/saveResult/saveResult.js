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
    zindex:true,
    errInfo:true,
    title:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
  preventTouchMove:function() {
      return false 
      },
  saveResult:function(dataIndex){
      this.setData({
        title:"",
        zindex:false,
        errInfo:true,
        dataIndex:dataIndex
      });
    },
  cancleSend:function(){
    this.setData({
      zindex:true
    })
  },
  finishSender:function(){
    if(this.data.title != "" || this.data.title == undefined){
      var title=this.data.title;
      var index=this.data.dataIndex;
      this.triggerEvent("setTitle",{"title":title,"index":index});
      this.setData({
        zindex:true,
      })
    }else{
      this.setData({
        errInfo:false
      })
    }

  },
  titleText:function(e){
    this.data.title=e.detail.value;
  }
}
})
