<template>
    <section class="contents-wrap write-wrap">
        <h3 class="skip">작성</h3>
        <div class="write-bx">
            <el-form ref="form" :model="form">
                <el-form-item label="제목">
                    <el-input v-model="form.title" @blur="$v.$touch()"></el-input>
                    <el-alert title="필수 입력 항목입니다." type="error" v-if="$v.form.title.$error"></el-alert>
                    <el-alert title="100자 이하로 작성해주세요." type="error" v-if="!$v.form.title.maxLength"></el-alert>
                </el-form-item>
                <el-form-item label="내용">
                    <el-input type="textarea" v-model="form.desc" @blur="$v.$touch()"></el-input>
                    <el-alert title="필수 입력 항목입니다." type="error" v-if="$v.form.desc.$error"></el-alert>
                    <el-alert title="1000자 이하로 작성해주세요." type="error" v-if="!$v.form.desc.maxLength"></el-alert>
                </el-form-item>
                <el-form-item label="날짜">
                    <el-col :span="24">
                        <el-date-picker type="date" @blur="$v.$touch()" placeholder="날짜를 지정해주세요." v-model="form.evtDate" format="yyyy/MM/dd" value-format="yyyy/MM/dd" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-alert title="필수 입력 항목입니다." type="error" v-if="$v.form.evtDate.$error"></el-alert>
                </el-form-item>
                {{$v.form.evtDate}}
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
                        <el-radio label="sun" class="weather-color02"><icon name="sun" scale="1.3" /> <span class="label">맑음</span></el-radio>
                        <el-radio label="cloud" class="weather-color03"><icon name="cloud" scale="1.3" /> <span class="label">구름</span></el-radio>
                        <el-radio label="cloud-showers-heavy" class="weather-color03"><icon name="cloud-showers-heavy" scale="1.3" /> <span class="label">비</span></el-radio>
                        <el-radio label="snowflake" class="weather-color01"><icon name="snowflake" scale="1.3" /> <span class="label">눈</span></el-radio>
                        <el-radio label="wind" class="weather-color04"><icon name="wind" scale="1.3" /> <span class="label">바람</span></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="이미지">
                    <el-upload
                        class="upload-demo"
                        action=""
                        :on-change="handleChange"
                        :file-list="form.filelist">
                        <el-button size="small" type="primary">Click to upload</el-button>
                        <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="지도">
                    <div class="map">
                        <gmap-autocomplete placeholder="위치를 검색하세요" @place_changed="setPlace" class="el-input__inner"></gmap-autocomplete>
                        <Gmap-Map :zoom="16" :center="form.center" @click="clickMarker">
                            <Gmap-Marker :position="form.marker.position" :clickable="false" :draggable="false"></Gmap-Marker>
                        </Gmap-Map>
                    </div>
                </el-form-item>
            </el-form>
            <el-row class="btn-grp">
                <el-button type="primary" @click="submitData()">Save</el-button>
                <el-button type="info">Cancel</el-button>
            </el-row>
        </div>
    </section>
</template>

<script>
import {gmapApi} from 'vue2-google-maps'
import GmapMarker from 'vue2-google-maps/src/components/marker'
import {required, maxLength } from 'vuelidate/lib/validators'
import {writeDiary} from '../rest/database'
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
                        lat: 37.5001823,
                        lng: 127.0078127
                    }
                },
                filelist : []
            },
            place : null
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
    computed: {
        // google: gmapApi,
       
    },
    methods : {
        //image files
        handleChange(file, fileList) {
            this.filelist = fileList.slice(-3);
            
        },       
        //map
        setPlace(place) {
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
            this.form.marker.position.lat = _lat;
            this.form.marker.position.lng = _lng;
        },
        submitData(){
            let user = this.$store.getters.user;
            if(!user){
                return;
            }
            // if($v.form.title.required && $v.form.desc.required && $v.form.desc.evtDate){
                let diary = this.form;
                diary.writeDate = new Date();
                diary.writer = this.user;
                writeDiary(diary);
            // }
        }
    }
}
</script>

<style>

</style>