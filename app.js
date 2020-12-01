//app.js
App({
  onLaunch: function () {
    this.overShare()
    var url='https://www.coolpov.com/author/login';
    // 登录
    wx.login({
      success (res) {
        if (res.code) {
          var js_code=res.code;
          //发起网络请求
          wx.request({
            url: url,
            method:"POST",
            header: { 
              'content-type': 'application/json;charset=utf-8'
            },
            scriptCharset: 'utf-8',
            data: {
              code: js_code
            },
            success (res) {             
              var resData=res.data.data;
              if(res.statusCode == 200){   
                
              }else{
                return ;
              }
              // console.log("*****login*******"+JSON.stringify(resData.openid)) 
              var openidSrc=resData.openid
              var openid= wx.getStorageSync('openid')
              if(openid == "" || openid == null || openid == undefined ||openidSrc !=openid){
                wx.setStorageSync('openid', openidSrc)
              }
              // console.log("*****openid*******"+wx.getStorageSync('openid')) 
              var historyIndex= wx.getStorageSync('historyIndex')
              // console.log("------historyIndex--------"+typeof(historyIndex))
              if(historyIndex == "" || historyIndex == null || historyIndex == undefined){
                var historyIndex=[];
                wx.setStorage({
                  key: "historyIndex",
                  data:historyIndex
                })
                console.log("------historyIndex--------"+typeof(historyIndex))
              }
              var hisResults= wx.getStorageSync('hisResults')
              // console.log("------hisResults--------"+typeof(hisResults))
              if(hisResults == "" || hisResults == null || hisResults == undefined){ 
                var hisResults=[];
                wx.setStorage({
                  key: "hisResults",
                  data:hisResults
                })
                console.log("------hisResults--------"+typeof(hisResults))
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
   //重写分享方法
     overShare: function () {
          //监听路由切换
           //间接实现全局设置分享内容
           wx.onAppRoute(function (res) {
               //获取加载的页面
               let pages = getCurrentPages(),
                   //获取当前页面的对象
                   view = pages[pages.length - 1],
                  data;
              if (view) {
                  // console.log('是否重写分享方法', data.isOverShare);
                  // if (!data.isOverShare) {
                      // data.isOverShare = true;
                      view.onShareAppMessage = function () {
                          //你的分享配置
                          return {
                              title: '标题',
                              path: '/pages/index/index',
                              imageUrl: "/pages/image/select/share.png"
                         };
                      }
                  // }
              }
          })
      },
  globalData: {
    userInfo: null
  }
})