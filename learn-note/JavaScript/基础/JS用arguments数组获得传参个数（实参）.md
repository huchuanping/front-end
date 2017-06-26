JS可以随意传参，实参比形参少或者多都不会报错。
### 实参比形参多
```
function say(a){
    console.log(a)
};
say('你好','吗');//你好
```
### 形参比实参多
```
function say(a,b){
    console.log(a+b)
};
say('你好');//你好 undefined
```
### arguments对象
我们再设计比较复杂的程序时并不指定参数个数，都是灵活运用。在函数里有一个数组arguments就是专门存储实参数组的，通过arguments我们可以知道实参的个数
```
function arg(){
    var str='总共传了'+arguments.length+'个参数\n';
    console.log(str)
};
arg('参数1','参数2','参数3');//总共传了3个参数
```