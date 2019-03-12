import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import './firebase_key';
let database = firebase.database();

const writeDiary = (formData) => {
    // database.ref('diary/' + firebase.auth().currentUser.uid).set({
    //     email : formData.writer
    // });
    let userId = firebase.auth().currentUser.uid;
    console.log("userid : "+userId);
    firebase.database().ref('diary/' + userId).set({
        email: formData.email,
    });
}

export {
    writeDiary
}