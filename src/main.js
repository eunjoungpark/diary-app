import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import uiStyle from './assets/ui.css'
import 'vue-awesome/icons'
import './plugins/element.js'
import Icon from 'vue-awesome/components/Icon'
import Vuelidate from 'vuelidate'
import * as VueGoogleMaps from 'vue2-google-maps'
import _ from 'lodash'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCBmmqcxI_KKx_UCNl-NzPbbiooLMOJs7c',
    libraries: 'places,drawing,visualization'
  }
})
Vue.use(Vuelidate)
Vue.component('icon', Icon)
Vue.use(_)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
