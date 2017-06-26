页面中经常遇到一些文字换行显示和溢出处理，通常我们都用css3的一些属性去处理
#### css3 text-overflow属性 
该属性规定当文本溢出包含元素时发生的事情
text-overflow:clip|ellipsis|string|inherit
clip:裁剪
ecllips：显示三个点... 常用
inherit:用于hover效果（和overflow：hidden连用）
string:使用给定的字符串来代表被修剪的文本。
```.lbl-content {
    display: inline-block;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}```
`.lbl-content:hover{
    text-overflow: inherit;
    overflow: visible;
}`
#### css white-space属性
white-space：nowrap 规定文本不进行换行
#### css word-break word-wrap
* word-break:break-all和word-wrap:break-word都是能使其容器如DIV的内容自动换行。
* word-break:break-all 例如div宽200px，它的内容就会到200px自动换行，如果该行末端有个英文单词很长（congratulation等），它会把单词截断，变成该行末端为conra(congratulation的前端部分)，下一行为tulation（conguatulation）的后端部分了。
* word-wrap:break-word 例子与上面一样，但区别就是它会把congratulation整个单词看成一个整体，如果该行末端宽度不够显示整个单词，它会自动把整个单词放到下一行，而不会把单词截断掉的。