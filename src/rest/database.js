import './apikey';
import store from '../store'
const database = firebase.database();

//글작성
const writeDiary = (uid, formData) => {
    let newDiaryKey = {};
    newDiaryKey = firebase.database().ref().child('diary').push().key;
    let updates = {};
    updates['/diary/' + uid + '/' + newDiaryKey] = formData;
    return firebase.database().ref().update(updates);
}

const fetchDiaries = (uid) =>{
    if(!uid) {
        return;
    }
    const diariesDB = firebase.database().ref().child('diary/' + uid);
    diariesDB.on("value", snap=>{
        store.dispatch('get_diaries', snap.val());
    });
}

const fetchDiary = (uid, diaryId) =>{
    if(!uid) {
        return;
    }
    const diariesDB = firebase.database().ref().child('diary/' + uid);
    const diaryDB = diariesDB.child(`${diaryId}`);
    diaryDB.on("value", snap=>{
        store.dispatch('get_diary', snap.val());
    });
}

export {
    writeDiary,
    fetchDiaries,
    fetchDiary
}