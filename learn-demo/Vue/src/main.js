var vue=require('vue');
var VueRouter=require('vue-router');
var VueResource=require('vue-resource');
vue.user(VueRouter);//模块化变成机制
vue.user(VueResource);
var app=vue.extend({})//创建组件构造器
//实例化VueRouter
var router=new VueRouter({
	hashbang:true,// 当hashbang的值为true时，所有的路径都会被格式化已#!开头，
	history:false,
	saveScrollPosition:true,
	transitionOnLoad:true
})