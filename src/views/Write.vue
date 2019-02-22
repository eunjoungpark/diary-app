<template>
    <section class="contents-wrap write-wrap">
        <h3 class="skip">작성</h3>
        <div class="write-bx">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="제목">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="내용">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="날짜">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="날짜를 지정해주세요." v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker type="fixed-time" placeholder="시간을 지정해주세요." v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="기분" prop="emotion">
                    <el-radio-group v-model="form.emotion">
                        <el-radio label="화남"><icon name="angry" scale="1.3" /></el-radio>
                        <el-radio label="눈물"><icon name="sad-cry" scale="1.3" /></el-radio>
                        <el-radio label="짜증"><icon name="frown" scale="1.3" /></el-radio>
                        <el-radio label="기쁨"><icon name="grin-beam" scale="1.3" /></el-radio>
                        <el-radio label="놀람"><icon name="surprise" scale="1.3" /></el-radio>
                        <el-radio label="평범"><icon name="smile" scale="1.3" /></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="날씨" prop="emotion">
                    <el-radio-group v-model="form.emotion">
                        <el-radio label="맑음"><icon name="sun" scale="1.3" class="weather-color02" /></el-radio>
                        <el-radio label="구름"><icon name="cloud" scale="1.3" class="weather-color03" /></el-radio>
                        <el-radio label="비"><icon name="cloud-showers-heavy" class="weather-color03" scale="1.3" /></el-radio>
                        <el-radio label="눈"><icon name="snowflake" scale="1.3" class="weather-color01" /></el-radio>
                        <el-radio label="바람"><icon name="wind" scale="1.3" class="weather-color04" /></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button>Cancel</el-button>
                </el-form-item>
            </el-form>
            <gmap-autocomplete placeholder="This is a placeholder text" @place_changed="setPlace"></gmap-autocomplete>
        <!-- <button @click="usePlace">Add</button> -->
        <!-- <GmapMap :center="center" :zoom="15" map-type-id="terrain" style="width: 500px; height: 300px">
            <gmap-marker v-for="m in markers" :position="{lat: m.position[0], lng: m.position[1]}" :key="m.position[0]+m.position[1]" :clickable="true" :draggable="true" @click="center = m.position" @mouseover="statusText = m.text" @mouseout="statusText = null"></gmap-marker>
        </GmapMap> -->
         <!--  -->

        <Gmap-Map style="width: 600px; height: 300px;" :zoom="15" :center="center" @click="mapClick()">
            <Gmap-Marker v-for="(marker, index) in markers"
                :key="index"
                :position="marker.position"
                @click="findPlace()"
                :clickable="true"
                :draggable="true"
                ></Gmap-Marker>
        </Gmap-Map>
            <!-- <Gmap-Marker
                @click="center=markers.position"
                v-if="this.place"
                label="&#x2605;"
                
                :position="{
                    lat: this.place.geometry.location.lat(),
                    lng: this.place.geometry.location.lng(),
                }"
                ></Gmap-Marker> -->
        </div>
    </section>
</template>

<script>
import {gmapApi} from 'vue2-google-maps'
import GmapMarker from 'vue2-google-maps/src/components/marker'
export default {
    data(){
        return {
            form : {
                title : "",
                desc: "",
                region : "",
                date1 : "",
                date2 : "",
                emotion : ""
            },
            center : {lat: 0, lng: 0},
            markers: [],
            place : null
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
        }
    }
}
</script>

<style>

</style>
