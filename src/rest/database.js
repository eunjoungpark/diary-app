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
};

//글수정
const updateDiary = (uid, diaryId, formData) => {
   firebase.database().ref().child('diary/' + uid + "/" + diaryId).set(formData);
};

//글삭제
const deleteDiary = (uid, diaryId) => {
    firebase.database().ref().child('diary/' + uid + "/" + diaryId).remove();
 };

//글목록
const fetchDiaries = (uid) =>{
    if(!uid) {
        return;
    }
    const diariesDB = firebase.database().ref().child('diary/' + uid);
    diariesDB.on("value", snap=>{
        store.dispatch('get_diaries', snap.val());
    });
};

//한개의 글
const fetchDiary = (uid, diaryId) =>{
    if(!uid) {
        return;
    }
    const diariesDB = firebase.database().ref().child('diary/' + uid);
    const diaryDB = diariesDB.child(`${diaryId}`);
    diaryDB.on("value", snap=>{
        store.dispatch('get_diary', snap.val());
    });
};

export {
    writeDiary,
    updateDiary,
    fetchDiaries,
    fetchDiary,
    deleteDiary
}