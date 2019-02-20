<template>
  <div id="app">
    <el-container id="wrapper">
      <Header></Header>
      <Container></Container>
    </el-container>
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
  }
}
</script>