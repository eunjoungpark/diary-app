<template>
    <section class="login-container">
        <div class="login-bx">
            <fieldset>
                <legend>로그인 입력폼</legend>
                <div class="input-bx"><el-input placeholder="Email Address" id="user-email" v-model="email" @input="userLogin()"></el-input><label class="skip" for="user-email">email</label></div>
                <el-alert title="필수입력 항목입니다." type="warning" v-if="!emailRequire"></el-alert>
                <el-alert title="메일 형식이 아닙니다." type="error" v-if="!$v.email.email"></el-alert>
                <div class="input-bx"><el-input placeholder="Password" id="user-password" v-model="password"></el-input><label class="skip" for="user-password">password</label></div>
                <el-alert title="메일 형식이 아닙니다." type="error" v-if="!$v.email.email"></el-alert>
                <div class="btn-bx"><button type="button" class="btn-login" @click="userLogin()">Login</button></div>
                <div class="btn-bx"><button type="button" class="btn-google"><icon name="brands/google"></icon>Log in width Google</button></div>
                <div class="btn-bx"><button type="button" class="btn-facebook"><icon name="brands/facebook"></icon>Log in width Facebook</button></div>
                <div class="btn-bx"><button type="button" class="btn-join">Sign Up</button></div>

                {{$v.password}}
            </fieldset>
        </div>
    </section>
</template>
<script>
//import firebaseDB from '../api/firebase'
import {required, email, alphaNum, minLength} from 'vuelidate/lib/validators'
export default {
    data(){
        return {
            email : "",
            password : "",
            joinRoot : "signup",
            status : false,
            emailRequire : true
            
        }
    },
    validations : {
        email : {
            required,
            email
        },
        password : {
            required,
            alphaNum,
            minLength : minLength(6)
        }
    },
    methods : {
        userLogin (){
            if(!this.$v.email.required) {
                this.emailRequire = false
            }else {
                this.emailRequire = true
            }
            //this.$store.dispatch("login", this.userData);
        }
    }
}
</script>

<style>

</style>
