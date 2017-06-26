# js 创建对象方式

** 在JavaScript中，可以通过类的实例化来创建对象（也就是通过混合模式的构造函数创建对象），也可以使用 对象字面量 直接创建对象。**
下面是类实例化创建对象的集中方法
## 工厂方式（不推荐）
```
var lev=function(){ 
return "脚本之家"; 
}; 
function Parent(){ 
var Child = new Object(); 
Child.name="脚本"; 
Child.age="4"; 
Child.lev=lev; 
return Child; 
}; 
var x = Parent(); 
alert(x.name); 
alert(x.lev()); 
```
说明：
1. 在函数中定义对象,并定义对象的各种属性，,虽然属性可以为方法，但是建议将属性为方法的属性定义到函数之外，这样可以避免重复创建该方法 
2. 引用该对象的时候，这里使用的是 var x = Parent()而不是 var x = new Parent();因为后者会可能出现很多问题（前者也成为工厂经典方式,后者称之为混合工厂方式），不推荐使用new的方式使用该对象 
3. 在函数的最后返回该对象 
## 构造函数方式 （不推荐）
```
var lev=function(){
    return 'test';
}
function Parent(){
    this.name="脚本";
    this.age=20;
    this.lev=lev
}
var x=new Parent();
alert(x.name);
alert(x.lev)
```
说明：
1. 与工厂方式相比，使用构造函数创建对象无需再对象内部重新创建对象，而是使用this代指，并且函数无需renturn
2. 同工厂模式一样，虽然属性的值可以为方法，扔建议将该方法定义在函数之外 
##　原型模式（不推荐）
```
var lev=function(){
    return 'test'
}
function Parent(){

}
Parent.prototype.name="linda";
Parent.prototype.age=30;
Parent.prototype.lev=lev;
var x=new Parent();
alert(x.name);
alert(x.lev())
```
说明：
1. 函数中不对属性进行定义
2. 利用prototype属性对属性进行定义
## 构造函数+原型模式混合使用（推荐使用  ）
```
function Parent(){
    this.name="grace";
    this.age=26
}
Parent.prototype.lev=function(){
    return this.name
}
var x=new Parent();
alert (x.lev())
```

说明：
1. 该模式是指混合使用构造函数和原型方式
2. 将所有不是方法的属性定义在构造函数内（构造函数方式）
3. 将所有是方法的属性利用prototype放在函数外定义（原型方式）
4. 推荐使用这种方法
## 动态原型方式（推荐使用）
```
function Parent(){
    this.name="test";
    this.age=30;
    if(typeof Parent._lev=="undefined"){
        Parent.prototype.lev=function(){
            return this.name
        }
        Parent._lev=true;
    }
}
var x=new Parent();
alert(x.lev())
```
说明：
1. 动态原型方式可以理解为混合方式的一个特例
2. 在该模式中，属性为方法的属性直接定义在函数中，但是因为
```
if(typeof Parent._lev=="undefined"){
    Parent.prototype.lev=function(){
    }
    Parent._lev=true;
}
```
从而保证创建该对象实例时，属性的方法不会被重新创建
3. 也推荐使用这种方式

## 对象字面量
我们可以将JavaScript中的对象简单地理解为名值对组成的散列表（hash table，也叫哈希表）。在其他编程语言中被称作“关联数组”。其中的值可以是原始值也可以是对象。** 不管是什么类型，它们都是“属性”（property），属性值同样可以是函数，这时属性就被称为“方法”（method）。**

JavaScript中自定义的对象（用户定义的本地对象）任何时候都是可变的。内置本地对象的属性也是可变的。你可以先创建一个空对象，然后在需要时给它添加功能。“对象字面量写法（object literal notation）”是按需创建对象的一种理想方式。
例如：
```
//定义空对象
var dog={};
//添加一个属性
dog.name="beibei";
//添加一个方法
dog.getName=function(){
    return dog.name;
}
```
每次都创建空对象并不是必须的，对象字面量模式可以直接在创建对象时添加功能，就像下面这个例子：
```
var dog={
    name:"beibei",
    getName:function(){
        return this.name;
    }
}
```
在本书中多次提到“空对象”（“blank object”和“empty object”），这只是一种简称，在JavaScript中根本不存在真正的空对象，理解这一点至关重要。即使最简单的{}对象也会包含从Object.prototype继承来的属性和方法。我们提到的“空（empty）对象”只是说这个对象没有自有属性(own properties)，不考虑它是否有继承来的属性。
###　对象字面量语法
* 将对象主体包含在一对花括号内（{ 和 }）。
* 对象内的属性或方法之间使用逗号分隔。最后一个名值对后也可以有逗号，但在IE下会报错，所以尽量不要在最后一个属性或方法后加逗号。
* 属性名和值之间使用冒号分隔。
* 如果将对象赋值给一个变量，不要忘了在右括号}之后补上分号。

