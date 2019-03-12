import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import {firebaseGoogleLogin, firebaseFacebookLogin, firebaseLogin, firebaseSignup, firebaseUser, firebaseLogout} from './rest/auth'
import {writeDiary, fetchDiary} from './rest/database'
Vue.use(Vuex);

const vm = new Vue();
export default new Vuex.Store({
  state: {
    user : null,
    uid : null,
    formData : null
  },
  mutations: {
    setUser(state, user){
      state.user = user.email;
      state.uid = user.uid;
    },
  },
  actions: {
    login(context, userData){
      firebaseLogin(userData);
      context.dispatch('getUser');
    },
    googleLogin({commit,dispatch}){
      firebaseGoogleLogin();
      dispatch('getUser');
    },
    facebookLogin({dispatch}){
      firebaseFacebookLogin();
      dispatch('getUser');
    },
    signup({dispatch}, userData){
      firebaseSignup(userData);
      dispatch('getUser');
    },
    getUser({commit}){ //현재 user가져오기
      firebase.auth().onAuthStateChanged((user)=>{
        if (user !== null) {
          commit('setUser',user);
          router.replace('/');
        } else {
          commit('setUser',{
            email : null,
            uid : null
          });
        } 
      });
    },
    logout({commit,state}){
      firebaseLogout();
      commit('setUser',{
        email : null,
        uid : null
      });
    },
    saveDiaryData({state}, formData){
      writeDiary(state.uid, formData);
      router.push('/');
    },
    getDiary(contxt, uid){
      fetchDiary(uid);
    }
  },
  getters : {
    user (state) {
      if(state.uid){
        return state.user
      }
    },
    uid (state){
      if(state.uid){
        return state.uid
      }
    }
  }
})

