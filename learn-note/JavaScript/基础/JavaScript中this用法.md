this是JS的关键字，代表在函数运行时自动生成的一个对象，只能在函数内部使用
```
function test(){
    this.x=1;
}
```
随着函数使用场合的不同，this值也会发生改变，但有一条不变的是this永远都指向调用该函数的那个对象。
## 情况一：纯粹函数调用
this代表全局对象global
```
function test(){
    this.x=1
    console.log(this.x)
};
test()//1

//为了证明this是全局对象，可以对代码做一下修改
var x=1;
function test(){
    console.log(this.x);//1
};
```
## 情况二：作为对象方法的调用
函数还可以作为某个对象的方法调用，这时候的this指的是这个对象
```
function test(){
    console.log(this.x);
};
var o={};
o.x=1;
o.m=test();
o.m();//1
```
## 情况三：作为构造函数调用
this指的是通过这个构造函数生成的新的对象
```
function Test(){
    this.x=1;
};
var o=new Test();
console.log(o.x);//1,此时的this指的是新对象o
```
## 情况四：apply调用
apply()是函数对象的一个方法，作用是改变函数的调用对象，apply()第一个参数表示改变后调用这个函数的对象，因此this指的是第一个参数，没有参数时默认指的是全局对象
```
var x=0;
function test(){
    console.log(this.x);
};
var o={};
o.x=1;
o.m=test;
o.m.apply();//0，没有参数时this指全局对象
o.m.apply(o);//1，有参数时this指的是第一个参数对象
```

## 引申
### apply()和call()用法
call和apply都是为了改变某个函数运行是的`context`（上下文环境），换句话说就是为了改变函数体内`this`的指向。因为`JavaScript`函数存在‘定义时上下文’、‘运行时上下文’、‘上下文是可以改变的’这样的概念。
两者作用完全一样，只是接受参数方式不太一样，call需要把参数按顺序穿进去，apply则把参数放在数组里。当某个函数参数是固定时用call，不固定时用apply
```
var fun1=function(arg1,arg2){ 
//...
};
fun1.call(this,arg1,arg2);
fun1.apply(this,[arg1,arg2]);
```
demo
```
function cat(){

}
cat.prototype={
    food:'fish',
    say:function(){
        alert('I love'+ this.food);
    }
}
var blackCat=new cat();
blackCat.say();
//加入我们有另一个对象whiteDog，但是我们不想重新再次定义say方法，就可以用
var whiteDog={food:'bone'};
blackCat.say.apply(whiteDog);//apply,call前面的肯定是个方法
whiteDog.say;//say后面不需要再有括号，否则会出错
```
由此我们可以看出apply和call是为了改变this而出现的，当一个object没有某个方法，但是其他的对象有，我们可以借助call和apply用其他对象的方法操作。