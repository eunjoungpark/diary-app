import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import {firebaseGoogleLogin, firebaseFacebookLogin, firebaseLogin, firebaseSignup, firebaseUser, firebaseLogout} from './rest/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : null
  },
  mutations: {
    setUser(state, user){
      state.user = user;
    },
  },
  actions: {
    login({dispatch},userData){
      firebaseLogin(userData);
      dispatch('getUser');
    },
    googleLogin(){
      firebaseGoogleLogin()
    },
    facebookLogin(){
      firebaseFacebookLogin();
    },
    signup(context, userData){
      firebaseSignup(userData);
      // firebaseSignup(userData).then(res=>{
      //   axios.post('https://diary-user.firebaseio.com/users.json' + '?auth=' + res.data.idToken ,{userEmail : userData.userEmail}).then(res=>{
      //     console.log(res);
      //   }).catch(error=>{
      //     console.log(error);
      //   });
      // }).catch(error=>{
      //   console.log(error);
      // });
    },
    getUser({commit}){
      firebaseUser.then(user=>{
        commit('setUser',user);
        router.replace('/');
      }).catch(user=>{
        commit('setUser',user);
      })
    },
    logout({commit}){
      firebaseLogout();
      commit('setUser', null);
    }
  },
  getters : {
    user (state) {
      if(state.user){
        return state.user.email
      }
    }
  }
})

