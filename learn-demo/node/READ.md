##package.json 
[参考文章](http://javascript.ruanyifeng.com/nodejs/packagejson.html)
每个项目的根目录下面，一般都有一个package.json文件，定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、
许可证等元数据）。npm install命令根据这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境。
PS:安装包的信息可保持到项目的package.json文件中，以便后续的其它的项目开发或者他人合作使用，也说package.json在项目中是必不可少的。
##通过命令自行创建package.json
npm init 命令：在项目中引导创建一个package.json文件
PS：这个命令采用互动方式，要求用户回答一些问题，然后在当前目录生成一个基本的package.json文件。所有问题之中，
只有项目名称（name）和项目版本（version）是必填的，其他都是选填的。
### 一个详细的package.json示例 
```
{
    "name": "Hello World",
    "version": "0.0.1",
    "author": "张三",
    "description": "第一个node.js程序",
    "keywords":["node.js","javascript"],
    "repository": {
        "type": "git",
        "url": "https://path/to/url"
    },
    "license":"MIT",
    "engines": {"node": "0.10.x"},
    "bugs":{"url":"http://path/to/bug","email":"bug@example.com"},
    "contributors":[{"name":"李四","email":"lisi@example.com"}],
    "scripts": {
        "watch:scss": "sass --watch assets/scss:assets/css",
        "watch:scss-component": "sass --watch assets/component",
        "watch:scss-pages": "sass --watch assets/pages",
        "watch:js": "node_modules/.bin/webpack --watch -d",
        "build": "set NODE_ENV=production && webpack -d",
        "start:static": "node_modules/.bin/anywhere 1525",
        "start:develop-server": "node_modules/.bin/webpack-dev-server --inline --hot --host 0.0.0.0 --port 10000",
        "dev-page": "node_modules/.bin/npm-run-all --parallel watch:scss-pages start:develop-server",
        "dev": "node_modules/.bin/npm-run-all --parallel watch:scss watch:scss-component watch:scss-pages start:develop-server",
        "dev-js": "node_modules/.bin/npm-run-all --parallel start:develop-server",
        "preview": "node_modules/.bin/npm-run-all build:js start:static"
    },
    "dependencies": {
        "express": "latest",
        "mongoose": "~3.8.3",
        "handlebars-runtime": "~1.0.12",
        "express3-handlebars": "~0.5.0",
        "MD5": "~1.2.0"
    },
    "devDependencies": {
        "bower": "~1.2.8",
        "grunt": "~0.4.1",
        "grunt-contrib-concat": "~0.3.0",
        "grunt-contrib-jshint": "~0.7.2",
        "grunt-contrib-uglify": "~0.2.7",
        "grunt-contrib-clean": "~0.5.0",
        "browserify": "2.36.1",
        "grunt-browserify": "~1.3.0",
    }
}
```

## scripts 字段
[参考文章](http://www.jianshu.com/p/3cf367c65e5f)
scripts字段指定了运行脚本命令的npm命令行缩写，比如`start`指定了运行`npm run start`时所要执行的命令
npm Scripts 是用定义来一些任务的。我们在命令行中执行 npm run `任务名`，即可执行这个命令。
## dependencies 字段  devDependencies字段
dependencies字段指定了项目运行所依赖的模块，devDependencies指定项目开发所需要的模块。
`npm i 模块名 --save` 会把依赖模块放到 dependencies 里
`npm i 模块名 --save-dev` 会把依赖模块放到 devDependencies 里


## require() 模块加载
Node.提供了exports和require两个对象,其中exports是模块公开的接口,require用于从外部获取一个模块接口,即所获取模块的exports对象.
[参考文章](https://liuzhichao.com/p/1669.html)
### exports和moudule.exports
一个模块可以通过exports或者module.exports将函数或者变量等导出，方便其他模块使用require()函数引入并使用，exports 和module.exports
指向同一个对象，但所有的exports收集到的属性和方法，都赋值给了module.exports。
如果你想你的模块是一个特定的类型就用module.exports。如果你想的模块是一个典型的”实例化对象”就用exports。
exports用于导出当前模块公用的方法和属性
count.js
```
function count(i){
    return i+1
}
exports.count=count;
```
module.exports替换当前模块的导出对象，下面代码表示模块的默认导出对象被替换为一个函数
```
module.exports=function(){
    console.log('当前模块')
}
```