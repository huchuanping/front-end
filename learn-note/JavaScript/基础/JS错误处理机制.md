## Error 对象
一旦代码解析或者运行错误，JavaScript引擎就会自动产生并抛出一个Error对象的实例，整个程序就会中断在发生错误的地方。
Error对象的实例有三个最基本属性：
 * name 错误名称
 * message 错误提示信息
 * stack 错误的堆栈
 利用name和message这两个属性，可以对发生什么错误有一个大概的了解
## JavaScript原生错误类型
Error对象是最一般的错误类型，在它的基础上，JavaScript还定义了其他6种错误，也就是说，存在Error的6个派生对象。
1.SyntaxError 
解析代码时发生的语法错误
```
//变量名称错误
var 1a;
//缺少括号
console.log 'hello');
```
2.ReferenceError 
是引用一个不存在的变量时发生的错误
```
unknowVariable
// ReferenceError: unknownVariable is not defined
```
另一种触发场景是，将一个值分配给无法分配的对象，比如对函数的运行结果或者this赋值。
3.RangeError 
是一个当值超出有效范围时发生的错误，有一下几种情况，一是数组长度为负数，二是Number对象的方法参数超出范围
4.TypeError 
是变量或者参数不是预期类型时发生的错误。比如字符串，布尔值、数值等原始类型值使用new命令
```
new 123;
//TypeError: number is not a func
var obj = {};
obj.unknownMethod()
// TypeError: undefined is not a function 
```
5.URIError 
URIError是URI相关函数的参数不正确时抛出的错误，主要涉及encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数。
6.EvalError 
eval函数没有被正确执行时，会抛出EvalError错误。该错误类型已经不再在ES5中出现了，只是为了保证与以前代码兼容，才继续保留。
上面六种错误连同原生的Error对象，都是构造函数。

## try…catch结构
为了对错误进行处理，需要使用try…catch结构
```
tyr{
    throw new Error('出错了');
    }catch(e){
        console.log(e.name+":"+e.message);
        console.log(e.stack);
    }
```
上面代码中，try代码块一抛出错误（上例用的是throw语句），JavaScript引擎就立即把代码的执行，转到catch代码块。可以看作，错误可以被catch代码块捕获。catch接受一个参数，表示try代码块抛出的值。
