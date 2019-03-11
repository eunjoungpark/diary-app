<template>
  <header id="header" class="clear">
    <h1 class="logo"><router-link to="/" extact><img src="../assets/logo.png" alt="" /><sup>'s</sup> Diary</router-link></h1>
    <appSearch></appSearch>
    <div class="top-menu">
      <ul>
        <router-link tag="li" to="/login" v-if="!user"><a>Login</a></router-link>
        <template v-else>
          <router-link tag="li" to="/mypage"><a>{{user}}</a></router-link>
          <li><a @click="logout()">logout</a></li>
        </template>
      </ul>
    </div>
  </header>
</template>

<script>
import Search from './Search.vue';
export default {
  data(){
    return {
     
    }
  },
  components : {
    appSearch : Search
  },
  computed : {
    user(){
      return this.$store.getters.user;
    }
  },
  methods : {
    logout(){
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style>

</style>
