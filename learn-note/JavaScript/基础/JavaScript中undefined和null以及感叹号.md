# undefined和null
## 相似性
在js中将一个变量赋值为undefined或者null,基本上没啥区别
```
var a=undefined;
var b=null;
console.log(a==b);//true

console.log(null==undefined)//true
```
## 目前用法
null表示‘没有对象’，即该处不应该有值。典型用法
* 作为函数的参数，表示该函数参数不是对象
* 作为对象圆形链的终点
undefined表示“缺少值”，就是此处应该有个值，但是还没有定义，典型用法：
* 变量被声明了，但没有赋值时，就等于undefined
* 调用函数时，应该提供的参数没有提供，该参数等于undefined
* 对象没有赋值的属性，该属性的值为undefined
* 函数没有返回值，默认返回undefined。
```
var i;
i// undefined
function fun1(x){console.log(x)};fun1();//undefined
var o=new Object();o.p;//undefined
var x=fun1();x;//undefined
```
## !!
!!将后面的表达式强制转换为布尔类型的数据，一般用在if判断条件中，一个！表示否定，两个！表示肯定




