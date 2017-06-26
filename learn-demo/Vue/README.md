## Vuex
[实例参考链接](http://www.tuicool.com/articles/qUzMN3Y)
[实例参考链接1](http://www.jb51.net/article/111590.htm)
* 它是vue的状态管理工具，集中管理和存储数据
      场景一：处理多个组件依赖于同一个数据，例如柱状图和饼状图
      展示同一个数据
      场景二：一个组件行为-改变数据-影响另一个组件的视图
      它将组件和公用数据分离，在一个公共仓库里管理，是的组件容易获取数据（getter），也容易设置数据（setter）
* 核心 store
     store就是存储数据的仓库，其中state也就是数据源存放地相当于vue里的data，action和mutation对应于methods
* 创建store实例
   new Vuex.store({state,getters,mutations,actions})
* Mutations
   1. 存放一些改变数据方法的集合，在Vuex中store数据改变的唯一方法就是提交mutation
   2.mutaotions非常类似于事件：每个mutation都有一个字符串的事件类型（type）和一个回调函数，这个回调函数就是
   我们变更状态的地方，它接受state作为第一个参数
   3.mutation 必须是同步函数,任何在回调函数中进行的状态改变都是不可追踪的
   4、使用常量代替mutation事件类型，同时把这些常量放在一个单独的文件中可以让合作者对整个app包含
   的mutation一目了然。
   5、为了处理异步问题，使用Action
* Actions
   1.action提交的是mutation而不是直接变更状态，可以包含任意异步操作
   2.action函数接受一个和store实例具有相同方法和属性（commit方法、getters和state属性等）的对象
   3.action通过store.dispatch 方法触发
* store中state、mutation、action关系
   state存储状态数据
   触发commit方法提交mutation直接更改state数据
   触发dispatch执行action提交mutation
```
export default new Vuex.Store({
    state:{count:0},
    mutations:{
        increment(state){
            state.count++
        }
    },
    actions:{
        increment({commit}){//ES6参数解构简化代码
            commit('increment')//commit('someMutation')
        }
    }
    })
```

```
//mutation-types.js
export const SOME_MUTATION='SOME_MUTATION'
//store.js在入口函数中全局注入store
import {SOME_MUTATION} from './mutation-types'
import Vuex from 'vuex'
export default new Vuex.Store({
    state:{...},
    mutation:{
        //使用ES6风格的计算属性命名功能来使用一个常量作为函数名
        [SOME_MUTATION](state){
            //mutate state
        }
    }
    })
```


##demo code
有header和footer两个组件，footer中有一个变量`author`根据heaer组件的输入框决定
```
//footer.vue 
<template>
    <footer>
        <p>Copyright @ {{author}}-2016 All rights reserved</p>
    </footer>
</template>
<script>
    export default{
        data(){
            return {}
        },
        computed:{
            author(){
                return this.$store.state.author
            }
        }
    }
</script>
```

```
//header.vue
<template>
    <header>
       <el-input placeholder="请输入内容" v-model="inputText">
            <el-button slot='append' @click="setAuthor" icon="search"></el-button>
       </el-input>
    </header>
</template>
<script>
export default{
        data(){
            return {}
        },
        methods:{
            setAuthor(){
                //this.$store.state.author=this.inputText,下面代码和这行代码执行结果一样，推荐使用下面的
                this.$store.commit('newAuthor',this.inputText)//$store.commit提交newAuthor,并将this.inputText传给msg
            }
        }
    }
</script>
```

```
//mian.js在入口函数中全局注入store
import Vue from 'vue'
import store from './store'
import App from './App.vue'
new Vue({
    store,//将store注入到所有子组件
    el:'#app',
    comonents:{App}
    })

```


```
//store.js
import Vue from 'Vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        author:''
    },
    mutations:{
        newAuthor(state,msg){//newAuthor是事件类型，当触发一个事件类型为'newAuthor'的mutation时调用此函数
            //handler
            state.author=msg
        }
    },
    actions:{
        actionA({commit}}){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    commit('someMutation')
                    })
                    resolve()
                },1000)
        }
    }
})```

