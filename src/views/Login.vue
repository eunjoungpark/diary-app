<template>
    <section class="login-container">
        <div class="login-bx">
            <fieldset>
                <legend>로그인 입력폼</legend>
                <div class="input-bx"><el-input placeholder="Email Address" id="user-email" v-model="input"></el-input><label class="skip" for="user-email">email</label></div>
                <div class="input-bx"><el-input placeholder="Password" id="user-password" v-model="input"></el-input><label class="skip" for="user-password">password</label></div>
                <div class="btn-bx"><button type="button" class="btn-login">Login</button></div>
                <div class="btn-bx"><button type="button" class="btn-google"><icon name="brands/google"></icon>Log in width Google</button></div>
                <div class="btn-bx"><button type="button" class="btn-facebook"><icon name="brands/facebook"></icon>Log in width Facebook</button></div>
                <div class="btn-bx"><button type="button" class="btn-join">Sign Up</button></div>
            </fieldset>
        </div>
    </section>
</template>
<script>

export default {
    
}
</script>

<style>

</style>
