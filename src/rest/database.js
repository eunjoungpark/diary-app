import './apikey';
import store from '../store'
const database = firebase.database();
const storage = firebase.storage();

//글작성
const writeDiary = (uid, files, formData) => {
    let newDiaryKey = {};
    newDiaryKey = database.ref().child('diary').push().key;
    if(files.length > 0) {
        imageUpload(uid, newDiaryKey, files);
    }
    let updates = {};
    updates['/diary/' + uid + '/' + newDiaryKey] = formData;
    return database.ref().update(updates);
};

//글수정
const updateDiary = (uid, diaryId, files, formData) => {
    if(files.length > 0) {
        imageUpload(uid, diaryId, files);
    }
    database.ref().child('diary/' + uid + "/" + diaryId).set(formData);
};

//글삭제
const deleteDiary = (uid, diaryId) => {
    database.ref().child('diary/' + uid + "/" + diaryId).remove();
 };

//글목록
const fetchDiaries = (uid) =>{
    if(!uid) {
        return;
    }
    const diariesDB = database.ref().child('diary/' + uid);
    diariesDB.on("value", snap=>{
        const diaries = snap.val();
        Object.keys(diaries).forEach(item=>{
            if(Object.keys(diaries[item]).filter(file=>{return file == 'filelist'}).length > 0){
                //diaries[item].thumnail = await
                let thumList =  new Promise((resolve, reject)=>{
                    let thumnail = imageDownload(uid, item, diaries[item]['filelist'][0]);
                    resolve(thumnail);
                })
                thumList.then(res=>{
                    console.log(res);
                })
            }
        });
        
       store.dispatch('get_diaries', snap.val());
    });
};

//한개의 글
const fetchDiary = (uid, diaryId) =>{
    if(!uid) {
        return;
    }
    const diariesDB = database.ref().child('diary/' + uid);
    const diaryDB = diariesDB.child(`${diaryId}`);
    diaryDB.on("value", snap=>{
        store.dispatch('get_diary', snap.val());
    });
};

//이미지 업로드
const imageUpload = (uid, diaryId, files) => {
    files.forEach((file)=>{
        var storageRef = storage.ref('uploads/'+ uid + '/' + diaryId + "/" + file.name);
        var taskImg = storageRef.put(file);
        
        taskImg.on("state_changed", (snap) => {
            //var percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            //console.log(percentage);
        },
        (err)=>{
            console.log(err);
        },
        () => {
            console.log("success");
        });
    }); 
}

//이미지 삭제
const imageDelete = (uid, diaryId, filename, formData) =>{
    let storageRef = storage.ref('uploads/'+ uid + "/" + diaryId + "/" + filename);
    storageRef.delete().then(function() {
        database.ref().child('diary/' + uid + "/" + diaryId).set(formData);
        fetchDiary(uid, diaryId);
        console.log("success");
    }).catch(function(error) {
        console.log(error.message)
    });
}

//이미지다운로드
const imageDownload = (uid, diaryId, files) =>{
    let storageRef = storage.ref('uploads/'+ uid + "/" + diaryId);
    if(typeof files === 'object') {
        let filelist = [];
        files.forEach(item=>{
            let storageChildRef = storageRef.child("/"+ item);
            storageChildRef.getDownloadURL().then(url=>{
                filelist.push(url);
            }).catch(err=>{
                console.log(err);
            })
        })
        return filelist;
    }else {
        let storageChildRef = storageRef.child("/"+ files);
        storageChildRef.getDownloadURL().then(url=>{
            return url;
        }).catch(err=>{
            console.log(err);
        })
    }    
}

export {    
    writeDiary,
    updateDiary,
    fetchDiaries,
    fetchDiary,
    deleteDiary,
    imageDelete,
    imageDownload
}