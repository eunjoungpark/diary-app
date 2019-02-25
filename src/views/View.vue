<template>
    <section class="contents-wrap view-wrap">
        <h3 class="skip">상세</h3>
        <div class="view-bx">
            <div class="view-head">
                <p class="tit">양재꽃시장 다녀온날 양재꽃시장 다녀온날양재꽃시장 다녀온날 양재꽃시장 다녀온날양재꽃시장 다녀온날 양재꽃시장 다녀온날</p>
                <div class="status clear">
                    <p class="emotion">
                        <icon name="angry" scale="1.3" class="emotion-color01" />
                        <icon name="sad-cry" scale="1.3" class="emotion-color01" />
                        <icon name="frown" scale="1.3" class="emotion-color01" />
                        <icon name="grin-beam" scale="1.3" class="emotion-color01" />
                        <icon name="surprise" scale="1.3" class="emotion-color01" />
                        <icon name="smile" scale="1.3" class="emotion-color01" />
                    </p>
                    <p class="weather">
                        <icon name="cloud" scale="1.3" class="weather-color03" />
                        <icon name="cloud-showers-heavy" scale="1.3" class="weather-color03" />
                        <icon name="sun" scale="1.3" class="weather-color02" />
                        <icon name="snowflake" scale="1.3" class="weather-color01" />
                        <icon name="wind" scale="1.3" class="weather-color04" />
                    </p>
                    <p class="date">2019.02.20 14:25</p>
                    <div class="view-func">
                        <button type="button" class="btn-ico"><icon name="pen" scale="0.8" /> <span class="skip">수정</span></button>
                        <button type="button" class="btn-ico"><icon name="trash-alt" scale="0.8" /> <span class="skip">삭제</span></button>
                    </div>
                </div>
            </div>
            <div class="view-cont">
                <!--// 사진첩 -->
                <el-carousel :interval="4000" type="card" class="carousel">
                    <el-carousel-item v-for="item in 1" :key="item">
                        <div><img src="data:image/jpeg;base64,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" /> 
                        <strong class="skip">{{ item }}</strong></div>
                    </el-carousel-item>
                </el-carousel>
                <!-- 사진첩 //-->
                <!--// 작성글 -->
                <div class="text">
                    오늘 양재꽃시장을 다녀왔다. 너무 이뻐서 모두 사고싶었지만, 다음을 기약하며 오늘은 이 아이만 데려왔다.<br />
                    오늘 양재꽃시장을 다녀왔다. 너무 이뻐서 모두 사고싶었지만, 다음을 기약하며 오늘은 이 아이만 데려왔다.<br />
                    오늘 양재꽃시장을 다녀왔다. 너무 이뻐서 모두 사고싶었지만, 다음을 기약하며 오늘은 이 아이만 데려왔다.<br />
                    오늘 양재꽃시장을 다녀왔다. 너무 이뻐서 모두 사고싶었지만, 다음을 기약하며 오늘은 이 아이만 데려왔다.<br />
                    오늘 양재꽃시장을 다녀왔다. 너무 이뻐서 모두 사고싶었지만, 다음을 기약하며 오늘은 이 아이만 데려왔다.<br />
                    오늘 양재꽃시장을 다녀왔다. 너무 이뻐서 모두 사고싶었지만, 다음을 기약하며 오늘은 이 아이만 데려왔다.<br />
                </div>
                <!-- 작성글 //-->
                <!--// 지도 -->
                <div class="map">
                    <google-map :center="center" :zoom="15">
                        <google-marker v-for="(m,idx) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position" :key="idx"></google-marker>
                    </google-map>
                </div>
                <!-- 지도 //-->
            </div>
        </div>
    </section>
</template>

<script>
import {Map, Marker} from 'vue2-google-maps'
export default {
    data (){
        return {
            center: {
            lat: 37.5001823,
            lng: 127.0078127
            },
            markers: [{
                position: {
                    lat: 10.0,
                    lng: 10.0
                }
                }, {
                position: {
                    lat: 37.5001823,
                    lng: 127.0078127
                }
            }]
        }
    },
    components : {
        'google-map' : Map,
        'google-marker' : Marker
    }
}
</script>

<style>

</style>
