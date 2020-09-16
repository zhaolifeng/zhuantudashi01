// pages/multiResult/multiResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:[
      {
          "width":829,
          "height":526,
          "path":"http://tmp/wx927059c0e3ba4ff6.o6zAJs0YuqgyYShiLZNo96KdPsa4.UVv3YHfyDk045892ee415c67e98651e39af1effb934d.jpg",
          "response":[
              {
                  "name":"价税合计(大写)",
                  "value":"壹佰叁拾贰圆捌角柒分"
              },
              {
                  "name":"发票代码",
                  "value":"011001900111"
              },
              {
                  "name":"发票号码",
                  "value":"No10835256"
              },
              {
                  "name":"发票名称",
                  "value":"北京增值税电子普通发票"
              },
              {
                  "name":"合计税额",
                  "value":"¥15.29"
              },
              {
                  "name":"合计金额",
                  "value":"¥117.58"
              },
              {
                  "name":"复核",
                  "value":"李光"
              },
              {
                  "name":"密码区1",
                  "value":"03494384&gt;/971&lt;&gt;937+33276867/"
              },
              {
                  "name":"密码区2",
                  "value":"9&lt;-*1&gt;41032842&lt;1*3/*7528+8/-"
              },
              {
                  "name":"密码区3",
                  "value":"0/9-+12**&lt;/1/*&gt;4+&lt;325//13-&lt;5"
              },
              {
                  "name":"密码区4",
                  "value":"1-29+-*620011&lt;&lt;/198&lt;86926157"
              },
              {
                  "name":"小写金额",
                  "value":"¥132.87"
              },
              {
                  "name":"开票人",
                  "value":"金秀芳"
              },
              {
                  "name":"开票日期",
                  "value":"2020年04月28日"
              },
              {
                  "name":"收款人",
                  "value":"李光"
              },
              {
                  "name":"机器编号",
                  "value":"499098489401"
              },
              {
                  "name":"校验码",
                  "value":"09069660729768985255"
              },
              {
                  "name":"省",
                  "value":"北京市"
              },
              {
                  "name":"购买方名称",
                  "value":"北京悦航天翼电子信息技术有限公司"
              },
              {
                  "name":"购买方识别号",
                  "value":"91110101080528066H"
              },
              {
                  "name":"销售方名称",
                  "value":"北京通糖物美便利超市有限公司"
              },
              {
                  "name":"销售方地址、电话",
                  "value":"北京市通州区翠屏里218号4001016016"
              },
              {
                  "name":"销售方开户行及账号",
                  "value":"工商银行通州区支行迎宾分理处20053309006959603"
              },
              {
                  "name":"销售方识别号",
                  "value":"9111011273939073XF"
              },
              {
                  "name":"货物或应税劳务、服务名称",
                  "value":"*其他食品*食品"
              },
              {
                  "name":"金额",
                  "value":"117.58"
              },
              {
                  "name":"税率",
                  "value":"13%"
              },
              {
                  "name":"税额",
                  "value":"15.29"
              }
          ]
      },
      {
          "width":829,
          "height":526,
          "path":"http://tmp/wx927059c0e3ba4ff6.o6zAJs0YuqgyYShiLZNo96KdPsa4.8uCPIHDZeE8p5892ee415c67e98651e39af1effb934d.jpg",
          "response":[
              {
                  "name":"价税合计(大写)",
                  "value":"壹佰叁拾贰圆捌角柒分"
              },
              {
                  "name":"发票代码",
                  "value":"011001900111"
              },
              {
                  "name":"发票号码",
                  "value":"No10835256"
              },
              {
                  "name":"发票名称",
                  "value":"北京增值税电子普通发票"
              },
              {
                  "name":"合计税额",
                  "value":"¥15.29"
              },
              {
                  "name":"合计金额",
                  "value":"¥117.58"
              },
              {
                  "name":"复核",
                  "value":"李光"
              },
              {
                  "name":"密码区1",
                  "value":"03494384&gt;/971&lt;&gt;937+33276867/"
              },
              {
                  "name":"密码区2",
                  "value":"9&lt;-*1&gt;41032842&lt;1*3/*7528+8/-"
              },
              {
                  "name":"密码区3",
                  "value":"0/9-+12**&lt;/1/*&gt;4+&lt;325//13-&lt;5"
              },
              {
                  "name":"密码区4",
                  "value":"1-29+-*620011&lt;&lt;/198&lt;86926157"
              },
              {
                  "name":"小写金额",
                  "value":"¥132.87"
              },
              {
                  "name":"开票人",
                  "value":"金秀芳"
              },
              {
                  "name":"开票日期",
                  "value":"2020年04月28日"
              },
              {
                  "name":"收款人",
                  "value":"李光"
              },
              {
                  "name":"机器编号",
                  "value":"499098489401"
              },
              {
                  "name":"校验码",
                  "value":"09069660729768985255"
              },
              {
                  "name":"省",
                  "value":"北京市"
              },
              {
                  "name":"购买方名称",
                  "value":"北京悦航天翼电子信息技术有限公司"
              },
              {
                  "name":"购买方识别号",
                  "value":"91110101080528066H"
              },
              {
                  "name":"销售方名称",
                  "value":"北京通糖物美便利超市有限公司"
              },
              {
                  "name":"销售方地址、电话",
                  "value":"北京市通州区翠屏里218号4001016016"
              },
              {
                  "name":"销售方开户行及账号",
                  "value":"工商银行通州区支行迎宾分理处20053309006959603"
              },
              {
                  "name":"销售方识别号",
                  "value":"9111011273939073XF"
              },
              {
                  "name":"货物或应税劳务、服务名称",
                  "value":"*其他食品*食品"
              },
              {
                  "name":"金额",
                  "value":"117.58"
              },
              {
                  "name":"税率",
                  "value":"13%"
              },
              {
                  "name":"税额",
                  "value":"15.29"
              }
          ]
      }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  editorText:function(e){
      var infos=e.detail.message.split(":!|#");
      this.data.result[infos[0]].response[infos[1]].value=infos[2];
      this.setData({
        result:this.data.result
      })
  },
  editor:function(e){
    var editorMode=this.selectComponent("#editorMode");
    let message=e.target.dataset.key;
    if(message != undefined){
        editorMode.startEditor(message);
    }

},
operator:function(e){
    console.log("#############"+JSON.stringify(e))
    let index=e.target.dataset.key;
    var operatorMode=this.selectComponent("#operatorMode");
    var message=this.data.result[index]
    var touchData=e.changedTouches[0]


    wx.createSelectorQuery().select('#submenu'+index).boundingClientRect(function(rect){
        rect.id      // 节点的ID
        rect.dataset // 节点的dataset
        rect.left    // 节点的左边界坐标
        rect.right   // 节点的右边界坐标
        rect.top     // 节点的上边界坐标
        rect.bottom  // 节点的下边界坐标
        rect.width   // 节点的宽度
        rect.height  // 节点的高度

        console.log("################################id################"+rect.id)
        console.log("################################left################"+rect.left)
        console.log("################################right################"+rect.right)
        console.log("################################top################"+rect.top)
        console.log("################################ rect.bottom################"+ rect.bottom) 
        operatorMode.startOper(message,rect.top);

      }).exec()



    console.log("################################top################"+top)

    

}
})