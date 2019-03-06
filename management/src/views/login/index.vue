<template>
  <div class="login">
    <div class="login_container">
      <div class="login_title">{{isLogin ? '登录' : '注册'}}</div>
      <el-input v-model="user" placeholder="请输入账号"></el-input>
      <el-input type="password" show-password v-model="password" placeholder="请输入密码"></el-input>
      <el-input type="password" show-password v-if="!isLogin" v-model="repassword" placeholder="请再次输入密码"></el-input>
      <el-button class="login-btn" type="primary" @click="handleClick">{{isLogin ? '登录' : '注册'}}</el-button>
      <el-button v-if="isLogin" class="register-btn" type="text" @click="handleRegister">{{isLogin ? '没有账号？去注册' : '已有账号？去登陆'}}</el-button>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style lang="sass" src="./style.sass" scoped></style>
