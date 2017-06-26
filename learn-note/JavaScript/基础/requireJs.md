# Javascript 模块化变成之RquireJs
## 引言：
Javascript模块化编程，已经成为一个迫切的需求。理想情况下， 开发者只需要实现核心的业务逻辑，其他都可以加载别人已经写好的模块 。
但是，Javascript不是一种模块化编程语言，它不支持"类"（class），更遑论"模块"（module）了。（正在制定中的ECMAScript标准第六版，将正式支持"类"和"模块"，但还需要很长时间才能投入实用。）
## 模块化规范
模块化的好处是我们可以更方便的使用别人的代码，需要什么功能直接加载什么模块。
目前，通行的Javascript模块规范共有两种：CommonJS和AMD。我主要介绍AMD，但是要先从CommonJS讲起。
node.js的模块系统，就是产参照CommonJs规范实现的。CommonJs有一个全局性方法require(),用于加载模块：如加载一个math.js
```
//加载
var math=require('math');
//调用
math.add(2,3);      
```
CommonJs仅适应服务器端，不适用客户端，客户端我们用AMD（"Asynchronous Module Definition"的缩写，意思就是"异步模块定义）规范。AMD采用异步方式加载模块，模块加载不影响后面语句的执行。所有以来这个模块的语句都定义在一个回调函数中，等到加载完之后这个回调函数才会运行。
AMD也采用`require()`加载模块，不同于`CommonJs`的是它有2个参数
```
require([module],callback);
```
第一个参数`[module]`是一个数组，里面的成员是要加载的模块，第二个参数callback是加载模块成功之后要执行的回调函数。
```
require([math],function(math){
    math.add(2,3)
    })
```
目前有两个`Javascript`库实现了AMD规范：require.js和curl.js
## require.js
项目越大需要加载的js文件就越多，网页响应就越慢，require.js可以实现js文件异步加载，避免网页失去响应，管理模块间的依赖性，便于代码维护和编写。
### 加载require.js
```
<script src="js/require.js" data-main="js/main"></script>
```
data-main属性指定网页主模块，这个文件会一地个被require.js加载。由于require.js默认文件后缀名是.js，所以可以省略main后面的后缀名。
### 主模块写法
```
require(['moduleA','moduleB','moduleC'],function(moduleA,moduleB,moduleC){
    //...
    })
```
第一个参数表示主模块依赖那三个模块，后面参数是回调函数，当依赖模块加载完后会调用这个模块。加载的模块会以参数的形式传入回调函数中，从而在回调函数内部就可以直接调用这些模块了。
```
require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone){
　　　　// some code here
　　});
```

上述情况是jquery、underscore、backbone和main在同一目录(比如都在js路径下)，有时候我们需要调用不同目录的模块。
使用`require.config()`可以对自定义加载模块，`require.config()`就写在`main.js`的头部。`require.config()`参数是个对象，参数对象里的paths属性指定各个模块的加载路径。例如被加载的模块路径在`js/lib`
```
require.config({
    paths:{
        "jquery":"lib/jquery.min",
        "underscore":"lib/underscore.min",
        "backbone":"lib/backbone.min"
    }
    })
```
另一种写法，直接改变基目录
```
require.config({
    baseUrl:"js/lib",
    paths:{
        "jquery":"jquery.min",
        "underscore":"underscore.min",
        "backbone":"backbone.min"
    }
    })
```
如果某个模块在另一台主机上，可以直接指定他的网址：
```
require.config({
    paths{
        "jquery":"https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"
    }
    })
```
## AMD模块定义写法
`require.js`加载的模块采用AMD规范，那么模块也必须要按照AMD规范来定义。具体说就是必须采用特定的`define()`函数来定义。如果一个模块不依赖其他模块，那么可以把这个模块直接写在`define()`函数中。如有一个`math.js`文件，它定义了一个math模块
```
//math.js
define(function(){
    var add=function(x,y){
        return x+y;
    };
    return {
        add:add
    };
});

//main.js 
require(['math'],function(math){
   alert(math.add(2,3));
    })
```
`math.js`依赖其他模块

```
define(['myLib'],function(myLib){
    function foo(){
        myLib.doSomething();//doSomething是myLib里的方法
    };
    return{foo:foo}
    })
```
## 加载非规范模块
除了jquery遵循AMD规范的js库并不多，不过require同样也接受不规范的模块的加载。不过在加载这些模块之前必须先用`require.config()`定义他们的一些特征。
如`underscore`和`backbone`这两个库都没使用AMD规范：
```
require.config({
    shim:{
        'underscore':{
            exports:'_'
        },
        'backbone':{
            deps: ['underscore', 'jquery'],
　　　　　　exports: 'Backbone'
        }
    }
    })
```
`require.config()`配置对象里除了`paths`属性，还有个`shim`属性，专门用来配置不兼容AMD的模块，shim里的每个模块都要定义（1）：`exports`值（输出的变量）,表明这个模块外部调用时的名称；（2）：`deps`数组，表明该模块所依赖的模块。
