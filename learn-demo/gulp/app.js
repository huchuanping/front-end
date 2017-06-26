define(function() {

    var app = angular.module('app', ['ngRoute', 'ngTouch', /*'ngAnimate',*/ 'ngSanitize', 'oc.lazyLoad', /*'ajoslin.mobile-navigate',*/ 'ngStorage', 'utils', 'toaster', 'modal', 'loading']);





    /**

     * 配置请求地址

     * */

    app

    /**

     * 域名

     */

    //.constant('domain', 'http://srdemo.smartac.co')

    //.constant('domain', 'http://172.16.0.64:3300')

    //.constant('domain', 'http://172.16.0.142:3300')



        .constant('domain', webapp.domain)





    /**

     * 接口地址

     */

    .service('api', ['domain', function(domain) {

        return {


            //活动统计
            campCountUrl:webapp.campdomain+"/openapi/ss/campaign/statistics/query",
            //获取会员等级
            campGetmemberLev:webapp.campdomain+'/openapi/ss/campaign/customerlevel/list',
            //活动报名信息
            campRegisterInfo:webapp.campdomain+'/openapi/ss/campaign/statistics/detail',
            //url: "http://srdemo.smartac.co" + "/api/weiapp/GetJsJDKConfig",

            getJsJDKConfigUrl: domain + "/api/weiapp/GetJsJDKConfig",



            authenticateUrl: domain + "/authenticate",



            couponUrl: domain + "/coupons",

            pointUrl: domain + "/point",

            customerUrl: domain + "/customers",

            addressUrl: domain + "/customer/address",

            codeUrl: domain + "/code",

            shopUrl: domain + "/shops",

            feedbackUrl: domain + "/feedback",

            tradeUrl: domain + "/trade",

            campaignUrl: domain + "/campaign",

            //模板消息接口
            templateMessageUrl: domain + "/templateMessage",


            //couponQuereListUrl: domain + "/coupons/queryList",

            //couponQueryCategoryUrl: domain + "/coupons/queryCategory",

            //couponQueryGoodtypeUrl: domain + "/coupons/queryGoodtype",

            //couponQueryInfoUrl:  domain + "/coupons/queryInfo",

            //couponRewardUrl: domain + "/coupons/rewardcoupon",





            //uploadUrl: webapp.resourceDomain + "/upload",

            imgDomainUrl: webapp.resourceDomain,







            validatecodeUrl: domain + "/customers/validatecode",

            custaddUrl: domain + "/customers/custadd",

            custupdateUrl: domain + "/customers/custupdate",

            addressaddUrl: domain + '/coustomers/addressadd',

            addressupdateUrl: domain + '/coustomers/addressupdate',

            addressdelUrl: domain + '/coustomers/addressdel',

            addressqueryUrl: domain + '/coustomers/addressquery',

            addcustcheck: domain + '/customers',



            memberInfoUrl: domain + '/coustomers/getcustinfo',



            //苏州盈联智能Wifi     appid：     wx23afdd4ec29fc267

            //172.16.0.142  测试环境    苏州盈联智能Wifi     CF账号：FRCD34G5SG-FB53E2FA-HRRH424DHK64

            // wechataccountid: "wx23afdd4ec29fc267",

            //cfid: "FRCD34G5SG-FB53E2FA-HRRH424DHK64",





            //苏州盈联智能奖赏     appid：     wxbcb27609438a2ae4

            //172.16.0.64   开发环境       苏州盈联智能奖赏      CF账号： HEDV35FASG-DGW423A-34TGGW53AAD66

            //cfid: "HEDV35FASG-DGW423A-34TGGW53AAD66",

            //wechataccountid: "wxbcb27609438a2ae4",



            cfid: webapp.cfid,

            wechataccountid: webapp.wechataccountid,





            memberInfoUrl: domain + '/api/Customer/CustomerGetById_xc/',

            updateMemberInfoUrl: domain + '/api/Customer/CustomerUpdate_xc/',

            //couponUrl: domain + '/api/rewardsprogram/GetCouponDetailList_xc/',

            couponDetailUrl: domain + '/api/rewardsprogram/CouponGetById_xc/',

            receiveCouponUrl: domain + '/api/rewardsprogram/custreceivecoupon_xc/',

            memberCouponUrl: domain + '/api/rewardsprogram/CouponInsGetByCustId_xc/',

            memberIntegralUrl: domain + '/api/Campaign/Point/SearchPointMainByCustID_xc/',

            memberIntegrallistUrl: domain + '/api/Campaign/Point/SearchPointDetailAll_xc/',





            verificationCodeUrl: "http://demowifi.smartac.co:3001/sms/send",

            generateQrcodeUrl: webapp.generateCodedomain + "/barcode?symbology=58&size=645&s_fg_color=000000&s_bg_color=ffffff&margin=0&level=2&ecc_level=1&hint=1&ver=0&transparent=1&txt=",

            generateBarcodeUrl: webapp.generateCodedomain + "/barcode?symbology=20&size=645&s_fg_color=000000&s_bg_color=ffffff&margin=0&level=2&ecc_level=1&hint=1&ver=0&transparent=1&txt=",

            scancodeVerificationUrl: domain + '/api/rewardsprogram/customerusecoupon_xc/',



            //=========================srApiServer===================================

            srApiServerIfsCrm: domain + "/ifscrm",

            ssCampaignDetailUrl: "http://ifstest.smartac.co/ssserver/public/nginx/campaignpreview/campaign-view/detail.html?name=&shopvalue=&shoptype=&status=&tag=&sourceType=shake&num=1&item=100&category=&uniformUserid=",

            ssMyCampaign: webapp.ssCampaigndomain + "/shake/template9a8cf5f6-d793-4c75-9a46-ed7a5be082c4/index.html?name=&memberlevel=&shopvalue=&shoptype=&status=&tag=&sourceType=shake&num=1&item=100&openid=",

            ssSignup: "http://ifstest.smartac.co/ssserver/public/nginx/checkin/detail.html?infoid=",

            lookparkUrl: domain + '/ifscrm', //找车位

            XF_STORECODE: "01",

            idNum: 1000000 //注册时用的流水号开始号码

        }

    }])





    /**

     * 页面跳转(go)和后退(back)

     */

    .provider('$navigate', function() {

        this.$get = ['$rootScope', '$location', '$window', function($rootScope, $location, $window) {

            var nav = {};

            nav.go = function go(path) {

                $location.path(path);

            };



            nav.back = function() {

                $window.history.back();

            };

            return nav;

        }];

    })





    /**

     * ajax封装

     */

    .factory("AJAX", ['$q', '$http', '$localStorage', 'getToken',

        function($q, $http, $localStorage, getToken) {

            return function(httpParams) {



                if ($localStorage.authInfo) {





                    if (((new Date().getTime() - parseInt($localStorage.authInfo.time)) / 1000) < (3600 * 1.95)) {

                        //console.log('token没过期');

                        sendRequest();

                    } else {

                        //console.log('token过期');

                        getToken(sendRequest);

                    }

                } else {

                    //console.log('token不存在');

                    getToken(sendRequest);

                }





                function sendRequest() {

                    var defer = $q.defer();

                    var params1 = {};

                    if (httpParams.method) {

                        httpParams.method.toLocaleLowerCase() == 'post' ? params1.data = httpParams.data : params1.params = httpParams.data;

                    } else {

                        params1.params = httpParams.data

                    }



                    var params2 = {

                        method: httpParams.method || "GET",

                        url: httpParams.url,

                        //headers: {

                        //    'Content-Type': undefined

                        //},

                        cache: httpParams.cache || false,

                        timeout: httpParams.timeout || defer.promise || 15000,

                        success: httpParams.success || function() {},

                        error: httpParams.error || function() {},

                        complete: httpParams.complete || function() {},

                        headers: {

                            authorization: "token " + $localStorage.authInfo.token

                            //authorization: "token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiIxIiwiZXhwaXJlIjoxNDUzMjg3MjM3LCJpYXQiOjE0NTMzNjQwOTJ9.uuzz2lXwn4h-Cz0oppjmptahutGdehUU2vDQSQq2NEQ"

                        }

                    };



                    //console.log($localStorage.token)

                    var params = angular.extend(params1, params2);

                    //console.log(params);

                    var request = $http(params); //requrest为一个defer.promise

                    //var promise = request.success(

                    //    httpParams.success

                    //).error(

                    //    httpParams.error

                    //);



                    var promise = request.then(function(response) {

                        httpParams.success(response.data)

                    }, function(response) {

                        httpParams.error(response.data)

                    })



                    promise.abort = function() {

                        defer.resolve();

                    };



                    promise

                        .finally(

                        httpParams.complete

                    )

                    .finally(

                        function() {

                            promise.abort = angular.noop;

                            defer = request = promise = null;

                        }

                    );

                    return promise;

                }





            };

        }

    ])

    /**

     * 路由配置

     */

    .config(['$routeProvider', '$ocLazyLoadProvider',

        function($routeProvider, $ocLazyLoadProvider) {



            /**

             * configure the ocLazyLoader to use requireJS as the loader

             */

            $ocLazyLoadProvider.config({

                //loadedModules: ['app'],

                asyncLoader: require,

                debug: false

            });



            /**

             * override angular default module api for creating components

             * @type {Function|register|register|register}

             */

            //app.controller = $controllerProvider.register;

            //app.service = $provide.service;

            //app.factory = $provide.factory;

            //app.filter = $filterProvider.register;

            //app.directive = $compileProvider.directive;



            $routeProvider

            //ifs
                .when('/platHome', { //平台首页
                    templateUrl: 'views/ifs/platHome.html',
                    controller: "platHomeController as platHome",
                    resolve: {
                        load: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: ['scripts/page/ifs/platHome.js', 'styles/ifsintro.css']
                            });
                        }]
                    }
                }).when('/campCount', { //活动统计
                    templateUrl: 'views/ifs/campCount.html',
                    controller: "campCountController as campCount",
                    resolve: {
                        load: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: ['scripts/page/ifs/campCount.js', 'styles/ifsintro.css']
                            });
                        }]
                    }
                })
                .when('/campCountDetail/:campCountId/:campName', { //活动统计
                    templateUrl: 'views/ifs/campCountDetail.html',
                    controller: "campCountDetailController as campCountDetail",
                    resolve: {
                        load: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: ['scripts/page/ifs/campCountDetail.js', 'styles/ifsintro.css']
                            });
                        }]
                    }
                })
                .when('/selfIntScan', { //扫码
                    templateUrl: 'views/ifs/selfIntScan.html',
                    controller: "selfIntScanController as selfIntScan",
                    resolve: {
                        load: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: ['scripts/page/ifs/selfIntScan.js']
                            });
                        }]
                    }
                })
                .when('/selfIntSuccess/:mobile/:paramsgroup', { //自助积分成功失败
                    templateUrl: 'views/ifs/selfIntSuccess.html',
                    controller: "selfIntSuccessController as selfIntSuccess",
                    resolve: {
                        load: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: ['scripts/page/ifs/selfIntSuccess.js', 'styles/ifsintro.css']
                            });
                        }]
                    }
                })
                .when('/Selfintegral', { //自助积分判断是否是会员
                    templateUrl: 'views/ifs/Selfintegral.html',
                    controller: "SelfintegralController as Selfintegral",
                    resolve: {
                        load: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: ['scripts/page/ifs/Selfintegral.js']
                            });
                        }]
                    }
                })
                .when('/memberCoupon', {
                    templateUrl: 'views/ifs/memberCoupon.html', //我的优惠券
                    controller: "memberCouponController as memberCoupon",
                    resolve: {
                        load: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: ['scripts/page/ifs/memberCoupon.js']
                            });
                        }]
                    }
                }).when('/memberCouponDetail/:couponid', {
                    templateUrl: 'views/ifs/memberCouponDetail.html', //我的优惠券
                    controller: "memberCouponDetailController as memberCouponDetail",
                    resolve: {
                        load: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: ['scripts/page/ifs/memberCouponDetail.js']
                            });
                        }]
                    }
                })
                .when('/thirdauthorize', {
                    //transition:'none',
                    templateUrl: 'views/ifs/thirdauthorize.html',
                    controller: 'thirdauthorizeController as thirdauthorizeController',
                    resolve: {
                        load: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: ['scripts/page/ifs/thirdauthorizeController.js']
                            })
                        }]
                    }
                })
                .when('/direct', {
                    //transition:'none',
                    templateUrl: 'views/ifs/direct.html',
                    controller: 'directController as directController',
                    resolve: {
                        load: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: ['scripts/page/ifs/directController.js']
                            })
                        }]
                    }
                })
                .when('/activityIframe/:campaignid', {

                    //transition:'none',

                    templateUrl: 'views/ifs/activityIframe.html',

                    controller: 'activityIframeController as iframe',

                    resolve: {

                        load: ['$ocLazyLoad', function($ocLazyLoad) {

                            return $ocLazyLoad.load({

                                files: ['scripts/page/ifs/activityIframe.js']

                            })

                        }]

                    }

                })

            .when('/iframe', {

                //transition:'none',

                templateUrl: 'views/ifs/iframe.html',

                controller: 'iframeController as iframe',

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/iframe.js']

                        })

                    }]

                }

            })

            .when('/ifsintro', {

                //transition:'none',

                templateUrl: 'views/ifs/ifsintro.html',

                controller: 'ifsintrController as ifsintro',

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/ifsintro.js', 'styles/ifsintro.css']

                        })

                    }]

                }

            })

            .when('/lookpark', {

                //transition:'none',

                templateUrl: 'views/ifs/lookpark.html',

                controller: 'lookparkController as lookpark',

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/lookpark.js', 'styles/ifsintro.css']

                        })

                    }]

                }

            })

            .when('/ifshome', {

                //transition:'none',

                templateUrl: 'views/ifs/ifshome.html',

                controller: 'ifshomeController as lookpark',

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/ifshome.js', 'styles/ifsintro.css']

                        })

                    }]

                }

            })

            .when('/memberExchange', {

                //transition: 'none',

                templateUrl: 'views/ifs/memberExchange.html',

                controller: "memberExchangeController as memberExchange",

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/memberExchange.js', 'styles/ifsintro.css']

                        });

                    }]

                }

            })

            .when('/integralMall/:bonus', {

                //transition: 'none',

                templateUrl: 'views/ifs/integralMall.html',

                controller: "integralMallController as integralMall",

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/integralMall.js', 'styles/ifsintro.css']

                        });

                    }]

                }

            })

            .when('/memberCenter', {

                transition: 'none',

                templateUrl: 'views/ifs/memberCenter.html',

                controller: 'memberCenterController as memberCenter',

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['styles/menu.css', 'scripts/page/ifs/memberCenter.js', 'styles/ifsintro.css']

                        })

                    }]

                }

            })

            .when('/memberInfo', {

                transition: 'none',

                templateUrl: 'views/ifs/memberInfo.html',

                controller: "memberInfoController as memberInfo",

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/memberInfo.js']

                        });

                    }]

                }

            })

            .when('/memberRights', {

                transition: 'none',

                templateUrl: 'views/ifs/memberRights.html',

                controller: 'memberRightsController as memberRights',

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/memberRights.js', 'styles/ifsintro.css']

                        })

                    }]

                }

            })

            .when('/integralDetail/:couponid', {

                transition: 'none',

                templateUrl: 'views/ifs/integralDetail.html', //优惠券详情

                controller: "integralDetailController as integralDetail",

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/integralDetail.js', 'styles/ifsintro.css']

                        });

                    }]

                }

            })

            .when('/exchangeSuccess/:couponid/:couponimg/:couponname/:couponpoint/:couponno/:couponlocation/:exchangeNum/:vipbonus', {

                //.when('/exchangeSuccess/:couponid', {

                transition: 'none',

                templateUrl: 'views/ifs/exchangeSuccess.html',

                controller: "exchangeSuccessController as exchangeSuccess",

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/exchangeSuccess.js', 'styles/ifsintro.css']

                        });

                    }]

                }

            })

            .when('/registerCard/:pagetype/:id', {

                transition: 'none',

                templateUrl: 'views/ifs/registerCard.html',

                controller: "registerCardController as registerCard",

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/registerCard.js', 'styles/ifsintro.css']

                        });

                    }]

                }

            })



            .when('/memberExchangeDetail/:couponid', {

                //transition: 'none',

                templateUrl: 'views/ifs/memberExchangeDetail.html',

                controller: "memberExchangeDetailController as memberExchangeDetail",

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/memberExchangeDetail.js']

                        });

                    }]

                }

            })

            .when('/memberCollection', {

                transition: 'none',

                templateUrl: 'views/ifs/memberCollection.html',

                controller: "memberCollectionController as memberCollection",

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/memberCollection.js']

                        });

                    }]

                }

            })

            .when('/memberBook', {

                transition: 'none',

                templateUrl: 'views/ifs/memberBook.html',

                controller: "memberBookController as memberBook",

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/memberBook.js']

                        });

                    }]

                }

            })

            .when('/activity', {

                //transition:'none',  

                templateUrl: 'views/ifs/activity.html', //活动

                controller: 'activityController as activity',

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/activity.js', 'styles/ifsintro.css']

                        })

                    }]

                }

            })

            .when('/shop', {

                transition: 'none',

                templateUrl: 'views/ifs/shop.html',

                controller: "shopController as shop",

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/shop.js', 'styles/ifsintro.css']

                        });

                    }]

                }

            })

            .when('/shopDetail/:shopid', {

                transition: 'none',

                templateUrl: 'views/ifs/shopDetail.html',

                controller: "shopDetailController as shopDetail",

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/shopDetail.js']

                        });

                    }]

                }

            })

            .when('/themeactivity/:activityid', {

                //transition:'none',  

                templateUrl: 'views/ifs/themeactivity.html', //主题活动

                controller: 'themeactivityController as themeactivity',

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/resources/moment.min.js','scripts/page/ifs/themeactivity.js', 'styles/ifsintro.css']

                        })

                    }]

                }

            })

            .when('/indexIFS', {

                //transition:'none',  

                templateUrl: 'views/ifs/indexIFS.html', //主题活动

                controller: 'indexIFSController as indexIFS',

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/indexIFS.js']

                        })

                    }]

                }

            })

            .when('/activityDetail/:activityId', {

                //transition: 'none',

                templateUrl: 'views/ifs/activityDetail.html', //活动

                controller: "activityDetailController as activityDetail",

                resolve: {

                    load: ['$ocLazyLoad', function($ocLazyLoad) {

                        return $ocLazyLoad.load({

                            files: ['scripts/page/ifs/activityDetail.js']

                        });

                    }]

                }

            })

        }

    ]);



    app.factory('getToken', ['$http', '$localStorage', 'loading', 'api', function($http, $localStorage, loading, api) {



        /**

         * OAuth2.0

         */

        return function(successCallback) {

            /*            var appid = '', appsecret = '';

                        if (Internal.isInWeiXin) {

                            appid = oauth.WeiXinApp.appid;

                            appsecret = oauth.WeiXinApp.appsecret;

                        } else if(Internal.isInApp) {

                            appid = oauth.smartApp.appid;

                            appsecret = oauth.smartApp.appsecret;

                        }*/

            var req = {

                method: 'POST',

                url: api.authenticateUrl,

                data: {

                    "app_id": webapp.appid,

                    "app_secret": webapp.appsecret

                }

            }

            $http(req).then(function(response) {

                console.log('token接口', response.data);

                var data = response.data;

                if (data.code == 7001) {

                    $localStorage.authInfo = {

                        token: data.token,

                        time: new Date().getTime()

                    };

                    successCallback && successCallback();

                    //document.write(data.token);

                }

            }, function() {



            })

        }



    }])



    app.run(['$ocLazyLoad', '$route', '$http', '$sce', '$templateCache', '$timeout', '$rootScope', '$location', '$localStorage', '$navigate', 'AJAX', 'api', 'verification', 'loading', 'getUserInfo', 'getToken', function($ocLazyLoad, $route, $http, $sce, $templateCache, $timeout, $rootScope, $location, $localStorage, $navigate, AJAX, api, verification, loading, getUserInfo, getToken) {

        /**

         * 预先缓存模版

         */

        /* $timeout(function() {

         angular.forEach($route.routes, function(r) {

         if (r.templateUrl) {

         $http.get(r.templateUrl, {cache: $templateCache});

         }

         });

         }, 500);*/





        /*

         * 加载子页面的样式

         * 加载子页面的样式

         */

        $timeout(function() {

            $ocLazyLoad.load({

                files: ['styles/subpage.css']

                //files: ['styles/subpage.css','scripts/page/shop.js', 'scripts/page/shopDetail.js', 'scripts/page/book.js', 'scripts/page/booktime.js', 'scripts/page/bookSuccess.js', 'scripts/page/comment.js', 'scripts/page/integralMall.js', 'scripts/page/coupon.js', 'scripts/page/couponDetail.js', 'scripts/page/member.js', 'scripts/page/memberQueueDetail.js', 'scripts/page/memberBookDetail.js', 'scripts/page/memberCoupon.js', 'scripts/page/memberIntegral.js', 'scripts/page/location.js', 'scripts/page/activity.js', 'scripts/page/activityDetail.js', 'scripts/page/myQuestion.js', 'scripts/page/newQuestion.js']

            });

        }, 0);

















        //getToken();



        getJsJDKConfig();

        /**

         * 获取jssdk配置

         */

        function getJsJDKConfig() {
            //if(!Internal.isInWeiXin) return;
            /*
             * 注意：
             * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
             * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
             * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
             *
             * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
             * 邮箱地址：weixin-open@qq.com
             * 邮件主题：【微信JS-SDK反馈】具体问题
             * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
             */
            //微信JSSDK   

            var json = {

                //WeChatID: "gh_fd385a942982", // 例如 'gh_e5c977a21415'

                "method": "sign",

                "url": window.document.location.href.split('#')[0].toString()

            };

            AJAX({

                url: webapp.domain + "/signature",

                data: json,

                method: 'post',

                success: function(data) {

                    console.log('微信jssdk', data);

                    //alert('111');

                    if (data.code == 7001) {

                        wx.config({

                            debug: false,

                            //debug: true,

                            appId: webapp.wechataccountid,

                            timestamp: data.content.timestamp,

                            nonceStr: data.content.noncestr,

                            signature: data.content.signature,

                            jsApiList: [

                                'checkJsApi',

                                'onMenuShareTimeline',

                                'onMenuShareAppMessage',

                                'onMenuShareQQ',

                                'onMenuShareWeibo',

                                'onMenuShareQZone',

                                'hideMenuItems',

                                'showMenuItems',

                                'hideAllNonBaseMenuItem',

                                'showAllNonBaseMenuItem',

                                'translateVoice',

                                'startRecord',

                                'stopRecord',

                                'onVoiceRecordEnd',

                                'playVoice',

                                'onVoicePlayEnd',

                                'pauseVoice',

                                'stopVoice',

                                'uploadVoice',

                                'downloadVoice',

                                'chooseImage',

                                'previewImage',

                                'uploadImage',

                                'downloadImage',

                                'getNetworkType',

                                'openLocation',

                                'getLocation',

                                'hideOptionMenu',

                                'showOptionMenu',

                                'closeWindow',

                                'scanQRCode',

                                'chooseWXPay',

                                'openProductSpecificView',

                                'addCard',

                                'chooseCard',

                                'openCard'

                            ]

                        });

                        wx.error(function() {

                            alert(JSON.stringify('wx.error'));

                        });

                    }

                },

                error: function() {

                    alert('error')

                }

            });
        }


        $rootScope.$navigate = $navigate;

        $rootScope.Internal = Internal;

        $rootScope.userinfoIFS;

        $rootScope.userinfoSR;



        /**

         * 优惠券说明

         */

        $rootScope.trustAsHtml = function(htmlString) {

            return $sce.trustAsHtml(htmlString);

        };





        //initPage();



        function initPage() {

            Internal.isInWeiXin = true;

            Internal.isInApp = false;

            if (Internal.isInApp) {

                if ($localStorage.userInfo && $localStorage.userInfo.customerid) {

                    $location.path('/ifshome').replace();

                } else {

                    $location.path('/login').replace();

                }

            } else if (Internal.isInWeiXin) {

                getUserInfo(function(data) {

                    if (data.code == "7001") {

                        if (data.members && data.members[0] && data.members[0].thirdcustid) {

                            AJAX({

                                url: api.srApiServerIfsCrm,

                                method: 'post',

                                data: {

                                    "method": "queryCustData",

                                    "vipcode": data.members[0].thirdcustid,

                                },

                                timeout: 10000,

                                success: function(data) {

                                    //console.log('624', data);

                                    if (data.error == 0) {

                                        $localStorage.userInfo.VIPCODE = data.info.VIPCODE; //证件号

                                        $localStorage.userInfo.BONUS = data.info.BONUS; //积分

                                        $localStorage.userInfo.GRADE = data.info.BONUS; //会员等级

                                    } else {

                                        $localStorage.userInfo.VIPCODE = ""; //会员卡号

                                        $localStorage.userInfo.BONUS = 0;

                                    }

                                    $location.path('/memberCenter').replace();

                                }

                            });

                        } else {

                            $location.path('/registerCard').replace();

                        }

                    } else {

                        $location.path('/error').replace();

                    }

                    loading.hide();

                }, function() {

                    $location.path('/error').replace();

                    loading.hide();

                })

            }



        }



    }]);





    /**

     * 初始化

     */

    app.bootstrap = function() {

        angular.bootstrap(document, ['app']);

    };



    return app;

});
