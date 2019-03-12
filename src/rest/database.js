import './apikey';
const database = firebase.database();

//글작성
const writeDiary = (uid, formData) => {
    let newPostKey = {};
    newPostKey.key = firebase.database().ref().child('diary').push().key;
    newPostKey.date = new Date();
    let updates = {};
    updates['/diary/' + uid + '/' + newPostKey] = formData;
    return firebase.database().ref().update(updates);
}

const fetchDiary = (uid) =>{
    let newPostKey = firebase.database().ref('diary/'+ uid).limitToLast(100);
    // let getDiary = firebase.database().ref('diary/');
    console.log(newPostKey);
}

export {
    writeDiary,
    fetchDiary
}