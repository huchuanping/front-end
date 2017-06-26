## 事件委托（也叫事件代理）
事件委托是一种由其他元素而非事件目标元素来响应事件产生的行为的思想。用document来处理按钮的点击行为，用ul元素来处理其子元素li的事件，都是事件委托的例子。
事件委托是通过事件冒泡来实现的，它可以减少分散到各个节点上的事件处理函数的数量。如果有十个按钮在一个div中，你可以给div绑定一个事件处理函数，而不给每个按钮绑定一个。
假设有三个按钮在一个div中
```
<div class="wrap">
    <button>clickMe</button>
    <button>clickMe</button>
    <button>clickMe</button>
</div>
```
## 事件代理应用
事件代理常用在子元素比较多，或者会变化的情况。比如如果我们有一个tabel，而这个table中有无数个td，不可能给每个td都绑定一个事件，这时就用事件代理
```
$('table').on('click',function(event){
    var target=event.target;
    if(target.tagName.toLowerCase()=='td'){ //toLowerCase()转换字符串为小写
        alert(target.innerHtml;) //innerHtml属性和jquery里的html()实现一样功能
    }
    });
    //tagName和nodeName用法差不多,用来检查html元素的名字
```

## 长时间运行的脚本
有时候浏览器会提示脚本运行时间过长，询问用户是否停止执行。这是很糟糕的事情。同时如果脚本运行时间太长的话，浏览器的UI将变得没响应，用户不能点击任何东西，用户体验很差。
在JavaScript中没有县城，但可以再浏览器中使用`SetTimeout`来模拟，或者在现代浏览器中使用web works。
### SetTimeout()
它可以把一大堆工作分成一小段一小段，每隔1s运行一段，这样会导致整个任务完成更慢，不过用户界面会保持可相应状态，用户不会觉得浏览器失控。
### Web Workers
现代浏览器为长时间运行的脚本提供了一种解决方案：web workers。web workers在浏览器后台提供了线程支持，你可以将计算量很大的部分放到一个单独的文件中：`demo_workers.js`,在主程序成这样调用它：
```
//检查浏览器对web workers支持,再调用
if(typeof(Worker)!=="undefined"){
    //Yes!Web worker support!
    var w=new Worker('demo_workers.js');
    w.onmessage=function(event){
        document.getElementById('result').innerHtml=event.data;
    }
}else{
    //Sorry!No Web Worker support
}
```
## 部署JavaScript
[链接](https://github.com/huchuanping/javascript.patterns/blob/master/chapter8.markdown)
