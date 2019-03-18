import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import _ from 'lodash'
import {firebaseGoogleLogin, firebaseFacebookLogin, firebaseLogin, firebaseSignup, firebaseLogout} from './rest/auth'
import {writeDiary, updateDiary, fetchDiaries, fetchDiary, deleteDiary, imageDelete} from './rest/database'
Vue.use(Vuex);
Vue.use(_);

const vm = new Vue();
const auth = firebase.auth();
export default new Vuex.Store({
  state: {
    user : null,
    uid : null,
    diaries : null,
    diary : null
  },
  mutations: {
    set_user(state, user){
      state.user = user.email;
      state.uid = user.uid;
    },
    set_diaries(state, diaries){
      state.diaries = diaries;
    },
    set_diary(state, diary){
      state.diary = diary;
    }
  },
  actions: {
    login({dispatch}, userData){ //Base Login
      firebaseLogin(userData);
      dispatch('get_user');
    },
    googleLogin({commit,dispatch}){ //Google Login
      firebaseGoogleLogin();
      dispatch('get_user');
    },
    facebookLogin({dispatch}){ //Facebook Login
      firebaseFacebookLogin();
      dispatch('get_user');
    },
    signup({dispatch}, userData){ //SignUp
      firebaseSignup(userData);
      dispatch('get_user');
    },
    get_user({dispatch,commit}){ //Related Login : get current user
      auth.onAuthStateChanged((user)=>{
        if(user !== null){
          commit('set_user',user);
        }else{
          commit('set_user',{
            email : null,
            uid : null
          });
        }
      });    
    },
    logout({commit,state}){ //Logout
      firebaseLogout();
      commit('set_user',{
        email : null,
        uid : null
      });
      commit('set_diaries', null);
      commit('set_diary', null);
    },
    save_diary({state}, formData){ //For Write : save a diary
      writeDiary(state.uid, formData.files, formData.diary);
      router.push('/');
    },
    update_diary ({state}, updateData){
      updateDiary(state.uid, updateData.diaryId, updateData.files, updateData.formData);
      router.push({name:'view', params : {id : updateData.diaryId}});
    },
    delete_diary ({state}, updateData){
      deleteDiary(state.uid, updateData);
      router.push('/');
    },
    fetch_diaries({dispatch}){ //For List : get diaries step1
      auth.onAuthStateChanged((user)=>{
        if(user !== null){
          fetchDiaries(user.uid);
        }else{
          fetchDiaries(null);
        }
      });
    },
    fetch_diary({dispatch}, diaryId){ //For List : get diary step1
      auth.onAuthStateChanged((user)=>{
        if(user !== null){
          fetchDiary(user.uid, diaryId);
        }else{
          fetchDiary(null);
        }
      });
    },    
    get_diaries({commit, state},diaries){ //For List : get diaries step2
      if(diaries !== null){
        commit('set_diaries', diaries);
      }else {
        commit('set_diaries', null);
      }
    },
    get_diary({commit, state}, diary){ //For List : get diary step2
      if(diary !== null){
        commit('set_diary', diary);
      }else {
        commit('set_diary', null);
      }
    },
    delete_image({state}, file){
      imageDelete(state.uid, file.diaryId, file.filename);
    }
  },
  getters : {
    user (state) {
      return state.user
    },
    uid (state){
      return state.uid
    },
    diaries (state){
      return state.diaries
    },
    diary (state){
      return state.diary
    }
  }
})

