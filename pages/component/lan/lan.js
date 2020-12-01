// pages/component/lan/lan.js
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
    isHidden:true,
    from:"auto",
    fromKey:"自动",
    to:"zh",
    toKey:"中文",
    langs:[
      {name:"自动",key:"auto"},
      {name:"中文",key:"zh"},
      {name:"繁体中文",key:"cht"},
      {name:"英语",key:"en"},
      {name:"法语",key:"fra"},
      {name:"西班牙语",key:"spa"},
      {name:"葡萄牙语",key:"pt"},
      {name:"日语",key:"jp"},
      {name:"韩语",key:"kor"},
      {name:"泰语",key:"th"},
      {name:"越南语",key:"vie"},
      {name:"阿拉伯语",key:"ara"},
      {name:"俄语",key:"ru"},
      {name:"德语",key:"de"},
      {name:"意大利语",key:"it"},
      {name:"希腊语",key:"el"},
      {name:"荷兰语",key:"nl"},
      {name:"波兰语",key:"pl"},
      {name:"保加利亚语",key:"bul"},
      {name:"爱沙尼亚语",key:"est"},
      {name:"丹麦语",key:"dan"},
      {name:"芬兰语",key:"fin"},
      {name:"捷克语",key:"cs"},
      {name:"罗马尼亚语",key:"rom"},
      {name:"斯洛文尼亚语",key:"slo"},
      {name:"瑞典语",key:"swe"},
      {name:"匈牙利语",key:"hu"}
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
     from:function(){
       this.setData({
         isHidden:false,
         current:"from"
       })

     },
     to:function(){
      this.setData({
        isHidden:false,
        current:"to"
      })
     },
     endOperator:function () {
      this.setData({
        isHidden:true
      });
    },
    selectLan:function(event){
      console.log("*****************"+JSON.stringify(event.target.dataset.lan))
      console.log("*****************"+JSON.stringify(event.target.dataset.lankey))
      let that=this
      if(this.data.current == "from"){
        this.setData({
          from:event.target.dataset.lan,
          fromKey:event.target.dataset.lankey,
          isHidden:true
        })
      }

      if(this.data.current == "to"){
        this.setData({
          to:event.target.dataset.lan,
          toKey:event.target.dataset.lankey,
          isHidden:true
        })
      }
      this.triggerEvent("setLan",{from:that.data.from,to:that.data.to}); 
    }
  },
  attached() {
    var that = this;
    this.triggerEvent("setLan",{from:that.data.from,to:that.data.to}); 
  }
})
