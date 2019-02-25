<template>
  <div class="login">
    <div class="login_container">
      <div class="login_title">登录系统</div>
      <el-input v-model="user" placeholder="请输入账号"></el-input>
      <el-input v-model="password" placeholder="请输入密码"></el-input>
      <el-button type="primary" @click="handleLogin">登录</el-button>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style lang="sass" src="./style.sass" scoped></style>
