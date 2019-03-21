import './apikey';
import store from '../store'
const database = firebase.database();
const storage = firebase.storage();

//write a diary
const writeDiary = (uid, files, formData) => {
    let diaryId = {};
    diaryId = database.ref().child('diary').push().key;
    const imageUrl = async() => {
        formData.filelist = await imageUpload(uid, diaryId, files);   
        database.ref().child('diary/' + uid + "/" + diaryId).set(formData);
    }
    imageUrl();
};

//modify a diary
const updateDiary = (uid, diaryId, files, formData) => {
    const imageUrl = async() => {
        formData.filelist = [...formData.filelist, ...await imageUpload(uid, diaryId, files)];
        database.ref().child('diary/' + uid + "/" + diaryId).set(formData);
    }
    imageUrl();
};

//delete a diary
const deleteDiary = (uid, diaryId, filelist) => {
    database.ref().child('diary/' + uid + "/" + diaryId).remove();
    let storageRef = storage.ref('uploads/'+ uid + "/" + diaryId);
    if(filelist.length != 0){
        filelist.forEach(item=>{
            let storageChildRef = storageRef.child(item.name);
            storageChildRef.delete();
            
        })
    }
 };

//get diaries
const fetchDiaries = (uid) =>{
    if(!uid) {
        return;
    }
    const diariesDB = database.ref().child('diary/' + uid);
    diariesDB.on("value", snap=>{      
        store.dispatch('get_diaries', snap.val());
    });
};

//get a diary
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

//upload image
const imageUpload = (uid, diaryId, files) => {
    return new Promise(resovle=>{
        var storageRef = storage.ref('uploads/'+ uid + '/' + diaryId);
        const fn = (file) => {
            return new Promise(resolve=>{
                let filename = file.name;
                let storageChildRef = storageRef.child(filename);
                var taskImg = storageChildRef.put(file);
                const successFunc = async()=>{
                    let url = await uploadSuccess(taskImg, storageChildRef);
                    resolve({name:filename, url:url});
                }
                successFunc();
            });
        }
    
        let all = files.map(fn);
        let result = Promise.all(all);
        return result.then(filelist=>{
            resovle(filelist);
        });
    });
}

//return images in success
const uploadSuccess = (taskImg, storageChildRef) =>{
    return new Promise(resolve=>{
        taskImg.on("state_changed", (snap) => {
            //var percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        },
        (err)=>{
            console.log(err);
        },
        async() => {
           let url =  await downloadImage(storageChildRef);
           resolve(url);
        });
    })
}

// return download images url
const downloadImage = (storageChildRef) =>{
    return new Promise(resolve=>{
        return storageChildRef.getDownloadURL().then(url=>{
            resolve(url);
        }).catch(err=>{
            console.log(err);
        })
    })
}

//remove image
const imageDelete = (uid, diaryId, filename, formData) =>{
    let storageRef = storage.ref('uploads/'+ uid + "/" + diaryId + "/" + filename);
    storageRef.delete().then(function() {
        database.ref().child('diary/' + uid + "/" + diaryId).set(formData);
        fetchDiary(uid, diaryId);
    }).catch(function(error) {
        console.log(error.message)
    });
}


export {    
    writeDiary,
    updateDiary,
    fetchDiaries,
    fetchDiary,
    deleteDiary,
    imageDelete,
}