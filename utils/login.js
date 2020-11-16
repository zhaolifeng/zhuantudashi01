const getOpenId =()=> {
  var openid= wx.getStorageSync('openid');
  if(openid == "" || openid == null || openid == undefined){
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
                      openid=resData.openid
                      wx.setStorageSync('openid', openid)    
                      return encodeUserId(openid);         
                    }
                  })
                } else {
                  console.log('登录失败！' + res.errMsg)
                }
              }
            })
  }else{
    return encodeUserId(openid);
  }
}

function encodeUserId(openid) {
  let a;
  let b;
  let d="";
  for(let i=0;i<100;i++){
    b=Math.ceil(Math.random()*15);
    a=Math.ceil(Math.random()*15);
    if(a >5  && a <b ){
      d=(a+"").length;
      d=d+""+(b+"").length
      break;
    }
  }
  let f=openid
  let c=Math.round(new Date() / 1000)+""
  let e=f.slice(0,3)+d+a+b+f.slice(3,a)+c.slice(0,5)+f.slice(a,b)+c.slice(5)+f.slice(b);
  return e;
}
module.exports={
  getOpenId:getOpenId
}