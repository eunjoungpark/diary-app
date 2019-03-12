import firebase from 'firebase/app';
import 'firebase/auth';
import './firebase_key';
import router from '../router';



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
    firebase.auth().onAuthStateChanged((user) =>{
        if (user != null) {
            resolve(user);
        } else {
            reject();
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
    firebaseLogout,
    firebaseUser
}
