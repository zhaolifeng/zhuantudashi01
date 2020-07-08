// pages/select/select.js
// const app = getApp()
// Page({
//   data: {
//     StatusBar: app.globalData.StatusBar,
//     CustomBar: app.globalData.CustomBar,
//     Custom: app.globalData.Custom,
//     TabCur: 0,
//     MainCur: 0,
//     VerticalNavTop: 0,
//     list: [],
//     load: true
//   },
//   onLoad() {
//     wx.showLoading({
//       title: '加载中...',
//       mask: true
//     });
//     let list = [{}];
//     for (let i = 0; i < 26; i++) {
//       list[i] = {};
//       list[i].name = String.fromCharCode(65 + i);
//       list[i].id = i;
//     }
//     this.setData({
//       list: list,
//       listCur: list[0]
//     })
//   },
//   onReady() {
//     wx.hideLoading()
//   },
//   tabSelect(e) {
//     this.setData({
//       TabCur: e.currentTarget.dataset.id,
//       MainCur: e.currentTarget.dataset.id,
//       VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
//     })
//   },
//   VerticalMain(e) {
//     let that = this;
//     let list = this.data.list;
//     let tabHeight = 0;
//     if (this.data.load) {
//       for (let i = 0; i < list.length; i++) {
//         let view = wx.createSelectorQuery().select("#main-" + list[i].id);
//         view.fields({
//           size: true
//         }, data => {
//           list[i].top = tabHeight;
//           tabHeight = tabHeight + data.height;
//           list[i].bottom = tabHeight;    
//         }).exec();
//       }
//       that.setData({
//         load: false,
//         list: list
//       })
//     }
//     let scrollTop = e.detail.scrollTop + 20;
//     for (let i = 0; i < list.length; i++) {
//       if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
//         that.setData({
//           VerticalNavTop: (list[i].id - 1) * 50,
//           TabCur: list[i].id
//         })
//         return false
//       }
//     }
//   }
// })


