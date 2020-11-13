const getOpenId =()=> {
  var openid= wx.getStorageSync('openid');
  let a;
  let b;
  for(let i=0;i<50;i++){
    b=Math.ceil(Math.random()*10);
    a=Math.ceil(Math.random()*10);
    if(a <2 && a >b ){
      break;
    }
  }
 console.log("-----------a-----------"+a)
 console.log("-----------b-----------"+b)
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
                    }
                  })
                } else {
                  console.log('登录失败！' + res.errMsg)
                }
              }
            })
            let a;
            let b;
            for(let i=0;i<100;i++){
              b=Math.ceil(Math.random()*15);
              a=Math.ceil(Math.random()*15);
              if(a >3 && a <6 && a <b ){
                break;
              }
            }
            let f=openid
            let c=Math.round(new Date() / 1000)+""
            console.log("-----------c-----------"+c.slice(0,5))
            console.log("-----------c-----------"+c.slice(5))
            console.log(f.slice(0,3)+a+bf.slice(3,a)+c.slice(0,5)+f.slice(a,b)+c.slice(5)+f.slice(b))
            console.log(f.slice(3,a)+c.slice(0,5))
            console.log(f.slice(a,b)+c.slice(5))
            console.log(f.slice(b))
            return f.slice(0,3)+a+bf.slice(3,a)+c.slice(0,5)+f.slice(a,b)+c.slice(5)+f.slice(b);
  }else{
            let a;
            let b;
            for(let i=0;i<100;i++){
              b=Math.ceil(Math.random()*15);
              a=Math.ceil(Math.random()*15);
              if(a >3 && a <6 && a <b ){
                break;
              }
            }
            let f=openid
            let c=Math.round(new Date() / 1000)+""
            console.log("-----------c-----------"+c.slice(0,5))
            console.log("-----------c-----------"+c.slice(5))
            console.log(f.slice(0,3)+a+bf.slice(3,a)+c.slice(0,5)+f.slice(a,b)+c.slice(5)+f.slice(b))
            console.log(f.slice(3,a)+c.slice(0,5))
            console.log(f.slice(a,b)+c.slice(5))
            console.log(f.slice(b))
            return f.slice(0,3)+a+bf.slice(3,a)+c.slice(0,5)+f.slice(a,b)+c.slice(5)+f.slice(b);
  }
}
module.exports={
  getOpenId:getOpenId
}