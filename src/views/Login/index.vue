<template>
  <div>
      <el-form :rules="rules" 
                v-loading="loading"
                element-loading-text="正在登陆中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :model="loginForm"
               class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item prop="userName">
                <el-input type="text" auto-complete="false" v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>    
            <el-form-item prop="password">
                 <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width:250px;margin-right:5px"></el-input>    
            </el-form-item>
                <!-- 验证码地址 -->
                <img :src="captchaUrl">
                <el-checkbox class="loginRemember" v-model="checked">记住我</el-checkbox>
                <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>

      </el-form>
  </div>
</template>

<script setup>
import { ref,reactive } from "@vue/reactivity";
import {isPassword} from "@/utils/validate"
import {GetSms,Login} from "@/api/login"
import router from "@/router/index"
//登录表单基本参数
const captchaUrl=ref('');
const loginForm=ref({
            userName:"admin",
            password:"123456",
            code:""
});
//登录跳转默认为flase
const loading=ref(false);
//记住我 默认为true
const  checked=ref(true);
//验证参数
const rules = ref({
  userName: [{ validator: validatePass, trigger: 'blur' }],
  password: [{ validator: validatePass2, trigger: 'blur' }],
  code: [{ validator: checkAge, trigger: 'blur' }],
})

/**
 * 验证码判断函数
 */
function checkAge (rules, value, callback){
    if(value===""){
      callback(new Error("验证码不能为空"))
    }else {
       callback()
    }
}
/**
 * 用户名验证函数
 */
function validatePass (rules, value, callback) {
    
    if(value===""){
      callback(new Error("用户名不能为空"))
    }else {
      callback()
    }
}
/**
 * 密码验证函数
 */
function validatePass2 (rules, value, callback) {
    if(value===""){
      callback(new Error("密码不能为空"))
    }else if(!isPassword(value)){
      callback(new Error("至少8-16个字符，至少1个大写字母，1个小写字母和1个数字"))
    }else{
      callback()
    }


}
/**
 * 提交
 */
function submitLogin (){
  console.log(Login);
  Login(loginForm.value).then(resp=>{
    if(!resp){
      window.sessionStorage.setItem("tokenStr","3N3zVdHqr5A8TTes^2k96Y823%kk*NeXL^GGxgCz")
      router.replace("/home")
    }
  })
}

</script>

<style>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin:180px auto;
        width:350px;
        padding:15px 35px 15px 35px;
        background: #fff;
        border:1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .loginTitle{
        margin:0px auto 40px auto;
        text-align: center;
    }
    .loginRemember{
        text-align: left;
        margin: 0px 0px 15px;
    }
    .el-form-item__content{
        display: flex;
        align-items: center;
    }
</style>