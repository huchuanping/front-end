JavaScript 中 typeof 和 instanceof 常用来判断一个变量是否为空，或者是什么类型的。但它们之间还是有区别的：
#### typeof
typeof 是一个一元运算，放在一个运算数之前，运算数可以是任意类型。
它返回值是一个字符串，该字符串说明运算数的类型。typeof 一般只能返回如下几个结果：`number,boolean,string,function,object,undefined`;
开发中可以用typeof来获取一个变量是否存在：
```
if(typeof a!="undefined"){alert('ok')} //undefined

if(a){alert("ok")} //Uncaught ReferenceError: a is not defined(…)
```
不要使用`if(a)`因为如果a不存在（未声明）则会出错。
对于Array,Null等特殊对象使用typeof一律返回Object,这正是typeof的局限性，所以判断数组类型我们会用instanceof
### instanceof
```
a instanceof b?alert('true'):alert('false');//a是b的实例？真：假
```
instanceof用于判断一个变量是否是某个变量的实例，如
```
var a=[];alert(a instanceof Array);//true
var a=[];alert(a instanceof Object);//true 因为Array是Object的子类
function test(){};var a=new test();alert(a instanceof test)//true  

```

### JavaScript中判断一个变量是否存在的几种方式
如果这个对象不存在就声明这个对象
#### 第一种方式
```
if(!myobject){
    var myobject={};//注意不能省略var
}
```
#### 第二种方式
```
if(!window.myobject){
    myobject={};
}
```
window是javascript顶层对象，所有全局变量都是它的属性。所以判断myobject是否为空，等同于判断window对象是否有myobject属性。
#### 第三种写法
用`typeof`运算符，判断myobject是否有定义
```
if(typeof myobject=="undefined"){
    var myobject={};
}
//上面这种写法等价于(省略typeof，undefined没有双引号)
if(myobject==undefined){
    var myobject={};
}
```
这是目前使用最广泛的判断javascript对象是否存在的方法。
#### 第四种写法
“精确比较”
```
if(myobject===undefined){
    var myobject={};
}
```
### 第五种写法
根据javascript的语言设计，undefined==null,所以
```
if(myobject==null){
    var myobject={};
}
```

总结：
1.如果只判断对象是否存在，推荐使用第三种写法
2.如果出了对象是否存在，还要判断对象是否有null值，推荐第一种写法