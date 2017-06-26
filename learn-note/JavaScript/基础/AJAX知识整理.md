##判断请求是否成功
原理：向服务器发送数据（也就是data参数），服务器根据客户端发送的参数去查数据库，然后返回数据到客户端
先看看后台返回什么数据，然后把后台返回的数据转换成前台需要的数据，通常在success里去处理返回的数据

1.看控制台 
 * Network 点开请求的接口名，查看Headers 和Response
 * Response看请求之后返回结果
 * get请求看Query String Parameters
 * post请求看Form Data
2.根据接口文档输出成功状态 
## 输出请求成功之后的data
```
console.log(data);
console.log(data.msgbody);
```
3.发送到服务器的数据data
将自动转换为请求字符串格式，GET 请求中将附加在 URL 后。查看 processData 选项说明以禁止此自动转换。
必须为 Key/Value 格式。如果为数组，jQuery 将自动为不同值对应同一个名称。如 {foo:["bar1", "bar2"]} 转换为 '&foo=bar1&foo=bar2'。
```
$.ajax({
   type: "POST",
   url: "some.php",
   data: "name=John&location=Boston",//字符串值是和后台的预定
   success: function(msg){
     alert( "Data Saved: " + msg );
   }
});
```
这里data后面跟的参数可以用二种表式：一种是普通url传参的写法一样，还有一种就是写在json数组里，
上面示例data部分也可以这样写：
``` data: {name:"John",location:"Boston"}```

## angular绑定ajax后台返回的数据（桥梁是scope）

页面上的数据源都要首先绑到`$scope`上面，服务器返回的数据赋值给scope数据源，这样页面上表达式里的数据源就和后台数据对应了。
```
 //数据绑定
// _scope.data = data.msgBody;
_scope.paging[_pageKey].totalCount = data.msgbody.TotalCount[0].count;
_scope.paging[_pageKey].pageIndex = _scope.paging[_pageKey].pageIndex;
_scope.paging[_pageKey].pageNum = Math.ceil((data.msgbody.TotalCount[0].count) / _scope.paging.pageSize);
_scope.paging[_pageKey].pageRows = (data.msgbody.TotalCount[0].count) % _scope.paging.pageSize;
```

## 把一个对象转换成json格式
JSON.stringify(obj)
```
console.log(JSON.stringify($scope.goodtypecode));//[{"id":1,"value":"服饰类"},{"id":2,"value":"数码类"},{"id":3,"value":"餐饮类"},{"id":4,"value":"其他"}]
```
上面代码如果不用JSON.stringify(),控制台输出的就是：
```
[Object, Object, Object, Object]//显然前者便于查看
```


```
var obj={name:"张三",sex:"男"};//对象字面方方式定义的对象属性名可以加双引号也可以不加双引号
console.log(JSON.stringify(obj));//{"name":"张三","sex":"男"},json对象的属性名必须加上双引号
```
##json格式与javascript对象字面量和数组对象的区别
[链接](http://www.lxway.com/81414064.htm)