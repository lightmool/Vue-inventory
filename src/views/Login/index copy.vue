<template>
  <div id="login">
    <!-- 内容主体区域 -->
  <div class="login-wrap">
    <!-- 登录注册按钮 -->
    <ul class="menu-tab" >
        <li v-for="(item) in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMneu(item)"> {{item.text}}</li>
    </ul>
    <!-- 登录表单 -->
     <el-form :ref="ruleForm" :model="ruleForm" status-icon :rules="rules" class="login-from" size="medium">
    
    
    <el-form-item prop="userName" class="item-from">
      <label>用户名</label>
      <el-input v-model="ruleForm.userName" type="text" autocomplete="off" />
    </el-form-item>
    
    <el-form-item prop="password" class="item-from">
      <label>密码</label>
      <el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
    </el-form-item>

    <el-form-item prop="code">
      <label>验证码</label>
      <el-row  :gutter="20">
        <el-col :span="15">
          <el-input v-model.number="ruleForm.code"></el-input>
        </el-col>
        <el-col :span="9" > 
          <el-button type="success" class="block" @click="getSms">获取验证码</el-button>
        </el-col>
      </el-row>
      </el-form-item>
    <el-form-item >
    <el-button type="danger" @click="submitForm(ruleFormRef)" class="login-btn block" >提交</el-button>
    </el-form-item>
  </el-form>
  </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { toRaw } from '@vue/reactivity';
    const name=("Login");
    const captchaUrl="";
    const loginForm=reactive({
                username:"admin",
                password:"123456",
                code:""
            });
    const  loading=ref(false);
    const  checked=ref(true);
const rules = reactive({
  userName: [{ validator: validatePass, trigger: 'blur' }],
  password: [{ validator: validatePass2, trigger: 'blur' }],
  code: [{ validator: checkAge, trigger: 'blur' }],
})
function checkAge (rules, value, callback){
    if(value===""){
      callback(new Error("验证码不能为空"))
    }else {
       callback()
    }
}

function validatePass (rules, value, callback) {
    if(value===""){
      callback(new Error("用户名不能为空"))
    }else {
      callback()
    }
}

function validatePass2 (rules, value, callback) {
    if(value===""){
      callback(new Error("密码不能为空"))
    }else if(!isPassword(value)){
      callback(new Error("至少8-16个字符，至少1个大写字母，1个小写字母和1个数字"))
    }else{
      callback()
    }
  return{
    name
  }

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