<template>
  <div id="app">
    <div class="nav-menu-container">
      <div style="display: flex">
        <i v-if="isCollapse" class="icon el-icon-d-arrow-right" @click="isCollapse = !isCollapse"></i>
        <i v-if="!isCollapse" class="icon el-icon-d-arrow-left" @click="isCollapse = !isCollapse"></i>
      </div>

      <el-menu
        class="el-menu-vertical-demo" 
        :collapse="isCollapse"
        :default-active=activeIndex
      >
        <router-link to="/feed">
          <el-menu-item index="1">
            <i class="el-icon-news"></i>
            <span slot="title">Лента</span>
          </el-menu-item>
        </router-link>
        <router-link v-if="isLoggedIn" to="/settings">
          <el-menu-item index="2">
            <i class="el-icon-setting"></i>
            <span slot="title">Настройки</span>
          </el-menu-item>
        </router-link>
        <el-menu-item v-if="!isLoggedIn" index="3" @click="login">
          <i class="el-icon-right"></i>
          <span slot="title">Войти (VK)</span>
        </el-menu-item>
        <el-menu-item  v-if="isLoggedIn" index="4" @click="logout">
          <i class="el-icon-back"></i>
          <span slot="title">Выйти</span>
        </el-menu-item>
      </el-menu>
    </div>
    
    <!-- <el-dialog
      :title="loginDialogTitle"
      :visible.sync="dialog"
      class="login-dialog"
    >
      <div v-if="hasAccount">
        <div>
          Авторизируйтесь с помощью электронной почты, чтобы следить за любимыми знаменитостями
          Нет аккаунта? <el-button type="text" @click="hasAccount = false">Зарегистрироваться!</el-button>
        </div>
        <el-form class="login-form" label-width="100px">
          <el-form-item label="Email">
            <el-input v-model="email"></el-input>
          </el-form-item>
          <el-form-item label="Пароль">
            <el-input type="password" v-model="password"></el-input>
          </el-form-item>
          <el-form-item class="form-button">
            <el-button type="primary" @click="login">Сохранить</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <el-button type="text" @click="hasAccount = true">Уже есть аккаунт</el-button>
        <el-form :model="{email, password, password2}" ref="ruleForm" label-width="140px" class="login-form">
          <el-form-item label="Email" prop="email">
            <el-input v-model="email"></el-input>
          </el-form-item>
          <el-form-item label="Пароль"  prop="password">
            <el-input type="password" v-model="password"></el-input>
          </el-form-item>
          <el-form-item label="Повторите пароль" prop="password2">
            <el-input type="password" v-model="password2"></el-input>
          </el-form-item>
          <el-form-item class="form-button">
            <el-button type="primary" @click="register">Сохранить</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog> -->

    <div class="content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import usersApi from './api/users';
import { injectVKOpenApi, initVK } from "./vkInit";

export default {
  name: 'app',
  data() {
    return {
      isCollapse: true,
      activeTab: "1",
      dialog: false,
      email: '',
      password: '',
      password2: '',
      isLoggedIn: localStorage.getItem('token'),
      hasAccount: true,
    };
  },
  computed: {
    activeIndex() {
      return this.$route.path === 'feed' ? '1' : '2';
    },
    loginDialogTitle() {
      return this.hasAccount ? 'Войти с помощью email' : 'Регистрация';
    },
    // isLoggedIn() {
    //   return localStorage.getItem('token');
    // }
  },
  methods: {
    login() {
      window.location.href = `https://oauth.vk.com/authorize?client_id=${process.env.VUE_APP_VK_APP_ID}&redirect_uri=${process.env.VUE_APP_VK_REDIRECT_URL}&scope=wall`
      // this.isLoggedIn = true;
      //   usersApi.login()
      //   .then(() => {
      //     localStorage.setItem('email', this.email);
      //     this.isLoggindIn = true;
      //   });
      
      // usersApi.login(this.email, this.password)
      //   .then(() => {
      //     localStorage.setItem('email', this.email);
      //     this.isLoggindIn = true;
      //   })
      //   .finally(() => {
      //     this.dialog = false;
      //   })
    },
    // register() {
    //   if (!this.email) {
    //     this.$message({
    //       message: 'Email обязателен',
    //       type: 'error'
    //     });
    //     return;
    //   }
    //   if (!this.password) {
    //     this.$message({
    //       message: 'Пароль обязателен',
    //       type: 'error'
    //     });
    //     return;
    //   }
    //   if (this.password !== this.password2) {
    //     this.$message({
    //       message: 'Пароли должны совпадать',
    //       type: 'error'
    //     });
    //     return;
    //   }
    //   usersApi.login(this.email, this.password)
    //     .then(() => {
    //       localStorage.setItem('email', this.email);
    //       // this.isLoggindIn = true;
    //     })
    //     .finally(() => {
    //       this.dialog = false;
    //     })
    // },
    logout() {
      localStorage.clear();
      this.isLoggedIn = false;
      if (this.$route.name !== "feed") {
        this.$router.push('feed');
      }
    }
  }
}
</script>

<style>
body {
  margin-right: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: row;
  height: calc(100vh - 20px);
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
}

.nav-menu-container {
  display: flex;
}

.content-container {
  display: flex;
  flex: 1;
  margin: 0 16px;
}

a {
  text-decoration: none;
}

.icon {
  cursor: pointer;
}

.login-form .el-form-item__label {
  text-align: left;
}

.login-dialog .el-dialog__header {
  padding-bottom: 0;
}
</style>