### 自定义构造函数创建对象

JavaScript中没有类的概念，这给JavaScript带来了极大的灵活性，因为你不必提前知晓关于对象的任何信息，也不需要类的“蓝图”（译注：指类的结构）。但JavaScript同样具有构造函数，它的语法和Java或其他语言中基于类的对象创建非常类似。

你可以使用自定义的构造函数来创建对象实例，也可以使用内置构造函数来创建，比如Object()、Date()、String()等等。
下面这个例子展示了用两种等价的方法分别创建两个独立的实例对象：
```
//一种方法，使用对象字面量
var car={goes:"far"};
//另一种方法，使用内置构造函数
var car=new Object();
car.goes="far";
```
从这个例子中可以看到，字面量写法的一个明显优势是，它的代码更少。“创建对象的最佳模式是使用字面量”还有一个原因，它可以强调对象就是一个简单的可变的散列表，而不必一定派生自某个类。
另外一个使用字面量而不是Object()构造函数创建实例对象的原因是，对象字面量不需要“作用域解析”（scope resolution）。因为存在你已经创建了一个同名的构造函数Object()的可能，当你调用Object()的时候，解析器需要顺着作用域链从当前作用域开始查找，直到找到全局Object()构造函数为止。
#### 除了对象字面量和内置构造函数之外，你也可以通过自定义的构造函数来创建对象实例，正如下面的代码所示：
```
var Person=function(name){
    this.name=name;
    this.say=function(){
        return "I am" + this.name;
    }
}
```
当你用new来实例这个构造函数时，函数体内将发生这些事情：
* 创建一个空对象，将他的引用赋给`this`,并集成函数的原型
* 通过`this`将属性和方法添加至这个对象
* 最后返回`this`指向的新对象（如果没有手动返回其他的对象）
用代码表示这个过程
```
var Person=function(name){
    //使用对象字面量创建对象
    //var this={}
    //添加属性和方法
    this.name=name;
    this.say=function(){
        return "I am"+this.name;
    };
    //return this;
}

var per=new Person("grace");
alert(per);
```
上例中为简便起见，`say()`方法被添加至this中，结果就是不论何时调用new Person(),z在内存中都会创建一个新的函数（ `say()` ）,显然效率很低，最好的办法就是将`say()`添加至`Person()`的原型中：
```
Person.prototype.say=function(){
    return "I am" + this.name;
}
```
### 构造函数返回值
当使用`new`调用构造函数时，构造函数总会返回一个对象，默认情况下返回this所指向的对象，如果构造函数内没有给this赋任何属性，则返回一个空对象；
尽管在构造函数中没有return语句的情况下，也会隐式返回this。但事实上我们是可以返回任意指定的对象的，在下面的例子中就返回了新创建的that对象。
```
var Objectmaster=function(){
    // name属性会被忽略，因为返回的是另一个对象
    this.name="This is it";
    //创建并返回一个新对象
    var that={};
    that.name="And that's that";
    return that;//如果没有这个，则默认返回this
};
var obj=new Objectmaster();
console.log(obj.name);
```

可以看到，构造函数中其实是可以返回任意对象的，只要你返回的东西是对象即可。如果返回值不是对象（字符串、数字或布尔值），程序不会报错，但这个返回值被忽略，最终还是返回this所指的对象。
###　强制使用new的模式
我们知道，构造函数和普通的函数本质一样，只是通过new调用而已。那么如果调用构造函数时忘记new会发生什么呢？漏掉new不会产生语法错误也不会有运行时错误，但可能会造成逻辑错误，导致执行结果不符合预期。这是因为如果不写new的话，函数内的this会指向全局对象（在浏览器端this指向window）。

当构造函数内包含this.member之类的代码，并直接调用这个函数（省略new），实际上会创建一个全局对象的属性member，可以通过window.member或member访问到。这不是我们想要的结果，因为我们要努力确保全局命名空间干净。
```
// 构造函数
function Waffle() {
    this.tastes = "yummy";
}

// 新对象
var good_morning = new Waffle();
console.log(typeof good_morning); // "object"
console.log(good_morning.tastes); // "yummy"

// 反模式，漏掉new
var good_morning = Waffle();
console.log(typeof good_morning); // "undefined"
console.log(window.tastes); // "yummy"
```
ECMAScript5中修正了这种出乎意料的行为逻辑。在严格模式中，this不再指向全局对象。如果在不支持ES5的JavaScript环境中，也有一些方法可以确保有没有new时构造函数的行为都保持一致。
### 命名规范
一种简单解决上述问题的方法就是命名规范，前面的章节已经讨论过，构造函数首字母大写（MyConstructor()），普通函数和方法首字母小写（myFunction）。
### 使用that
遵守命名规范有一定的作用，但规范毕竟不是强制，不能完全避免出现错误。这里给出了一种模式可以确保构造函数一定会按照构造函数的方式执行，那就是不要将所有成员添加到this上，而是将它们添加到that上，并返回that。

