// import firebase from 'firebase/app';
// import 'firebase/auth';
import router from '../router';
import store from '../store'
import './apikey';
import Vue from 'vue'

const vm = new Vue();
const auth = firebase.auth();
auth.languageCode = 'ko';

//google
const firebaseGoogle = new firebase.auth.GoogleAuthProvider();
const firebaseGoogleLogin = (state) => {
    auth.signInWithPopup(firebaseGoogle).then(function(result) {
        // console.log();
        if(state == 'login'){
            loginSuccess();
            router.replace('/');
        }else if(state == 'leave'){
            letMeGo();
        }
    }).catch(function(error) {
        vm.$message({
            message : "이메일 또는 비밀번호가 유효하지 않습니다.",
            type : 'error',
            center : true,
            duration : 1500,
        });
    });
};

//facebook
const firebaseFacebook = new firebase.auth.FacebookAuthProvider();
const firebaseFacebookLogin = (state) => {
    auth.signInWithPopup(firebaseFacebook).then(function(result) {
        if(state == 'login'){
            loginSuccess();
            router.replace('/');
        }else if(state == 'leave'){
            letMeGo();
        }
    }).catch(function(error) {
        vm.$message({
            message : "이메일 또는 비밀번호가 유효하지 않습니다.",
            type : 'error',
            center : true,
            duration : 1500,
        });
    });
};

//signin
const firebaseLogin = (userData) => {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{
        auth.signInWithEmailAndPassword(userData.userEmail, userData.userPasswd).then(()=>{
            if(userData.state == 'login'){
                loginSuccess();
                router.replace('/');
            }else if(userData.state == 'leave'){
                letMeGo();
            }
        }).catch(function(error) {
            vm.$message({
                message : "이메일 또는 비밀번호가 유효하지 않습니다.",
                type : 'error',
                center : true,
                duration : 1500,
            });
        });
    });
};

//signup
const firebaseSignup = (userData) => {
    auth.createUserWithEmailAndPassword(userData.userEmail, userData.userPasswd).then(res=>{
        vm.$message({
            message : '가입을 축하합니다.',
            type : 'success',
            center : true,
            duration : 1500,
            onClose :router.replace('/')
        });
    }).catch(function(error) {
        console.log(error.code);
    });
};

//logout
const firebaseLogout = () => {
    auth.signOut().then(function() {
        vm.$message({
            message : '로그아웃 되었습니다.',
            type : 'error',
            duration : 1500,
            center : true,
            onClose : router.replace('/login')
        });
    }).catch(function(error) {
        console.log('error');
    });
}

//login success
const loginSuccess = () => {
    vm.$message({
        message : '로그인 되었습니다.',
        type : 'success',
        center : true,
        duration : 2000
    });
}

//leave
const letMeGo = ()=>{
    var user = auth.currentUser;
    user.delete().then(function() {
        store.commit('set_user', {
            email : null,
            uid : null
        });
        vm.$message({
            message : "회원탈퇴 되었습니다.",
            type : 'error',
            duration : 1500,
            center : true,
            onClose : router.replace('/')
        });
    }).catch(function(error) {
        console.log(error);
    });
}


export {
    firebaseGoogleLogin,
    firebaseFacebookLogin,
    firebaseLogin,
    firebaseSignup,    
    firebaseLogout,
    letMeGo
}
