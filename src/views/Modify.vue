<template>
    <section class="contents-wrap write-wrap">
        <h3 class="skip">작성</h3>
        <div class="write-bx">
            <el-form v-if="diary != null">
                <el-form-item label="제목">
                    <el-input v-model="form.title"></el-input>
                    <el-alert title="필수 입력 항목입니다." type="error" v-if="$v.form.title.$error"></el-alert>
                    <el-alert title="100자 이하로 작성해주세요." type="error" v-if="!$v.form.title.maxLength"></el-alert>
                </el-form-item>
                <el-form-item label="내용">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                    <el-alert title="필수 입력 항목입니다." type="error" v-if="$v.form.desc.$error"></el-alert>
                    <el-alert title="1000자 이하로 작성해주세요." type="error" v-if="!$v.form.desc.maxLength"></el-alert>
                </el-form-item>
                <el-form-item label="날짜">
                    <el-col :span="24">
                        <el-date-picker type="date" placeholder="날짜를 지정해주세요." v-model="form.evtDate" format="yyyy/MM/dd" value-format="yyyy/MM/dd" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-alert title="필수 입력 항목입니다." type="error" v-if="$v.form.evtDate.$error"></el-alert>
                </el-form-item>
                <el-form-item label="기분" prop="emotion">
                    <el-radio-group v-model="form.emotion">
                        <el-radio label="angry" class="emotion-color01"><icon name="angry" scale="1.3" /> <span class="label">화남</span></el-radio>
                        <el-radio label="sad-cry" class="emotion-color01"><icon name="sad-cry" scale="1.3" /> <span class="label">슬픔</span></el-radio>
                        <el-radio label="frown" class="emotion-color01"><icon name="frown" scale="1.3" /> <span class="label">짜증</span></el-radio>
                        <el-radio label="grin-beam" class="emotion-color01"><icon name="grin-beam" scale="1.3" /> <span class="label">행복</span></el-radio>
                        <el-radio label="surprise" class="emotion-color01"><icon name="surprise" scale="1.3" /> <span class="label">놀람</span></el-radio>
                        <el-radio label="smile" class="emotion-color01"><icon name="smile" scale="1.3" /> <span class="label">평범</span></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="날씨" prop="weather" class="radio-weather">
                    <el-radio-group v-model="form.weather">
                        <el-radio label="sun" class="sun"><icon name="sun" scale="1.3" /> <span class="label">맑음</span></el-radio>
                        <el-radio label="cloud" class="cloud"><icon name="cloud" scale="1.3" /> <span class="label">구름</span></el-radio>
                        <el-radio label="cloud-showers-heavy" class="cloud-showers-heavy"><icon name="cloud-showers-heavy" scale="1.3" /> <span class="label">비</span></el-radio>
                        <el-radio label="snowflake" class="snowflake"><icon name="snowflake" scale="1.3" /> <span class="label">눈</span></el-radio>
                        <el-radio label="wind" class="wind"><icon name="wind" scale="1.3" /> <span class="label">바람</span></el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="el-form-item">
                    <label class="el-form-item__label">이미지</label>
                    <div class="el-form-item__content">
                        <div class="upload-demo">
                            <div tabindex="0" class="el-input">
                                <input type="file" name="이미지" class="el-input__inner" @change="uploadImage">
                            </div>
                            <div class="el-upload__tip">300kb이하의 gif/jpg/png 파일만 업로드 가능 (최대 5개)</div>
                            <el-alert title="이미지명이 중복됩니다." type="error" v-if="overlap"></el-alert>
                            <ul class="file-list">          
                                <li v-for="(file, index) in savelist" :key="index">{{file}}<button type="button" @click="deleteDirectImage(file, index)"><icon name="trash" scale="0.9" /></button></li>
                                <li v-for="(file, index) in form.filelist" :key="savelist.length + index">{{file}}<button type="button" @click="deleteImage(index)"><icon name="trash" scale="0.9" /></button></li>                               
                            </ul>
                        </div>
                    </div>
                </div>
                <el-form-item label="지도">
                    <div class="map">
                        <gmap-autocomplete placeholder="위치를 검색하세요" @place_changed="setPlace" class="el-input__inner"></gmap-autocomplete>
                        <el-alert title="자동완성 항목에서 선택해주세요." type="error" v-if="placeErr"></el-alert>
                        <Gmap-Map :zoom="16" :center="form.center" @click="clickMarker">
                            <Gmap-Marker :position="form.marker.position" :clickable="false" :draggable="false" ></Gmap-Marker>
                        </Gmap-Map>
                    </div>
                </el-form-item>
                <el-row class="btn-grp">
                    <el-button type="primary" @click="submitData">Save</el-button>
                    <el-button type="info">Cancel</el-button>
                </el-row>
            </el-form>
        </div>
    </section>
