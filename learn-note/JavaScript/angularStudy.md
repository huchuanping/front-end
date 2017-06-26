##Angular 
控制器参数$routeParams
```$routeProvider.when('/sr/coupon/instanceList/:id/:typecode', routeConfig.config('../../sr/ui/coupon/couponInstanceList.html', "../../sr/controllers/coupon/couponInstanceListController"));```

```function indexController($scope, $routeParams, $dialogs) {

    }```
$routeParams，用于获取 url 的参数， 直接用$routeParams.id和$routeParams.typecode来获取url的参数