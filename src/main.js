import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import uiStyle from './assets/ui.css'
import 'vue-awesome/icons'
import './plugins/element.js'
import Icon from 'vue-awesome/components/Icon'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.component('icon', Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
