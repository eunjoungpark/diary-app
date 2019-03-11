<template>
  <div id="app">
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
  
}
</script>