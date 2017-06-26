# indexOf() 方法
定义：返回某个指定的字符串在字符串中首次出现的位置
## JS数组操作常用方法
### concat()
#### 定义：
concat方法用于连接两个或多个数组，该方法不会改变现有数组，而仅仅会返回被连接数组的一个副本。
#### 语法：
```
arrayObject.concat(arryX,arrayX,...)
```
#### 返回值：
返回一个新的数组。该数组是通过把所有 arrayX 参数添加到 arrayObject 中生成的。如果要进行 concat() 操作的参数是数组，那么添加的是数组中的元素，而不是数组。
```
var arr1=[1,2];
var arr2=[3,4];
console.log(arr1.concat(arr2));//[1,2,3,4]
```
### push()
向数组末尾添加一个或者多个元素，并返回新的长度,该方法直接修改原来数组
返回值是数组的新长度
```
arrayObject.push(newelement1,newelement2....)
```

```
var arr1=[1,2];
var arrLen=arr1.push(3,4);
console.log(arrLen);//4
```
### unshift()
和push用法相反，向数组开头添加一个或多个元素并返回数组新的长度。
```
arrayObject.unshift(newelement1,newelement2....)
```

```
var arr1=[1,2];
var newlen=arr1.unshift(3,5);
console.log(newlen);//4
console.log(arr1);//[3,5,1,2]
```

### pop()
用于删除并返回数组的最后一个元素
```
arrayObject.pop()
```
返回值：数组的最后一个元素
```
var arr1=[1,2];
var ele=arr1.pop();
console.log(ele);//2
console.log(arr1);//[1]
```
### shift()
和pop()用法相反，用于删除并返回数组的第一个元素
```
arrayObject.shift()
```
### join()
用于把数组中所有元素都放入一个字符串，元素通过指定的分隔符进行分隔。
```
arrayObject.join(separator);
//separator是可选的，指定使用的分隔符，如果省略则默认用逗号分隔
```
返回一个字符串，该字符串是通过把arrayObject的每个元素转换为字符串，然后把这些字符串链接起来，在两个元素之间插入separator
```
var arr1=["a","b",1,2];
str=arr1.join('');
str1=arr1.join();
console.log(str)//ab12
console.log(str1)//a,b,1,2
```
### slice()
可从已有的数组中返回选定的元素
```
arrayObject.slice(start,end)
//start 为必需参数，规定从何处开始选取，如果是负数就规定从数组尾部开始算起的位
//置，-1指倒数第一个元素
```
返回值是一个新的数组，包含从start到end（不包括该元素）的arrayObject中的元素。
```
var arr1=["a","b",1,2];
arr2=arr1.slice(-1);
console.log(ar2);//[2]
```
### sort()
对数组中的元素进行排序，返回值是对数组的引用，注意的是数组在原数组上进行排序，不生成数组副本。
```
var arr1=["a","b",1,2];
arr1.sort();
console.log(arr1);//[1, 2, "a", "b"]
```
### splice()
向/从数组中添加/删除项目，然后返回被删除的项，该方法会改变原始数组。
```
arrayObject.splice(index,howmany,item1...itemx);
//index,必需参数，规定添加/删除项的位置
//howmany，必需参数，要删除项目的数量，如果为0则不删除
//itemx，可选参数， 向数组添加新项目 
//删除后添加相当于替换数组中的某个元素
```
返回值是被删除项目的新数组，而pop()返回值是被删除的元素，并不是数组
```
var arr1=["a","b",1,2];
//console.log(arr1.pop());//2
console.log(arr1.splice(-1,1));//[2]
```

替换数组中项
```
var arr1=["a","b",1,2];
arr1.splice(-1,1,"m");
console.log(arr1);//["a", "b", 1, "m"]
```
### reverse()
颠倒数组中的元素的顺序
```
var arr1=["a","b",1,2];
arr1.splice(-1,1,"m");
arr1.reverse();
console.log(arr1)//["m", 1, "b", "a"]
```