<template>
  <div id="app">
    <el-conainer>
      <Header></Header>
      <el-container>
        <Container></Container>
      </el-container>
    </el-conainer>
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