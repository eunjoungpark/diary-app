<template>
    <section class="login-container">
        <div class="login-bx">
            <h3>회원 가입</h3>
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
                <div class="input-bx">
                    <el-input placeholder="비밀번호 재입력" id="user-repassword" type="password" autocomplete="off" v-model="userRepasswd"></el-input><label class="skip" for="user-repassword">password</label>
                    <el-alert title="비밀번호가 동일하지 않습니다." type="error" v-if="!$v.userRepasswd.sameAsPassword"></el-alert>
                </div>
                <div class="btn-bx"><button type="button" class="btn-join" @click="userSignup()">Sign Up</button></div>
            </fieldset>
        </div>
    </section>
</template>
<script>
import {required, email, helpers, sameAs} from 'vuelidate/lib/validators'
const passwdRegex = (value) => /^[a-zA-Z]{6,12}.[!,@,#,$,%,^,&]{0,}.[0-9\d]{1,}$/.test(value);

export default {
    data(){
        return {
            userEmail : "",
            userPasswd : "",
            userRepasswd : "",
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
        },
        userRepasswd : {
            sameAsPassword: sameAs('userPasswd')
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
        userSignup (){
            if(this.$v.userEmail.required && this.$v.userEmail.email && this.$v.userPasswd.required && this.$v.userPasswd.passwdRegex && this.$v.userRepasswd.sameAsPassword){
                this.$store.dispatch('signup', {userEmail:this.userEmail, userPasswd:this.userPasswd, userRepasswd:this.userRepasswd});
                //console.log({userEmail:this.userEmail, userPasswd:this.userPasswd, userRepasswd:this.userRepasswd});
            }
        }
    }
}
</script>

<style>

</style>
