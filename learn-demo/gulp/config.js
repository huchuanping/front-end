// =======================================================================
// 阿里云服务器
// =======================================================================


//var webapp = {
//    domain: "http://115.29.249.215:3300",   //接口地址
//    socketChatUrl: "115.29.249.215:8087",  //客服聊天地址
//    resourceDomain: "http://115.29.249.215:8000/resource/",  //图片资源地址
//    wechataccountid: "wx2695fc733ea73fb7",
//    cfid: "DGFD34G5SG-FB53E23F-HRRH4232GE4G",
//    appid: "1",
//    appsecret: "123"
//
//}


// =======================================================================
// 苏州盈联智能城市(测试环境)
// =======================================================================

var webapp = {
    //积分兑换模板消息跳转链接
    exchangeUrl: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1af69155f195f953&redirect_uri=http%3a%2f%2fifstest.smartac.co%2fwebapp%2findex.html#/memberExchange&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect", 
    directUrl:"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1af69155f195f953&redirect_uri=http%3A%2F%2Fifstest.smartac.co%2Fwebapp%2Findex.html%23%2Fdirect&response_type=code&scope=snsapi_base&state=1/0#wechat_redirect",
    scanUrl:"http://ifstest.smartac.co",//核销调用扫码的域名
    shareUrl: "http://ifstest.smartac.co/webapp/index.html", //分享公用的域名
    domain: "http://172.16.0.81:3100",   //接口地址
    campdomain: "http://172.16.0.81:3433",   //ss接口地址
    //domain: "http://weixin.cdifs.cn/api",   //接口地址
    socketChatUrl: "172.16.0.142:8087",  //客服聊天地址
    resourceDomain: "http://172.16.0.81:8000/resource/",  //图片资源地址
    wechataccountid: "wx23afdd4ec29fc267",
    //generateCodedomain: "http://ifs.smartac.co:15433",// 生成二维码地址
    generateCodedomain: "http://172.16.0.81:15433",// 生成二维码地址
    //ssCampaigndomain:'http://172.16.0.137:3002',//ss活动地址
    ssCampaigndomain:'http://ifstest.smartac.co/ssservice',//ss活动地址
    //ssCampaigndomain:'http://shake02.smartac.co',//ss活动地址
    cfid: "FRCD34G5SG-FB53E2FA-HRRH424DHK64",
    appid: 1,
    appsecret: "123",
    storecode:"01",
    smartImgUrl:'http://ifs.smartac.co:82/images/ifs/',
    shareAuthorUrl:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1af69155f195f953&redirect_uri=http%3A%2F%2Fifstest.smartac.co%2Fwebapp%2Findex.html%23%2Fdirect&response_type=code&scope=snsapi_base&state'//author 分享成功的点击链接
}



