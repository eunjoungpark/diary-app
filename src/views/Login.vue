<template>
    <section class="login-container">
        <div class="login-bx">
            <form @submit.prevent="userLogin()">
                <fieldset>
                    <legend>로그인 입력폼</legend>
                    <div class="input-bx">
                        <el-input placeholder="이메일 주소입력" id="user-email" v-model="userEmail" @input="checkEmail()"></el-input><label class="skip" for="user-email">email</label>
                        <el-alert title="필수입력 항목입니다." type="warning" v-if="!emailRequire"></el-alert>
                        <el-alert title="메일 형식이 아닙니다." type="error" v-if="!$v.userEmail.email"></el-alert>
                    </div>                
                    <div class="input-bx">
                        <el-input placeholder="비밀번호 입력" id="user-password" type="password" autocomplete="off" v-model="userPasswd" @input="checkPasswd()"></el-input><label class="skip" for="user-password">password</label>
                        <el-alert title="필수입력 항목입니다." type="warning" v-if="!passwordRequire"></el-alert>
                        <el-alert title="비밀번호는 6~12자 이상의 대소문자(특수문자 !@#$%^ 허용)와 2자이상의 숫자로 입력해주세요." type="error" v-if="!passwdRegexBool"></el-alert>
                    </div>
                    <div class="btn-bx"><button type="submit" class="btn-login" @click="userLogin()">Login</button></div>
                    <div class="btn-bx"><button type="button" class="btn-google" @click="googleLogin()"><icon name="brands/google"></icon>Log in width Google</button></div>
                    <div class="btn-bx"><button type="button" class="btn-facebook" @click="facebookLogin()"><icon name="brands/facebook"></icon>Log in width Facebook</button></div>
                    <div class="etc-bx"><router-link to="/signup">Sign Up →</router-link></div>
                </fieldset>
            </form>
        </div>
    </section>
</template>
<script>
//var re = /^[a-zA-Z0-9]{4,12}$/ // 아이디와 패스워드가 적합한지 검사할 정규식
//var re2 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
// if(!UserPassword.value.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~,-])|([!,@,#,$,%,^,&,*,?,_,~,-].*[a-zA-Z0-9])/)) {
//     alert("비밀번호는 영문(대소문자구분),숫자,특수문자(~!@#$%^&*()-_? 만 허용)를 혼용하여 8~16자를 입력해주세요.");
// return false;
// }
import {required, email, helpers} from 'vuelidate/lib/validators'
const passwdRegex = (value) => /^[a-zA-Z]{6,12}.[!,@,#,$,%,^,&]{0,}.[0-9\d]{1,}$/.test(value);

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
        userLogin (){
            if(this.$v.userEmail.required && this.$v.userEmail.email && this.$v.userPasswd.required && this.$v.userPasswd.passwdRegex){
                this.$store.dispatch('login', {userEmail:this.userEmail, userPasswd:this.userPasswd});
            }
        },
        googleLogin(){
            this.$store.dispatch('googleLogin');
        },
        facebookLogin(){
            this.$store.dispatch('facebookLogin');
        }
    }
}
</script>

<style>

</style>
