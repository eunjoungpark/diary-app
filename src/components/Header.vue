<template>
  <header id="header" class="clear">
    <h1 class="logo"><router-link to="/" extact><img src="../assets/logo.png" alt="" /><sup>'s</sup> Diary</router-link></h1>
    <appSearch></appSearch>
    <div class="top-menu">
      <ul>
        <router-link tag="li" to="/login"><a>Login</a></router-link>
        <!-- <router-link tag="li" to="/mypage"><a>eunjoungpark</a></router-link> -->
      </ul>
    </div>
  </header>
</template>

<script>
import Search from './Search.vue';
export default {
  components : {
    appSearch : Search
  }
}
</script>

<style>

</style>
