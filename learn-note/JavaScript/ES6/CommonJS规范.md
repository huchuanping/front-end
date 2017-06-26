## 目录
* 概述
* module
  * module.exports属性 
  * exports变量
* AMD规范与CommonJS规范的兼容性
* require命令
  * 基本用法
  * 加载规范
  * 目录的加载规则
  * 模块缓存
  * 环境变量NODE_PATH
  * 模块的循环加载
  * require.main 
* 模块的加载机制
### 概述
Node程序由许多模块组成，每个模块就是一个文件，node采用了CommonJS规范。
CommonJS规范里，一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说在一个文件里定义的变量都是私有的，对其他文件不可见。
```
//example.js 
var x=5;
var addX=function(value){
    return value+x;
};//x和addX是私有的
```
要想在多个文件中分享变量，必须定义为glabal对象的属性：
```
glabal.warning=true;//这里的warning 变量可被所有文件读取，不过不推荐这种写法
```
CommonJS规定每个文件的对外接口是module.exports对象，这个对象的所有属性和方法都可以被其他文件导入,它是文件内部与外部通信的桥梁。
```
//example.js 
var x=5;
var addX=function(value){
    return value+x;
};
module.exports.x=x;
module.exports.addX=addX;
```
### module对象
每个模块内部，都有一个module对象，代表当前模块，它有一下属性
 * module.id:模块标识符，通常是带有绝对路径的模块文件名
 * module.filename 模块文件名，带有绝对路径
 * module.loaded 返回一个布尔值，表示模块是否已经加载完成
 * module.parenet 返回一个对象，表示该模块的模块
 * module.children 返回一个数组，表示该模块要用到的其他模块
 ```
var jquery=require('jquery');
exports.$=jquery;
console.log(module);
 ```
 [参考链接](http://javascript.ruanyifeng.com/nodejs/module.html#toc0)