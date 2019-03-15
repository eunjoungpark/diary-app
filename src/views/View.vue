<template>
    <section class="contents-wrap view-wrap">
        <h3 class="skip">상세</h3>
        <div class="view-bx" v-loading="loading" element-loading-text="Loading..."  element-loading-spinner="el-icon-loading">
            <template v-if="diary != null">
                <div class="view-head">
                    <p class="tit">{{diary.title}}</p>
                    <div class="status clear">
                        <p class="date">{{diary.evtDate}}</p>
                        <p class="emotion" v-if="diary.emotion !=''"><icon :name="diary.emotion" scale="1.3" class="emotion-color01" /></p>
                        <p class="weather" v-if="diary.weather !=''"><icon :name="diary.weather" scale="1.3" :class="diary.weather" /></p>
                        <div class="view-func">
                            <router-link :to="'/modify/'+$route.params.id" class="btn-ico"><icon name="pen" scale="0.8" /> <span class="skip">수정</span></router-link>
                            <a href="#" @click="deleteDiary()" class="btn-ico"><icon name="trash-alt" scale="0.8" /> <span class="skip">삭제</span></a>
                        </div>
                    </div>
                </div>
                <div class="view-cont">
                    <!--// 사진첩 -->
                    <el-carousel :interval="4000" type="card" class="carousel" v-if="diary.filelist != ''">
                        <el-carousel-item v-for="item in 1" :key="item">
                            <div><img src="" /> 
                            <strong class="skip">{{ item }}</strong></div>
                        </el-carousel-item>
                    </el-carousel>
                    <!-- 사진첩 //-->
                    <!--// 작성글 -->
                    <div class="text">{{diary.desc}}</div>
                    <!-- 작성글 //-->
                    <!--// 지도 -->
                    <div class="map" v-if="diary.marker.position.lat !=0 && diary.marker.position.lng !=0">
                        <google-map :center="diary.center" :zoom="16">
                            <google-marker :position="diary.marker.position" :clickable="false" :draggable="false"></google-marker>
                        </google-map>
                    </div>
                    <!-- 지도 //-->
                </div>
            </template>
        </div>
    </section>
</template>

<script>
import {Map, Marker} from 'vue2-google-maps'
export default {
    data(){
        return {
            loading : true
        }
    },
    components : {
        'google-map' : Map,
        'google-marker' : Marker
    },
    created (){
        this.$store.dispatch('fetch_diary', this.$route.params.id);
    },
    computed : {
        diary (){
            if(this.$store.getters.diary != null){
                this.loading = false;
                return this.$store.getters.diary;
            }
        }
    },
    methods : {
        deleteDiary(){
            this.$message({
                message : '삭제되었습니다.',
                type : 'error',
                duration : 1000,
                onClose : this.$store.dispatch('delete_diary', this.$route.params.id)
            });
        }
    }
}
</script>

<style>

</style>