const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    funList:[{"id":"0","name":"卡证识别","titles":[[{"id":"1-1","name":"身份证","desc":"支持二代身份证人像面所有字段的识别，包括姓名、性别、民族、出生日期、住址、公民身份证号、包括签发机关、有效期限"},{"id":"1-2","name":"营业执照","desc":"支持快速精准识别营业执照上的字段，包括注册号、公司名称、经营场所、主体类型、法定代表人、注册资金、组成形式、成立日期、营业期限和经营范围等字段"},{"id":"1-3","name":"银行卡","desc":"支持对中国大陆主流银行卡的卡号、银行信息、有效期等关键字段的检测与识别"},{"id":"1-4","name":"名片","desc":"支持名片各字段的自动定位与识别，包含姓名、电话、手机号、邮箱、公司、部门、职位、网址、地址、QQ、微信、MSN等"}],[{"id":"1-5","name":"护照","desc":"支持中国大陆护照、中国香港护照、泰国护照及其他国外护照个人资料页多个字段的检测与识别"},{"id":"1-6","name":"港澳台通行证","desc":"支持对卡式港澳台通行证的识别，包括签发地点、签发机关、有效期限、性别、出生日期、英文姓名、姓名、证件号等字段"},{"id":"1-7","name":"房产证","desc":"支持不动产权证关键字段的识别，包括使用期限、面积、用途、权利性质、权利类型、坐落、共有情况、权利人、权利其他情况等。"},{"id":"1-8","name":"机构代码","desc":"支持组织机构代码证关键字段的识别，包括代码、有效期、地址、机构名称等"}],[{"id":"1-9","name":"法人证书","desc":"支持事业单位法人证书关键字段识别，包括注册号、有效期、住所、名称、法定代表人等"},{"id":"1-10","name":"企业执照","desc":"支持智能化识别各类企业登记证书、许可证书、企业执照、三证合一类证书，结构化输出统一社会信用代码、公司名称、法定代表人、公司地址、注册资金、企业类型、经营范围等关键字段"},{"id":"1-11","name":"户口本","desc":"支持居民户口簿户主页及成员页关键字段的识别，包括姓名、户别、地址、籍贯、身份证号码等"},{"id":"1-12","name":"港澳台内地通行","desc":"支持港澳居民来往内地通行证及台湾居民来往大陆通行证识别，包含中英文姓名、出生日期、性别、有效期限、签发机关、证件号码、换证次数、证件类型"}],[{"id":"1-13","name":"港澳台居住","desc":"支持港澳台居住证的正面及反面的关键字段识别，包含姓名、性别、出生、地址、身份证号、通行证号码、签发机关、有效期限、签发次数"}]],"desc":""}
    ,{"id":"1","name":"票据识别","titles":[[{"id":"2-1","name":"增值发票","desc":"支持增值税专用发票、增值税普通发票、增值税电子发票全字段的内容检测和识别，包括发票代码、发票号码、开票日期、合计金额、校验码、税率等"},{"id":"2-2","name":"运单识别","desc":"支持市面上主流版式电子运单的识别，包括收件人和寄件人的姓名、电话、地址以及运单号等字段"},{"id":"2-3","name":"火车票","desc":"支持火车票全字段的识别，包括编号、票价、姓名、座位号、出发时间、出发站、到达站、车次、席别等"},{"id":"2-4","name":"出租票","desc":"支持出租车发票关键字段的识别，包括发票号码、发票代码、金额、日期等字段"}],[{"id":"2-5","name":"汽车票","desc":"支持识别公路汽车客票的发票代码、发票号码、日期、姓名、票价等字段"},{"id":"2-6","name":"轮船票","desc":"支持识别轮船票的发票代码、发票号码、日期、姓名、票价等字段。"},{"id":"2-7","name":"行程单","desc":"支持机票行程单关键字段的识别，包括姓名、身份证件号码、航班号、票价 、合计、电子客票号码、填开日期等"},{"id":"2-8","name":"过桥费","desc":"支持对过路过桥费发票的发票代码、发票号码、日期、小写金额等关键字段的识别"}],[{"id":"2-9","name":"增值卷票","desc":"支持对增值税发票（卷票）的发票代码、发票号码、日期、校验码、合计金额（小写）等关键字段的识别"},{"id":"2-10","name":"定额发票","desc":"支持定额发票的发票号码、发票代码及金额等关键字段的识别"},{"id":"2-11","name":"通用发票","desc":"支持对通用机打发票的发票代码、发票号码、日期、购买方识别号、销售方识别号、校验码、小写金额等关键字段的识别"},{"id":"2-12","name":"购车发票","desc":"支持机动车销售统一发票和二手车销售统一发票的识别，包括发票号码、发票代码、合计金额、合计税额等二十多个字段"}],[{"id":"2-13","name":"完税证明","desc":"支持对完税证明的税号、纳税人识别号、纳税人名称、金额合计大写、金额合计小写、填发日期、税务机关、填票人等关键字段的识别"},{"id":"2-14","name":"混贴票据","desc":"支持多张、多类型票据的混合识别，目前已支持增值税发票、定额发票、火车票、出租车发票、机票行程单等共11种票据"},{"id":"2-15","name":"金融票据","desc":"支持常见银行票据的自动分类和识别。整单识别包括支票（含现金支票、普通支票、转账支票），承兑汇票（含银行承兑汇票、商业承兑汇票）以及进账单等"}]],"desc":""}
    ,{"id":"2","name":"车相关识别","titles":[[{"id":"3-1","name":"行驶证","desc":"支持行驶证主页所有字段的自动定位与识别，包含号牌号码、车辆类型、所有人、住址、使用性质、品牌型号、车辆识别代码、发动机号码、注册日期、发证日期、印章、号牌号码、档案编号、核定人数、总质量、整备质量、核定载质量、外廓尺寸、备注、核验记录、准牵引总质量"},{"id":"3-2","name":"驾驶证","desc":"支持对驾驶证主页所有字段的自动定位与识别，包含证号、姓名、性别、国籍、住址、出生日期、初次领证日期、准驾车型、有效期限等"},{"id":"3-3","name":"车牌","desc":"支持对中国大陆机动车车牌的自动定位和识别，返回地域编号和车牌号信息"},{"id":"3-4","name":"车辆VIN码","desc":"支持图片内车辆识别代号（VIN）的检测和识别"}],[{"id":"3-5","name":"机动车登记","desc":"支持国内机动车登记证书主要字段的结构化识别，包括机动车所有人、身份证明名称、号码、车辆型号、车辆识别代号、发动机号、制造厂名称等"}]],"desc":""}
    ,{"id":"3","name":"通用识别","titles":[[{"id":"4-1","name":"印刷体","desc":"支持多场景、任意版面下整图文字的识别，包括中英文、字母、数字和日语、韩语、西班牙语等十余种多语言识别"},{"id":"4-2","name":"手写体","desc":"支持图片内手写体文字的检测和识别，针对手写字体无规则、字迹潦草、模糊等特点进行了识别能力的增强"},{"id":"4-3","name":"英文","desc":"支持图像英文文字的检测和识别，返回文字框位置与文字内容。支持多场景、任意版面下的英文、字母、数字和常见字符的识别，同时覆盖英文印刷体和英文手写体识别"},{"id":"4-4","name":"二维码","desc":"支持二维码的识别"}],[{"id":"4-5","name":"条形码","desc":"支持条形码"}]],"desc":""}
    ,{"id":"4","name":"单据识别","titles":[[{"id":"5-1","name":"表格","desc":"支持图片内表格文档的检测和识别，返回每个单元格的文字内容，支持将识别结果保存为 Excel 格式"},{"id":"5-2","name":"算式","desc":"支持作业算式题目的自动识别，目前覆盖 K12 学力范围内的 14 种题型，包括加减乘除四则运算、分数四则运算、竖式四则运算、脱式计算等"},{"id":"5-3","name":"数学公式","desc":"支持识别主流初高中数学符号和公式，返回公式的 Latex 格式文本"},{"id":"5-4","name":"保险单据","desc":"支持病案首页、费用清单、结算单、医疗发票四种理赔单据的文本识别和结构化输出，可用于保险用户申请保险报销时的信息录入和审核校对"}]]}],
    load: true
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    // let list = [{"name":"卡证识别"},{"name":"票据识别"},{"name":"文档识别"},{"name":"汽车识别"},{"name":"通用识别"}];
    let list = this.data.funList;
    // for (let i = 0; i < list.length; i++) {
      // list[i] = {};
      // list[i].name = String.fromCharCode(65 + i);
      // list[i].id = i;
    // }
    // console.log("&&&&&&&&"+JSON.stringify(list));
    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;    
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop +20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})