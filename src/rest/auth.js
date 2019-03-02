import firebase from 'firebase/app';
import 'firebase/auth';

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
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
}

//google
const firebaseFacebook = new firebase.auth.FacebookAuthProvider();
const firebaseFacebookLogin = () => {
    firebase.auth().signInWithPopup(firebaseFacebook).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
}

export {
    firebaseGoogleLogin,
    firebaseFacebookLogin
}
