// import firebase from 'firebase/app';
// import 'firebase/auth';
import router from '../router';
import './apikey';
import Vue from 'vue'

const vm = new Vue();
firebase.auth().languageCode = 'ko';

//google
const firebaseGoogle = new firebase.auth.GoogleAuthProvider();
const firebaseGoogleLogin = () => {
    firebase.auth().signInWithPopup(firebaseGoogle).then(function(result) {
        loginSuccess();
        router.replace('/');
    }).catch(function(error) {
        vm.$message({
            message : "이메일 또는 비밀번호가 유효하지 않습니다.",
            type : 'error',
            duration : 1500,
        });
    });
};

//facebook
const firebaseFacebook = new firebase.auth.FacebookAuthProvider();
const firebaseFacebookLogin = () => {
    firebase.auth().signInWithPopup(firebaseFacebook).then(function(result) {
        loginSuccess();
        router.replace('/');
    }).catch(function(error) {
        vm.$message({
            message : "이메일 또는 비밀번호가 유효하지 않습니다.",
            type : 'error',
            duration : 1500,
        });
    });
};

//signin
const firebaseLogin = (userData) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{
        firebase.auth().signInWithEmailAndPassword(userData.userEmail, userData.userPasswd).then(()=>{
            loginSuccess();
            router.replace('/');
        }).catch(function(error) {
            vm.$message({
                message : "이메일 또는 비밀번호가 유효하지 않습니다.",
                type : 'error',
                duration : 1500,
            });
        });
    });
};

//signup
const firebaseSignup = (userData) => {
    return firebase.auth().createUserWithEmailAndPassword(userData.userEmail, userData.userPasswd).catch(function(error) {
        let errorCode = error.code;
        return errorCode;
    });
};

//logout
const firebaseLogout = () => {
    firebase.auth().signOut().then(function() {
        vm.$message({
            message : '로그아웃 되었습니다.',
            type : 'error',
            duration : 1000,
        });
        router.replace('/login');
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
const letMeGo = (userData)=>{
    console.log(userData);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{
        firebase.auth().signInWithEmailAndPassword(userData.userEmail, userData.userPasswd).then(()=>{
            var user = firebase.auth().currentUser;
            var credential;
            user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
                console.log("success");
            }).catch(function(error) {
                console.log(error);
            });
        }).catch(function(error) {
            vm.$message({
                message : "이메일 또는 비밀번호가 유효하지 않습니다.",
                type : 'error',
                duration : 1500,
            });
        });
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
