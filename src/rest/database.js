import './apikey';
const database = firebase.database();

//글작성
const writeDiary = (uid, formData) => {
    console.log(uid);
    // let newPostKey = {};
    // newPostKey = firebase.database().ref().child('diary').push().key;
    // newPostKey.date = new Date();
    // let updates = {};
    // updates['/diary/' + uid + '/' + newPostKey] = formData;
    // return firebase.database().ref().update(updates);
    firebase.database().ref().child('diary/'+uid).set('test');
}

const fetchDiary = (uid) =>{
    console.log(uid);
    let newPostKey = firebase.database().ref();
    let diary = newPostKey.child('diary/' +uid);
    //diary.on("value",snap=>console.log(snap.val()));
}

export {
    writeDiary,
    fetchDiary
}