</template>

<script>
import {gmapApi} from 'vue2-google-maps'
import GmapMarker from 'vue2-google-maps/src/components/marker'
import {required, maxLength} from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            form : {
                title : "",
                desc: "",
                evtDate : "",
                emotion : "",
                weather : "",
                center : {lat: 37.5001823, lng: 127.0078127},
                marker: {
                    position: {
                        lat: 0,
                        lng: 0
                    }
                },
                filelist : [],
                writer : null
            },
            place : null,
            placeErr : false,
            fullPathFiles : [],
            overlap : false,
            savelist : []
        }
    },
    validations : {
        form : {
            title : {
                required,
                maxLength : maxLength(100)
            },
            desc : {
                required,
                maxLength : maxLength(1000)
            },
            evtDate : {
                required
            }
        }
    },
    components : {
        GmapMarker : GmapMarker
    },
    created (){
        this.$store.dispatch('fetch_diary', this.$route.params.id);
    },
    computed : {
        diary (){
            if(this.$store.getters.diary != null){
                this.form.title = this.$store.getters.diary.title;
                this.form.desc = this.$store.getters.diary.desc;
                this.form.evtDate = this.$store.getters.diary.evtDate;
                this.form.emotion = this.$store.getters.diary.emotion;
                this.form.weather = this.$store.getters.diary.weather;
                this.form.center = this.$store.getters.diary.center;
                this.form.marker = this.$store.getters.diary.marker;
                this.form.writer = this.$store.getters.diary.writer;

                let result = Object.keys(this.$store.getters.diary).filter(item => {return item == 'filelist'});
                if(result.length > 0){
                    this.savelist = this.$store.getters.diary.filelist;
                }
                return this.form;
            }
        }
    },
    methods : {
        deleteImage (idx){
            this.form.filelist.splice(idx,1);
            this.fullPathFiles.splice(idx,1);
        },
        deleteDirectImage (filename, idx){
             this.$confirm('저장되었던 이미지 삭제시 복원되지 않습니다. 삭제하시겠습니까?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
                beforeClose: (action, instance, done) => {
                    if(action === 'confirm'){
                        this.savelist.splice(idx, 1);
                        const diary = this.form;
                        diary.writeDate = new Date();
                        diary.filelist = [...this.savelist, ...this.form.filelist];
                        if(this.$store.getters.uid && this.$v.form.title.required && this.$v.form.desc.required && this.$v.form.evtDate.required){
                            this.$store.dispatch('delete_image', {diaryId : this.$route.params.id, filename, diary});
                        }
                        done();
                    }                    
                }
            }).then(() => {                
                this.$message({
                    type: 'success',
                    message: '삭제되었습니다.'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '취소하였습니다.'
                });
            });
        },
        //image files
        uploadImage(e){
            let file = e.target.files[0];
            let result = this.form.filelist.filter((item)=>{return item == file.name}).length + this.savelist.filter((item)=>{return item == file.name}).length;
            e.target.value = "";

            if(this.form.filelist.length >= 5){
                return;
            }
            
            if(result > 0) {
                this.overlap = true;
                return;
            }
            this.overlap = false;
            this.form.filelist.push(file.name);
            this.fullPathFiles.push(file);
        },
        //map
        setPlace(place) {
            let hasGeometry = Object.getOwnPropertyDescriptor(place, 'geometry');
            if(hasGeometry == null || hasGeometry == "undefined"){
                this.placeErr = true;
                return;
            }
            this.placeErr = false;
            this.place = place;
            this.usePlace();
        },
        usePlace() {
            if (this.place) {
                const _lat = this.place.geometry.location.lat();
                const _lng = this.place.geometry.location.lng();
                this.place = null;
                this.form.marker.position.lat = _lat;
                this.form.marker.position.lng = _lng;
                this.form.center.lat = _lat;
                this.form.center.lng = _lng;
            }
        },
        clickMarker(e){
            const _lat = e.latLng.lat();
            const _lng = e.latLng.lng();
            this.form.center.lat = _lat;
            this.form.center.lng = _lng;
            this.form.marker.position.lat = _lat;
            this.form.marker.position.lng = _lng;
        },
        submitData(e){
            this.$v.$touch();
            this.form.writer = this.$store.getters.user;
            e.preventDefault();

            if(!this.$store.getters.uid){
                return;
            }

            if(this.$v.form.title.required && this.$v.form.desc.required && this.$v.form.evtDate.required){
                const diary = this.form;
                diary.writeDate = new Date();
                this.$message({
                    message : '수정되었습니다.',
                    type : 'success',
                    center : true,
                    duration : 1000,
                    onClose : this.$store.dispatch('update_diary', {diaryId : this.$route.params.id, files : this.fullPathFiles, formData : diary})
                });
            }
        }
    }
}
</script>

<style>

</style>