<template>
    <el-container>
        <Left></Left>
        <router-view></router-view>
    </el-container>
</template>

<script>
import Left from '../components/Left.vue';
export default {
    components : {
        Left
    }
}
</script>

<style>

</style>
