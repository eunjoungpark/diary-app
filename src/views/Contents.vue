<template>
    <section id="container">
        <Left></Left>
        <router-view></router-view>
    </section>
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
