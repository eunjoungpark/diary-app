<template>
    <section class="login-container">
        <div class="login-bx">
            <h3>회원 탈퇴</h3>
            <form @submit.prevent="auth">
                <fieldset>
                    <legend>회원탈퇴</legend>
                    <div class="input-bx">
                        <el-input placeholder="이메일 주소입력" id="user-email" v-model="userEmail" @input="checkEmail()"></el-input><label class="skip" for="user-email">email</label>
                        <el-alert title="필수입력 항목입니다." type="warning" v-if="!emailRequire"></el-alert>
                        <el-alert title="메일 형식이 아닙니다." type="error" v-if="!$v.userEmail.email"></el-alert>
                    </div>                
                    <div class="input-bx">
                        <el-input placeholder="비밀번호 입력" id="user-password" type="password" autocomplete="off" v-model="userPasswd" @input="checkPasswd()"></el-input><label class="skip" for="user-password">password</label>
                        <el-alert title="필수입력 항목입니다." type="warning" v-if="!passwordRequire"></el-alert>
                        <el-alert title="비밀번호는 6자 이상의 대소문자(특수문자 !@#$%^ 허용)와 2자이상의 숫자로 입력해주세요." type="error" v-if="!passwdRegexBool"></el-alert>
                    </div>
                    <div class="btn-bx"><button type="submit" class="btn-login">Authentication</button></div>
                    <div class="btn-bx"><button type="button" class="btn-google" @click="googleLeave()"><icon name="brands/google"></icon>Log in width Google</button></div>
                    <div class="btn-bx"><button type="button" class="btn-facebook" @click="facebookLeave()"><icon name="brands/facebook"></icon>Log in width Facebook</button></div>
                </fieldset>
            </form>
        </div>
    </section>
</template>
<script>
import {required, email, helpers} from 'vuelidate/lib/validators'
const passwdRegex = (value) => /^[a-zA-Z]{6,}.[!,@,#,$,%,^,&]{0,}.[0-9\d]{1,}$/.test(value);

export default {
    data(){
        return {
            userEmail : "",
            userPasswd : "",
            emailRequire : true,
            passwordRequire : true,
            passwdRegexBool : true
        }
    },
    validations : {
        userEmail : {
            required,
            email
        },
        userPasswd : {
            required,
            passwdRegex
        }
    },
    methods : {
        checkEmail (){
            //메일주소 필수항목
            if(!this.$v.userEmail.required) {
                this.emailRequire = false
            }else {
                this.emailRequire = true
            }
        },
        checkPasswd (){
            //비밀번호 필수항목
            if(!this.$v.userPasswd.required) {
                this.passwordRequire = false
            }else {
                this.passwordRequire = true
            }

            //비밀번호 유효성
            if(!this.$v.userPasswd.passwdRegex) {
                this.passwdRegexBool = false
            }else {
                this.passwdRegexBool = true
            }
        },
        auth (e){
            e.preventDefault();
            if(this.$v.userEmail.required && this.$v.userEmail.email && this.$v.userPasswd.required && this.$v.userPasswd.passwdRegex){
                this.$store.dispatch('leave', {userEmail:this.userEmail, userPasswd:this.userPasswd});
            }
        },
        googleLeave(){
            this.$store.dispatch('googleLeave');
        },
        facebookLeave(){
            this.$store.dispatch('facebookLeave');
        }
    }
}
</script>

<style>

</style>
