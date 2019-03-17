<template>
    <div>
        <!-- <el-upload
            class="upload-demo" :on-change="handleChange" :file-list="filelist">
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
        </el-upload> -->
        <!-- <el-upload class="upload-demo" action="http://diary-user.appspot.com" :on-change="handleChange">
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
        </el-upload> -->
        <input type="file" id="fileIpt" @change="uploadImages"><br />
        <ul>
            <li v-for="(file,index) in fileList" :key="index" >{{file}} <button type="button" @click="deleteImg(file)">X</button></li>
        </ul>
        <div>
            {{state}}
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            uid : 'qjpG0wRbWdQDan1U7w3YN9SldTm2',
            fileList : [],
            state : 0
        }
    },
    methods:{
        uploadImages(e){
            let file = e.target.files[0];
            if(this.fileList.length < 5){
               this.fileList.push(file.name);
               this.upload(file); 
            }else {
                console.log("최대 5장까지 업로드 가능");
            }
            // this.uploadList.push(file);
        },
        upload(file){
            var storage = firebase.storage();
            var storageRef = storage.ref('uploads/'+ this.uid);
            var storageChildRef = storageRef.child(file.name);
            var taskImg = storageChildRef.put(file);
            taskImg.on("state_changed", function prograss(snap) {
                var percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                this.state = percentage;
            },
            function error(err){
                
            },
            function complete(){
                taskImg.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                });
            });
        },
        deleteImg (filename){
            var storage = firebase.storage();
            var storageRef = storage.ref('uploads/'+ this.uid + '/' + filename);
            // Delete the file
            storageRef.delete().then(function() {
                console.log("success");
            }).catch(function(error) {
                console.log(error.message)
            });
        },
        handleChange(e) {
            // 

           
        //     var _file = file;
        //     var uploadTask = storageRef.child('uploads/' + _file.name).put(_file, metadata);
        //    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        //     function(snapshot) {
        //         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         console.log('Upload is ' + progress + '% done');
        //         switch (snapshot.state) {
        //         case firebase.storage.TaskState.PAUSED: // or 'paused'
        //             console.log('Upload is paused');
        //             break;
        //         case firebase.storage.TaskState.RUNNING: // or 'running'
        //             console.log('Upload is running');
        //             break;
        //         }
        //     }, function(error) {

        //         switch (error.code) {
        //             case 'storage/unauthorized':
        //             break;

        //             case 'storage/canceled':
        //             break;

        //             case 'storage/unknown':
        //             break;
        //         }
        //     }, function() {
        //         uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        //             console.log('File available at', downloadURL);
        //         });
        //     });
        }
    }
}
</script>

<style>

</style>
