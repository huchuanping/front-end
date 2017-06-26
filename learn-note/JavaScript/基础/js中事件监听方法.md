## 事件的Event对象
当一个事件被触发的时候，会创建一个事件对象（Event Object）,这个对象里包含了一些有用的属性和方法。事件对象会作为第一个参数，传递给我们的回调函数。在浏览器中打印出事件对象：
```
<button>click me</button>
//js
$('button').click(function(event){
    console.log(event);
});
//b.Event {originalEvent: MouseEvent, type: "click", timeStamp: 1454572025857, jQuery19108809180126991123: true, toElement: button…}
//可以看到一堆属性列表
```
事件对象包括一些有用的信息，比如事件触发时，鼠标在屏幕上的坐标，被触发的DOM详细信息、以及上图最下面继承过来的停止冒泡方法（stopPropagation），下面介绍几个属性和方法：
1.type(string)
事件名称，比如'click'
2.target(node)
事件要触发的目标节点
3.bubbles(boolean)
表明该事件是否在冒泡阶段触发的
4.preventDefault(function)
这个方法可以禁止一切默认的行为，例如点击a标签时，会打开一个新的页面，如果为a标签监听事件click同时调用该方法，就不会打开新页面了。
5.stopPropagation
停止冒泡
6.stopImmediatePropagation(function)
与stopPropagation类似，就是阻止触发其他监听函数，不同的是它更强力
## 使用事件监听函数
```
 element.addEventListener(<event-name>,<callback>,<use-capture>) 
```
语义：在element这个对象上添加一个事件监听器，当监听到有`<event-name>`这个事件发生的时候，就会调用`<callback>`这个函数，`<use-capture>`是布尔类型，true时表示事件监听是在’捕获‘阶段中监听，false表示是在“冒泡”阶段中监听。
demo
```
//html 
<button id="btn"></button>
//js
var bn=document.getElementById('btn');
bn.addEventListener('click',function(){
    alert('你点击了这里');
    },false)
```
## 移除事件监听
```
element.removeEventListener(<event-name>,<callback>,<use-capture>)
```
## 常用事件和技巧
### load
laod事件在资源加载完成时触发，这个资源可以是图片、js文件、css文件、视频document和window等等。
```
document.load()
```
[继续](http://top.css88.com/archives/662#target(node))