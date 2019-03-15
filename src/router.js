import Vue from 'vue'
import Router from 'vue-router'
import Contents from './views/Contents.vue';
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import List from './views/List.vue'
import View from './views/View.vue'
import Write from './views/Write.vue'
import Modify from './views/Modify.vue'

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
    },
    {
      path:'/signup',
      component : Signup,
    }      
  ]
})
