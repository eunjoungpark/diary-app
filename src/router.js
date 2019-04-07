import Vue from 'vue'
import Router from 'vue-router'
import Contents from './views/Contents.vue';
const Login = () => import ('./views/Login.vue');
const Leave = () => import ('./views/Leave.vue');
const Signup = () => import ('./views/Signup.vue');
const List = () => import ('./views/List.vue');
const View = () => import ('./views/View.vue');
const Write = ()=> import ('./views/Write.vue');
const Modify = () => import('./views/Modify.vue');

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component : Contents,
      children : [
        {component: List, path: '/'},
        {component: View, path: '/view/:id', name : 'view'},
        {component: Write, path: '/write'},
        {component: Modify, path: '/modify/:id'}
      ]
    },
    {
      path:'/login',
      component : Login,
    },{
      path:'/leave',
      component : Leave,
    },
    {
      path:'/signup',
      component : Signup,
    }      
  ]
})
