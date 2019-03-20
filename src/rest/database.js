import './apikey';
import store from '../store'
const database = firebase.database();
const storage = firebase.storage();

//글작성
const writeDiary = (uid, files, formData) => {
    let diaryId = {};
    diaryId = database.ref().child('diary').push().key;
    const imageUrl = async() => {
        formData.filelist = await imageUpload(uid, diaryId, files);         
        database.ref().child('diary/' + uid + "/" + diaryId).set(formData);
    }
    imageUrl();
};

//글수정
const updateDiary = (uid, diaryId, files, formData) => {
    const imageUrl = async() => {
        formData.filelist = await imageUpload(uid, diaryId, files);         
        database.ref().child('diary/' + uid + "/" + diaryId).set(formData);
    }
    imageUrl();
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
        // Object.keys(diaries).forEach(item=>{
        //     diaries[item].thumnail = null;
        //     if(Object.keys(diaries[item]).filter(file=>{return file == 'filelist'}).length > 0){
        //         returnUrl(item).then(res=>{
        //             diaries[item].thumnail = res;
        //         }).catch(err=>{
        //             console.log("error");
        //         });                
        //     }
        // });
        
        // async function returnUrl(diaryId) {
        //     let storageRef = storage.ref('uploads/'+ uid + "/" + diaryId);
        //     let storageChildRef = storageRef.child("/"+ diaries[diaryId]['filelist'][0]);
        //     let result = await storageChildRef.getDownloadURL().then(url=>{
        //         return url;
        //     });
        //     return result;
        // };        
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
    return new Promise(resovle=>{
        let filelist = [];
        var storageRef = storage.ref('uploads/'+ uid + '/' + diaryId);
        const callTest = async () =>{
            filelist = await getFilelist(files, storageRef);
            resovle(filelist);
        };
        callTest();
    });
}
const getFilelist = (files, storageRef)=>{
    return new Promise(resolve=>{
        let filelist = [];
        let fileLen = files.length;
        const forEachFunc = async()=>{      
            await files.forEach(async(file, index)=>{
                let filename = file.name;
                let storageChildRef = storageRef.child(filename);
                var taskImg = storageChildRef.put(file);
                let url = await uploadSuccess(taskImg, storageChildRef);
                filelist.push({name:file.name, url:url});
                if(fileLen != (index + 1)) return;
                resolve(filelist);
            });           
        }
        forEachFunc();
    })
}

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

const downloadImage = (storageChildRef) =>{
    return new Promise(resolve=>{
        return storageChildRef.getDownloadURL().then(url=>{
            resolve(url);
        }).catch(err=>{
            console.log(err);
        })
    })
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
}

//이미지다운로드
const imagesDownload = (uid, files) =>{
    let filelist = [];
    const returnImages = async ()=>{
        await files.forEach(async(item, index)=>{
            let storageRef = storage.ref('uploads/'+ uid + "/" + item.diaryId);
            if(item.file != null) {
                let storageChildRef = storageRef.child("/"+ item.file);
                let url = await storageChildRef.getDownloadURL().then(url=>{
                    return url;
                });
                filelist[index] = url;
            }else {
                filelist[index] = null;
            }
        })
        store.commit('set_images', filelist);
    }
    returnImages();
}

export {    
    writeDiary,
    updateDiary,
    fetchDiaries,
    fetchDiary,
    deleteDiary,
    imageDelete,
    imageDownload,
    imagesDownload
}