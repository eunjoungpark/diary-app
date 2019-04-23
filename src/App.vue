<template>
  <div id="app">
    <div class="portfolio">
      Source : <a href="https://bitbucket.org/zzangsuni/diary-app/src" target="_blank">https://bitbucket.org/zzangsuni/diary-app/src</a>
    </div>
    <section id="wrapper">
      <Header></Header>
      <Container></Container>
    </section>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Container from './components/Container.vue';

export default {
  name: 'app',
  components: {
    Header,
    Container
  },
  created (){
    this.$store.dispatch('get_user');
  }
}
</script>