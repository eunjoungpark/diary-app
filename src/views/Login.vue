<template>
    <div class="login-container">
        <div class="login-bx">
            <fieldset>
                <legend>로그인 입력폼</legend>
                <div class="input-bx"><el-input placeholder="Email Address" id="user-email" v-model="input"></el-input><label class="skip" for="user-email">email</label></div>
                <div class="input-bx"><el-input placeholder="Password" id="user-password" v-model="input"></el-input><label class="skip" for="user-password">password</label></div>
                <div class="btn-bx"><button type="button" class="btn-google"><icon name="brands/google"></icon>Log in width Google</button></div>
                <div class="btn-bx"><button type="button" class="btn-facebook"><icon name="brands/facebook"></icon>Log in width Facebook</button></div>
            </fieldset>
        </div>
    </div>
</template>
<script>
import Icon from 'vue-awesome/components/Icon'
export default {
    components : {
        Icon
    }
}
//emotion
//angry : 화남
//sad-cry : 슬픔
//frown : 우울
//grin-beam : 행복
//surprise : 놀람
//smile : 평범
</script>

<style>
.el-row {
    margin-bottom: 20px;
  }
    .el-row:last-child {margin-bottom: 0;}
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
