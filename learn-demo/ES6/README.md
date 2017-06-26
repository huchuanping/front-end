## ES6规范
[参考文章](http://bubkoo.com/2015/04/05/javascript-style-guide/)
[阮一峰教程](http://es6.ruanyifeng.com/#docs/let)
###扩展运算符
扩展运算符（spread）是三个点（...），将一个数组转为用逗号分隔的参数序列
```
function add(x,y){return x+y}
const numbers=[3,4]
add(...numbers) //7，...numbers==3,4
```
### Object.assign()
* 该方法用于对象的合并，将原对象（source）的所有可枚举属性，复制目标对象（target）
```
var target={a:1};
var source1={b:2};
var source2={c:3}
Object.assign(target,source1,source2)
target //{a:1,b:2,c:3}
```
注意：如果目标对象与源对象或者多个源对象有同名属性，则后面的属性会覆盖前面的属性
如果只有一个参数，Object.assign会直接返回该参数。
如果该参数不是对象，则会先转成对象，然后返回。
由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
```
var v='abc';
var obj=Object.assign({},v)
obj;//{0:'a',1:'b',2:'c'}
```

* Object.assign可以用来处理数组 
```
Object.assign([1,2,3],[4,5]) //[4,5,3]
```
上面代码中，Object.assign把数组视为属性名为0、1、2的对象，因此源数组的0号属性4覆盖了目标数组的0号属性1。
##模块的名字
模块的名字由它的文件名或文件夹名所决定，并且你可以忽略它的.js后缀：

如果你有一个叫utils.js的文件，那么你可以通过./utils这样的相对路径导入它
如果你有一个叫./utils/index.js的文件，则你可以通过./utils/index或./utils来导入它。这使得你可以批量导入一个文件夹内的所有模块。