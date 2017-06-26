# 对象创建模式
JS中创建对象很简单，直接通过对象字面量或者构造函数就可以，
```
//对象字面量
var $ui = {
    method: '',
    language: {}, // 基本多语言配置信息
    languageObj: {}, // 各大模块多语言配置信息
    ui_location: {}, // angular中的$location
    pageSize: 10, // 列表每页数据条数
    languageid: 'Ch',
    paging: {},
    user: {}, // 存储用户信息
    limits: [], // 存储用户权限
    alertHandles: [], // 存储使用提示信息中settimeout的句柄
    scope: {}, //index页面的作用域
    isLogin: function(argument) {  return $ui.getItem('sessionid');},
    getProjectId:function(){//...}
}
//构造函数+原型创建对象
//data 从别的地方传过来
function Person(data){
    this.name='';
    this.age='';
    this.address=''
}
Person.protype.showName=function(){
    return this.name;
}

var o=new Person();
console.log(o.addPerson())
```
## 命名空间模式
Js没有命名空间语法，但是可以很容易实现这个特性。为了避免产生全局污染，可以为应用或者类库定义一个全局对象，然后将所有功能都添加到这个对象上，而不是到处声明大量的全局函数、全局对象。
```
//重构一个全局变量
var MYAPP={};
//构造函数
MYAPP.Parent=function(){};
MYAPP.some_var=2;
```
# 通用命名空间
可能一个文件会被多个项目用到，这样就不能确保你定义的命名空间是否唯一，甚至会被覆盖，为了解决这个问题，最好在定义之前判断是否已经存在
```
if(typeof MYAPP==="undefined"){
    MYAPP={};
}
```
# 私有成员和公有成员
## 公有成员
所有对象成员都是公有成员
```
var myObj={
    myprop:1,
    getProp:function(){
        return this.myprop;
    }
}
console.log(myObj.myprop)//1,myprop是公有的
console.log(myObj.getProp())//1,getProp是公有函数
```
构造函数创建的对象，所有成员都是公有的：
```
function Gadget(){
    this.name="iPod";//注意没有var
    this.strech=function(){
        return 'iPad'
    };
}
var toy=new Gadget();
console.log(top.name);//iPod,name是公有的
console.log(toy.strech());//iPod,strech是公有的
```
## 私有成员
在构造函数中创建一个闭包，任何在闭包里的属性都不会暴露在构造函数之外，这些私有成员可以被公有方法访问
```
function Gadget(){
    //私有成员
    var name='iPod';//有var
    //公有函数
    this.getName=function(){
        return name;
    }
}
var toy=new Gadget();
console.log(toy.name)//undefined
console.log(toy.getName())//iPod
```
## 构造函数继承
名词：封装
把所有属性(property)和方法(method)封装成一个对象
构造函数原型(Prototype)继承实例
```
function Cat(name,color){
    this.name=name;
    this.color=color;
}
Cat.prototype.type="猫科动物";
Cat.prototype.eat=function(){
    alert("吃老鼠")
};
var cat1=new Cat("大毛",“黑色”);
var cat1=new Cat("二毛",“棕色”);
console.log(cat1.type);//猫科动物
console.log(cat1.eat());//吃老鼠
```
这时所有的实例的type属性和eat方法都指向同一个内存地址，即原型prototype，从而节省空间。
