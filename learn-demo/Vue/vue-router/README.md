## `<router-view></router-view>`标签
将组件映射到路由时，需要告诉vue-router在哪里渲染组件，`router-view`用于渲染组件
##模块化机制编程中的路由创建router实例
```
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router=new Router({//创建router实例，传入‘routes’
    routes:[{path:'./xxx',component:xx},...]
    })
```
## router.push(location)
## 路由对象-$route 
使用 `$route.path`可以访问当前的路由;

路由对象暴露了以下属性：
$route.path 
字符串，等于当前路由对象的路径，会被解析为绝对路径，如 "/home/news" 。
$route.params 
对象，包含路由中的动态片段和全匹配片段的键值对
$route.query 
对象，包含路由中查询参数的键值对。例如，对于 /home/news/detail/01?favorite=yes ，会得到 $route.query.favorite == 'yes' 。
$route.router 
路由规则所属的路由器（以及其所属的组件）。
$route.matched 
数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。
$route.name 
当前路径的名字，如果没有使用具名路径，则名字为空。
```
<div>
    <p>当前路径：{{$route.path}}</p>
    <p>当前参数：{{$route.params | json}}</p>
    <p>路由名称：{{$route.name}}</p>
    <p>路由查询参数：{{$route.query | json}}</p>
    <p>路由匹配项：{{$route.matched | json}}</p>
</div>
```