```
function Waffle(){
    var that={};
    that,tastes="yummy";
    return that;
}
```
不管用什么方式调用它（使用new或直接调用），它都会返回一个实例对象：
```
var first = new Waffle(),
    second = Waffle();
console.log(first.tastes); // "yummy"
console.log(second.tastes); // "yummy"
```
这种模式的问题是会丢失原型，因此在Waffle()的原型上的成员不会被继承到这些对象中。

需要注意的是，这里用的that只是一种命名规范，that并不是语言特性的一部分，它可以被替换为任何你喜欢的名字，比如self或me。
## 数组字面量
和JavaScript大多数东西一样，数组也是对象。可以通过内置构造函数Array()创建，也可以通过对象字面量方式创建，推荐后者。
```
//创建含有三个元素的数组
//反模式
var a=new Array("m","n","p");
//完全相同的数组
var a=["m","n","p"];//推荐

console.log(typeof a); // "object"，因为数组也是对象
console.log(a.constructor === Array); // true
```
### 数组字面量语法
* 整个数组使用方括号括起来，数组元素之间使用逗号分隔
* 数组元素可以是任意类型，包括数组和对象

#### 检查是否是数组
如果typeof的操作数是数组的话，将返回object
```
console.log(typeof [1,2])//object 
```
这个结果勉强说得过去，毕竟数组也是一种对象，但对我们来说这个结果却没什么用，实际上你往往是需要知道一个值是不是真正的数组。有时候你会见到一些检查数组的方法：检查length属性、检查数组方法比如slice()等等，但这些方法非常脆弱，非数组的对象也可以拥有这些同名的属性。还有些人使用instanceof Array来判断数组，但这种方法在某些版本的IE里的多个iframe的场景中会出问题（译注：原因就是在不同iframe中创建的数组不会相互共享其prototype属性）。

** ECMAScript5**定义了一个新方法`Array.isArray()`,如果参数是数组的话返回true，
```
var a=[1,2,3];Array.isArray(a);//true
```

## JSON
JSON 是一种轻量级的数据交换格式，被应用在多种语言中尤其是js.
JSON的格式很简单，他是数组和对象字面量的混合写法,下面是一个JSON字符串的例子：
```
{"name"：“grace”，"some":[1,2,3]}
```
JSON 和对象字面量的唯一区别是，合法的JSON属性名均使用引号包含，对象字面量只有非法属性名才会用引号包含
#### 解析JSON
jQuery库提供parseJSON()方法解析JSON
```
//输入JSON字符串
var jstr={"mykey":"my value"};
var data=jQuery.parseJSON(jstr);
console.log(data);//"my value"
```
#### 把数组或者对象转换成字JSON字符串
JSON.stringify()
```
var dog={
    name:"lili",
    dob:new Date(),
    legs:[1,2,3,4]
};
var jsonstr=JSON.stringify(dog);
//jsonstr的值为
// {"name":"Fido","dob":"2016-01-11T10:11:27.283Z","legs":[1,2,3,4]}
```
## 正则表达式字面量
正则表达式也是对象，可以通过两种方式创建他们
1.构造函数new RegExp()创建 
2.正则表达式字面量 
下面创建了一个匹配一个反斜杠（\）的正则表达式的两种方法：
```
var re=/\\/gm;

var re=new RegExp("\\\\","gm");
```
### 正则表达式字面量语法
1.表达式被两个斜杠包裹(/ /)，主体部分不包括两端的斜线
2.第二个斜杠之后可以指定模式匹配的修饰符，修饰符不需要有引号，有三种修饰符
  * g,全局匹配
  * m,多行匹配
  * i,忽略大小写匹配
3.修饰符可以自由组合，和顺序无关
```
var re=/pattern/gmi;
```
正则表达式字面量通常作为String.prototype.replace()方法的参数被使用
```
var ne_letters="abc123www".replace(/[a-z]/gi,"")//123
```
#### replace()用法
repalce（）方法用于在字符串中用一些字符串替换另一些字符串，或者替换一个与正则表达式匹配的字符串
```
stringobject.replace(regexp/substr,replacement)
```