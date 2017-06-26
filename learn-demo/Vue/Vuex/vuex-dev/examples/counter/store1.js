import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)
const state={
	count:0
}
const mutations={
	increment(state){
		state.count++
	},
	decrement(state){
		state.count--
	}
}
const actions={
	increment:({commit})=>{
		commit('increment')
	},
	decrement:({commit})=>{
		commit('decrement')
	},
	incrementIfOdd:({commit,state})=>{
		if((state.count%2)===0){
			commit('increment')
		}
	},
	incrementAsync:({commit},s)=>{
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				commit('increment')
				resolve()
			},s)
		})
	}
}
const getters={
	evenOrOdd:state=>{(state.count%2)===0 ? 'even':'odd'}
}
export default new vuex.Store({
	state,
	actions,
	mutations,
	getters
})