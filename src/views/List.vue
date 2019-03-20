<template>
  <section class="contents-wrap list-wrap">
    <h3 class="skip">목록</h3>
    <!--// no data -->
    
    <!--// list -->
    <div class="list-bx" v-loading="loading" element-loading-text="Loading..."  element-loading-spinner="el-icon-loading">
        <ul v-if="diaries != null">
          <li v-for = "(diary, key, index) in diaries" :key="index" :id="key" class="list-cell clear">
            <p class="list-img">
              <template v-if="diary.filelist.length != 0"><img :src="diary.filelist[0].url" :alt="'이미지' + index" /></template> 
              <template v-else><span class="no-img">no image</span></template>
            </p>
            <div class="list-cont">
              <dl>
                <dt class="tit"><a href="#" @click="toView(key)">{{diary.title}}</a></dt>
                <dd class="txt">{{diary.desc}}</dd>
                <dd class="date">{{diary.evtDate}}</dd>
              </dl>
              <div class="list-func">
                <router-link :to="'/modify/'+ key" class="btn-ico"><icon name="pen" scale="0.8" /> <span class="skip">수정</span></router-link>
                <a href="#" @click="deleteDiary(key, diary.filelist)" class="btn-ico"><icon name="trash-alt" scale="0.8" /> <span class="skip">삭제</span></a>
              </div>
            </div>
          </li>
        </ul>
        <div class="no-data" v-else>
          <button type="button" @click="toWrite()">NO DATA<br><br><icon name="plus" scale="2.5" /></button>
        </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return {
      loading: false,
      fileLen : 0,
      diaryData : null,
    }
  },
  created (){
    this.$store.dispatch('fetch_diaries');
  },
  computed : {
    diaries (){
      this.loading = true;
      if(this.$store.getters.diaries != null){
        this.loading = false;
        return this.$store.getters.diaries;
      }
      this.loading = false;
    }
  },
  methods:{
    toWrite(){
      if(this.$store.getters.user != null){
        this.$router.push('/write');
      }else{
        this.$message({
            message : '로그인 해주세요.',
            type : 'error',
            duration : 1000,
            onClose : this.$router.push('/login')
        });
      }
    },
    toView(diaryId){
      this.$store.dispatch('get_diary', this.$store.getters.user[diaryId]);
      this.$router.push('/view/' + diaryId);
    },
    deleteDiary(diaryId, filelist){
      this.$message({
          message : '삭제되었습니다.',
          type : 'error',
          duration : 1000,
          onClose : this.$store.dispatch('delete_diary', {diaryId, filelist})
      });
    }
  }
}
</script>
