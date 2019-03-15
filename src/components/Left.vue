<template>
    <nav id="nav">
        <h2 class="skip">왼쪽 메뉴</h2>
        <ul>
            <router-link tag="li" class="nav-icon01" to="/login" v-if="user==null"><a><icon name="user-alt" scale="1.2" /> <span class="nav-label">Login</span></a></router-link>
            <li class="nav-icon02" v-else><a href="#" @click.prevent="toWrite()"><icon name="edit" scale="1.2" /> <span class="nav-label">Add Diary</span></a></li>
        </ul>        
    </nav>
</template>

<script>

export default {
    computed : {
        user(){
            if(this.$store.getters.user){
                return this.$store.getters.user;
            }
        }
    },
    methods : {
        toWrite(){
            if(this.$store.getters.user != null){
                this.$router.push('/write');
            }else{
                this.$message({
                    message : '로그인 해주세요.',
                    type : 'error',
                    duration : 1000,
                    onClose : this.$router.push('/login')
                });
            }
        }
    }
}
</script>

<style>

</style>
