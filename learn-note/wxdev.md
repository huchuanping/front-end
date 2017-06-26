* 公众号可以使用AppID和AppSecret调用本接口来获取access_token。AppID和AppSecret可在
“微信公众平台-开发-基本配置”页中获得（需要已经成为开发者，且帐号没有异常状态）。
调用接口时，请登录“微信公众平台-开发-基本配置”提前将服务器IP地址添加到IP白名单中，
点击查看设置方法，否则将无法调用成功。
*  用户同意授权(OAuth2.0机制)，获取code
  在确保微信公众账号拥有授权作用域（scope参数）的权限的前提下（服务号获得高级接口后，
  默认拥有scope参数中的snsapi_base和snsapi_userinfo），引导关注者打开如下页面：
  ```
  https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=
  REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
  ```
  如果用户同意授权，页面将跳转至 redirect_uri/?code=CODE&state=STATE。
  code说明 ： code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，
  5分钟未被使用自动过期。
* 通过code换取网页授权access_token(这一步在后端做)
  首先请注意，这里通过code换取的是一个特殊的网页授权access_token,与基础支持中的access_token（该access_token用于调用其他接口）不同。公众号可通过下述接口来获取网页
  授权access_token。如果网页授权的作用域为snsapi_base，则本步骤中获取到网页授权access_token的同时，
  也获取到了openid，snsapi_base式的网页授权流程即到此为止。
 请求方法：
 ```
获取code后，请求以下链接获取access_token：  https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code 
 ```
 尤其注意：由于公众号的secret和获取到的access_token安全级别都非常高，必须只保存在服务器，不允许传给客户端。后续刷新access_token、通过access_token获取用户信息等
 步骤，也必须从服务器发起。
