// pages/component/sendMail/sendMail.js
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
    mailPreText:"",
    mailAfterText:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    preventTouchMove:function() {
      return false 
      },
    sendMail:function(){
      this.setData({
        mailPreText:"",
        mailAfterText:"",
        zindex:false,
        errInfo:true
      });
    },
  cancleSend:function(){
    this.setData({
      zindex:true
    })
  },
  finishSender:function(){
   
    if(this.data.mailPreText != "" && this.data.mailAfterText !="" && this.data.mailAfterText.indexOf(".")>0 && this.data.mailAfterText.indexOf(".")< this.data.mailAfterText.length){
      var mailAddr=this.data.mailPreText+"@"+this.data.mailAfterText;
      console.log("$$$$$$$$$$$"+mailAddr)
      this.triggerEvent("mailText",{mailAddr:mailAddr});
      this.setData({
        zindex:true,
      })
    }else{
      this.setData({
        errInfo:false
      })
    }

  },
  preInputText:function(e){
    this.data.mailPreText=e.detail.value;
  },
  afterInputText:function(e){
    this.data.mailAfterText=e.detail.value;
  }
}
})
