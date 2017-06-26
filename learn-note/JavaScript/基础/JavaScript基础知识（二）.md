# JavaSscript 函数
## 单var模式
在函数顶部使用唯一一个var声明函数变量是一种非常推荐的写法，好处是：
* 可以再同一位置找到函数所需的所有变量
* 避免在变量声明前使用这个变量导致逻辑错误
* 提醒你不要忘记声明变量
* 减少代码量
```
function func(){
    var a=1,
        b=2,
        sum=a+b,
        myobject={},
        i,
        j;
    //函数体
}
```
## 命名规范
1. 构造函数采用大驼峰命名法，首字母大写，非首字母大写的函数是普通函数，不应该用new来实例它 
```
function Person(){}
var jack=new Person();
```
2. 函数和方法采用小驼峰命名法 `myFunction()` `getFirstName()`
3. 变量采用小驼峰命名法，首字母小写，单词之间用下划线链接 `first_name` `old_conpany_name`
4. 对于那些在程序运行周期都不会变的常量命名，所有字母都大写

  ```
  var PI=3.14,
      MAX_WIDTH=800;
  ```
5. 私有变量命名通常在私有成员或方法前加下划线前缀
```
var person={
    getname:function(){
        return this._getFirst()+''+this._getLast();
    },
    _getFirst:function(){//...},
    _getLast:function(){//...}
}
```
JavaSscript函数具有两个特性，第一是函数是一等对象，二是函数提供作用域支持。
函数是对象，就具备以下特性：
* 可以再程序执行时动态创建
* 可以将函数赋值给变量，可以将函数引用拷贝到另一个变量，可以扩充函数，也可以被删除
* 可以将函数作为参数传入另一个函数，也可以被当做返回值被返回
* 函数可以包含自己的属性和方法
### 函数表达式
具名函数表达式：
```
//具名函数表达式
var add=function add(a,b){
    return a+b;
};
```
匿名函数表达式：
```
//匿名函数表达式
var add=function(a,b){
    return a+b;
};
```
函数声明：
```
函数声明末尾不需要分号，这是和具体函数表达式的一个区别
function foo(){
    函数体
}
```
## 声明 vs 表达式
什么时候用函数声明，什么时候用函数表达式？
在不能使用函数声明语法的场景下，就只能使用函数表达式了，将函数作为参数传递、在对象字面量中定义方法都是这样的例子：
```
// 作为参数传递给callMe的函数表达式
callMe(function () {
    // 我是匿名函数表达式，也叫匿名函数
});

// 这是一个具名函数表达式
callMe(function me() {
    // 我是具名函数表达式，我的名字是“me”
});

// 另一个函数表达式
var myobject = {
    say: function () {
        // 我是函数表达式
    }
};
```
函数声明只能出现在程序代码中，也就是说只能出现在别的函数体内或者全局。不能赋值给变量或者属性，也不能作为参数传递（译注：注意这里说的是函数声明的语句，而不是通过声明语句定义出来的函数本身。任何函数都是可以被赋值给变量和属性的，也可以被作为参数传递。）下面这些是函数声明的合法用法：
```
function foo(){}
function loacal(){
    function bar(){}
    return bar;
}
```
## 声明提前
我们知道，不管是在函数内何处声明变量，变量都会被自动提前至函数体的顶部。对于函数来说亦是如此，因为他们也是一种对象，赋值给了变量。需要注意的是，函数声明定义的函数不仅能让声明提前，还能让定义提前，可以看下面这段代码：
```
//全局函数
function foo(){
    alert('glabal foo');
}
function bar(){
    alert('glabal bar')
}
function hoistMe(){
    console.log(typeof foo);//function
    console.log(typeof bar);//undefined
    foo();//"local foo"
    bar();// TypeError: bar is not a function

    //函数声明：
    //变量foo和它的定义实现都被提前了
    function foo(){
        alert('glabal foo');
    }

    //函数表达式：
    //只有变量bar被提前，它的定义实现没有被提前
    var bar=function(){
        alert('local bar');
    };
}
hoistMe();
```
本段代码中，和普通变量一样，hoistMe()函数中的foo和bar被“搬运”到了顶部，覆盖了全局的foo()和bar()不同之处在于本地的foo
的位置并不在前面，但它的定义却被提前到了顶部并能正常工作，而bar（）的定义未被提前，只有声明被提前了。
## 回调模式
函数是对象，也就意味着可以被当做参数传入另一个函数中。给函数writeCode()传入一个函数参数introduceBugs(),在某个时刻writeCode执行了（或调用了）introduceBugs(),在这种情况下，我们称introduceBugs()是一个“回调函数”，简称为“回调”：
```
function writeCode(callback){
    //做点什么
    callback();
}
function introduceBugs(){
    //...
}
writeCode(introduceBugs);
```
注意introduceBugs()作为参数传入writeCode()时，函数后面是不带括号的。括号的意思是执行函数，而这里我们传入一个引用，让writeCode()在合适的时机执行它（调用它）。
##　回调的例子
下面是一个无回调的情况，假设有一个通用的函数，用来完成某种复杂的逻辑，返回一段大数据。假设这个函数叫findNodes(),用来对dom树进行遍历，并返回页面节点：
```
function findeNodes(){
    var i=10000,
        nodes=[],
        found;
    while(i){
        i -=1;
        //复杂逻辑..
        nodes.push(found);
    }
    return nodes;  
}
```
保持这个函数功能的通用性，让它只返回DOM节点组成的数据，而不对节点进行操作是一个很好的思想，可以将操作节点的逻辑放在另一函数中，比如hide()函数，这个函数用来隐藏页面的节点：
```
var hide=function(nodes){
    for(var i=0;i<nodex.length;i++){
        nodes[i].style.dispaly="none";
    }
};
hide(findeNodes())
```
这样效率并不是很高，因为他将findeNodes()所返回的数组重新遍历了一遍。更高效的方法是在findeNodes()中选择元素的时候直接应用hide()操作，这样能避免第二次遍历。但如果把hide()逻辑写死在findeNodes()中，findeNodes()就不在通用了，因为修改逻辑和遍历逻辑耦合在一起了。这时候如果使用回调模式，就可以将隐藏节点的逻辑写入回调函数，将其传入findeNodes()中适时执行：
```
var findeNodes=function(callback){
    var i=1000,
        nodes=[],
        found;
        //检查回调函数是否可以执行
        if(typeof callback!=="function"){
            callback=false;
        }
    while(i){
        i-=1;
        //复杂逻辑
        //回调：
        if(callback){
            callback(found);
        }
        nodes.push(found)
    }
    return nodes;
};
```
这里的实现比较直接，findNodes()多做了一个额外的工作，就是判断回调是否存在，如果存在就执行它。回调函数是可选的，所以修改后的函数和之前一样使用，这时候hide()的实现就比较简单了
```
//回调函数
var hide=function(node){
    node.style.dispaly="none;
};
//找到节点并隐藏他们
findeNodes(hide);
```
回调函数可以是事先定义好的，像上面的代码一样，也可以是一个在调用函数时创建的匿名函数，比如
```
findeNodes(function(node){
    node.style.dispaly="none";
    })
```
demo
```
function func(param1,param2,callback){
     alert('shuchu'+param1+param2);
     callback()；
    }
    //调用
    func('I','am',function(){alert('callback')})
```
## 返回函数
函数是对象，因此可以作为返回值，也就是说函数比一定就要返回一坨数据，也可以返回另一个函数，或者可以根据输入的不同按需创建一个新的函数。
```
var setup=function(){
    alert(0);
    return function(){alert(1)}
}
```
由于setup包裹了返回函数，因此它创建了一个 **闭包**,    我们可以用这个闭包来创建一些私有属性，这些私有属性可以通过返回函数进行操作，但在函数外部不能读取这些私有数据：
```
var setup=function(){
    var count=0;
    return function(){
        count=count+1;
        return count;
    }
}
var my=setup();//my=function(){//..}
my();//1
my();//2
my();//3
```
## 即时函数
即时函数是一种语法模式，它会使函数在定以后立即执行，如下例子：
```
(function(){alert('watch out')}())
```
这种模式本质上只是一个在创建后就被执行的函数表达式（具名或者匿名）。“即时函数”这种说法并没有在ECMAScript标准中被定义，但它作为一个名词，有助于我们的描述和讨论。
这种模式由以下几个部分组成：
* 使用函数表达式定义一个函数（不能使用函数声明）
* 在最后加一个括号，这个括号表示立即执行
* 把整个函数包裹在一对括号中（只在没有将函数赋值给一个变量时使用）
## 配置对象
配置对象模式是一种为自己代码提供更简洁的API的方法，如果你即将编写一个被其他程序调用的类库之类的代码，就很有用。
软件在开发和维护过程中不断的被改变是个事实，因为一开始的需求总是有限的，但是随着开发的进行，越来越多的功能会被加进去。
如创建一个增加人的函数`addPerson()`,它接受一个姓和一个名的参数，然后列表中加入一个人：
```
function addPerson(first,last){
//...
}
```
不久之后可能还要将生日，年龄等存储起来，此时修改函数你会添加一些函数如：
```
function addPerson(first,last,birth,age,gender,address){//..}
```
这样导致函数过长，而且传参数是还要保证参数的顺序是否正确，别人调用时可能不会用到的一些参数也要加上去
```
addPerson("Bruce", "Wayne", new Date(), null, null, "batman")
```
显然这种做法很愚钝，那么配置对象就可以很好的解决这个问题，我们可以把参数定义为一个对象字面量conf
```
var conf={
    first:'',
    last:''，
    age:''
};
function addPerson(conf)
{
    console.log(conf.first+conf.last)
}; 
conf={
    first:'hu',
    last:'chuanping'
};
addPerson(conf)
```
配置对象好处：
* 不需要记住参数位置
* 可以很安全的跳过可选参数
* 拥有更好的可读性和可维护性
* 更容易添加和移除参数