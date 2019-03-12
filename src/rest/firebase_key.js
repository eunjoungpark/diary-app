import firebase from 'firebase/app'

//firebase
const config = {
    apiKey: "AIzaSyDIXmxA1pMRLycwoiAVfhOroFGChAlhG7g",
    authDomain: "diary-user.firebaseapp.com",
    databaseURL: "https://diary-user.firebaseio.com/",
    projectId: "diary-user",
    storageBucket: "diary-user.appspot.com",
    messagingSenderId: "894427736343"
  };
  firebase.initializeApp(config);