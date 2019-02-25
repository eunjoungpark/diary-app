import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : {
      emailAddr : "",
      password : "",
      joinDate : "",
      joinPath : "" //signup or google or facebook
    }
  },
  mutations: {
    
  },
  actions: {
    login({commit}, userData){
      console.log(userData);
    },
    signUp(){

    }
  }
})
