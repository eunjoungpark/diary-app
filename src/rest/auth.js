// import firebase from 'firebase/app';
// import 'firebase/auth';
import router from '../router';
import './apikey';
import Vue from 'vue'

const vm = new Vue();

//google
const firebaseGoogle = new firebase.auth.GoogleAuthProvider();
const firebaseGoogleLogin = () => {
    firebase.auth().signInWithPopup(firebaseGoogle).then(function(result) {
        loginSuccess();
        router.replace('/');
    }).catch(function(error) {
        let errorMessage = error.message;
        console.log(errorMessage);
    });
};

//facebook
const firebaseFacebook = new firebase.auth.FacebookAuthProvider();
const firebaseFacebookLogin = () => {
    firebase.auth().signInWithPopup(firebaseFacebook).then(function(result) {
        loginSuccess();
        router.replace('/');
    }).catch(function(error) {
        var errorMessage = error.message;
        console.log(errorMessage);
    });
};

//signin
const firebaseLogin = (userData) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{
        firebase.auth().signInWithEmailAndPassword(userData.userEmail, userData.userPasswd).then(()=>{
            loginSuccess();
            router.replace('/');
        });
    }).catch(function(error) {
        var errorMessage = error.message;
        console.log(errorMessage);
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
            duration : 2000,
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


export {
    firebaseGoogleLogin,
    firebaseFacebookLogin,
    firebaseLogin,
    firebaseSignup,    
    firebaseLogout
}
