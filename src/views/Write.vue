<template>
    <section class="contents-wrap write-wrap">
        <h3 class="skip">작성</h3>
        <div class="write-bx">
            <el-form ref="form" :model="form">
                <el-form-item label="제목">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="내용">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="날짜">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="날짜를 지정해주세요." v-model="form.date1" format="yyyy/MM/dd" value-format="yyyy/MM/dd" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker type="fixed-time" placeholder="시간을 지정해주세요." v-model="form.date2" format="hh:mm" value-format="hh:mm" style="width: 100%;"></el-time-picker>
                    </el-col>
                    {{$v.form.date1}}
                </el-form-item>
                <el-form-item label="기분" prop="emotion">
                    <el-radio-group v-model="form.emotion" class="radio-emotion">
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
                        ref="upload"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">select file</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">upload to server</el-button>
                        <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="지도">
                    <div class="map">
                        <gmap-autocomplete placeholder="위치를 검색하세요" @place_changed="setPlace" class="el-input__inner"></gmap-autocomplete>
                        <Gmap-Map :zoom="16" :center="center" @click="mapClick()">
                            <Gmap-Marker v-for="(marker, index) in markers"
                                :key="index"
                                :position="marker.position"
                                @click="findPlace()"
                                :clickable="true"
                                :draggable="true"
                                ></Gmap-Marker>
                        </Gmap-Map>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>

<script>
import {gmapApi} from 'vue2-google-maps'
import GmapMarker from 'vue2-google-maps/src/components/marker'
import {required, maxLength } from 'vuelidate/lib/validators'
const dateRegex = (value) => /^[0-9]{4}.[/]{1}.[0-9]{2}.[/]{1}.[0-9]{2}$/.test(value);
const timeRegex = (value) => /^[0-9]{2}.[:]{1}.[0-9]{2}$/.test(value);

export default {
    data(){
        return {
            form : {
                title : "",
                desc: "",
                date1 : "",
                date2 : "",
                emotion : "",
                weather : ""
            },
            center : {lat: 37.5001823, lng: 127.0078127},
            markers: [{
                position: {
                    lat: 37.5001823,
                    lng: 127.0078127
                }
            }],
            place : null,
            fileList2 : []
        }
    },
    validations : {
        form : {
            title : {
                required,
                maxLength : maxLength(50)
            },
            desc : {
                required,
                maxLength : maxLength(1000)
            },
            date1 : {
                required,
                dateRegex
            },
            date2 : {
                required,
                timeRegex
            }
        }
    },
    components : {
        GmapMarker : GmapMarker
    },
    computed: {
        google: gmapApi
    },
    methods : {
        setDescription(description) {
            this.description = description;
        },
        setPlace(place) {
            this.place = place;
            this.usePlace();
        },
        findPlace(){
            //center=marker.position
            console.log("aa");
        },
        mapClick(){
            console.log(this.place);
        },
        usePlace() {
            if (this.place) {
                const _lat = this.place.geometry.location.lat();
                const _lng = this.place.geometry.location.lng();
                this.markers.push({
                    position: {
                    lat: _lat,
                    lng: _lng,
                    }
                })
                this.center.lat = _lat;
                this.center.lng = _lng;
                this.place = null;
            }
        },
        submitUpload() {
            this.$refs.upload.submit();
        }
    }
}
</script>

<style>

</style>
