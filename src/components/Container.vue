<template>
    <el-container>
        <Left></Left>
        <Contents></Contents>
    </el-container>
</template>

<script>
import Left from './Left.vue';
import Contents from './Contents.vue';
export default {
    components : {
        Left,
        Contents
    }
}
</script>

<style>

</style>
