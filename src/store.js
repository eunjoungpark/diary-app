import Vue from 'vue'
import Vuex from 'vuex'
import firebaseDB from './rest/firebase'
import {firebaseGoogleLogin, firebaseFacebookLogin} from './rest/auth'

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
      firebaseDB.post('/verifyPassword?key=AIzaSyDIXmxA1pMRLycwoiAVfhOroFGChAlhG7g',{
        email : userData.userEmail,
        password : userData.userPasswd,
        returnSecureToken : true
      }).then(res=>{
          console.log(res);
      }).catch(error=>{
          console.log(error);
      });
    },
    googleLogin(){
      firebaseGoogleLogin()
    },
    facebookLogin(){
      firebaseFacebookLogin();
    },
    signup({commit}, userData){
      console.log(userData);
    }
  }
})
