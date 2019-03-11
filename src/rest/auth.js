import firebase from 'firebase/app';
import 'firebase/auth';
import router from '../router';

const config = {
    apiKey: "AIzaSyDIXmxA1pMRLycwoiAVfhOroFGChAlhG7g",
    authDomain: "diary-user.firebaseapp.com",
    databaseURL: "https://diary-user.firebaseio.com",
    projectId: "diary-user",
    storageBucket: "diary-user.appspot.com",
    messagingSenderId: "894427736343"
};
firebase.initializeApp(config);

//google
const firebaseGoogle = new firebase.auth.GoogleAuthProvider();
const firebaseGoogleLogin = () => {
    firebase.auth().signInWithPopup(firebaseGoogle).then(function(result) {
        let token = result.credential.accessToken;
        let user = result.user;
        
    }).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
    });
};

//facebook
const firebaseFacebook = new firebase.auth.FacebookAuthProvider();
const firebaseFacebookLogin = () => {
    firebase.auth().signInWithPopup(firebaseFacebook).then(function(result) {
        let token = result.credential.accessToken;
        let user = result.user;
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
};

//signin
const firebaseLogin = (userData) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{
        firebase.auth().signInWithEmailAndPassword(userData.userEmail, userData.userPasswd).then(()=>{
            router.replace('/');
        });
    }).catch(function(error) {
        //var errorCode = error.code;
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

//session
const firebaseUser = new Promise ((resolve, reject)=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user != null) {
            resolve(user);
        } else {
            //reject(null);
        } 
    });
});

//logout
const firebaseLogout = () => {
    firebase.auth().signOut().then(function() {
        router.replace('/login');
    }).catch(function(error) {
        console.log('error');
    });
}

export {
    firebaseGoogleLogin,
    firebaseFacebookLogin,
    firebaseLogin,
    firebaseSignup,
    firebaseUser,
    firebaseLogout
}
