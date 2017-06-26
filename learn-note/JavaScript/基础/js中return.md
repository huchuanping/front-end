## js函数中的return语句
定义：js中的return语句用来规定从函数返回的值。当一个函数运行后，要得到一个运行结果，就需要用return语句来返回该结果
```
  function sum(x,y){
    return x+y
  }
  var result=sum(3,4);
  console.log(result) //7
```
## 无返回值的return
通常用该方法退出函数
```
function minus(a,b){
    if(a<b) return
}
```