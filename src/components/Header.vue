<template>
  <header id="header" class="clear">
    <h1 class="logo"><router-link to="/" extact><img src="../assets/logo.png" alt="" />'s Diary</router-link></h1>
    <appSearch></appSearch>
    <div class="top-menu">
      <ul>
        <router-link tag="li" to="/login" v-if="!user"><a>Login</a></router-link>
        <template v-else>
          <li>{{user}}</li>
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
  }
}
</script>

<style>

</style>
