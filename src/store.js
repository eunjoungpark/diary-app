import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/auth';
import {firebaseGoogleLogin, firebaseFacebookLogin, firebaseLogin, firebaseSignup, firebaseLogout, firebaseUser} from './rest/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state : {
    user : null
  },
  mutations: {
    setUser(state,user){
      state.user = user;
    }
  },
  actions: {
    login(context, userData){
      firebaseLogin(userData);
      context.dispatch('getUser');
    },
    googleLogin(context){
      firebaseGoogleLogin();
      context.dispatch('getUser');
    },
    facebookLogin(context){
      firebaseFacebookLogin();
      context.dispatch('getUser');
    },
    signup(context, userData){
      firebaseSignup(userData);
      context.dispatch('getUser');
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
    logout({commit}){
      firebaseLogout();
      commit('setUser',null);
    },
    getUser({commit}){
      firebaseUser.then(user=>{
        if(user !== null){
          commit('setUser',user);
        }
      }).catch(()=>{
        commit('setUser',null);
      })
    }
  },
  getters : {
    user (state) {
      if(state.user){
        return state.user.email;
      }
    }
  }
})

