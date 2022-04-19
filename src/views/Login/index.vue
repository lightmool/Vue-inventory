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

    <el-form-item prop="code" class="item-from">
      <label>验证码</label>
      <el-row :gutter="10">
        <el-col :span="15">
          <el-input v-model.number="ruleForm.code"></el-input>
        </el-col>
        <el-col :span="9">
          <el-button type="success" class="block">获取验证码</el-button>
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



<script  setup >
import { ref, reactive } from "vue";
import { toRaw } from '@vue/reactivity';
import {isEmail,isPassword}from "@/utils/validate"

    const menuTab =reactive([
        {text:"登录",current:true},
        {text:"注册",current:false}
      ])
function toggleMneu(data){
//点击按钮将两个按钮的current变为false
  toRaw(menuTab).forEach(element => {
    element.current=false
  });
//将点击的按钮 添加高光
 data.current=true
}
const ruleForm = reactive({
  userName: '',
  password: '',
  code: '',
})

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


}

</script>


<style lang="scss" scoped>
#login{
  //高度100%
  height: 100vh;
  //背景颜色
  background-color: #7dadda;
}
.login-wrap{
  width:330px;
  margin:auto;
}
//按钮
.menu-tab{
  text-align: center;
  li{
    display: inline-block;
    width:88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;//圆角
    cursor: pointer;//鼠标变成手势
  }
  .current{
    background-color: rgba(0,0,0,.1);//选中颜色
  }
}
//登陆表单class
.login-from{
    margin-top: 29px;
    label{
      display: block;
      margin-bottom: 3px;
      font-size: 14px;
      color:#fff
    }
    .item-from{
      margin-bottom: 13px;
    }
    .block{
      display: block;
      width: 100%;
    }
    .login-btn{margin-top: 19px;}
  }
</style>