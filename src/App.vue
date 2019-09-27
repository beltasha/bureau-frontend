<template>
  <div id="app">
    <div class="nav-menu-container">
      <div style="display: flex">
        <i v-if="isCollapse" class="icon el-icon-d-arrow-right" @click="isCollapse = !isCollapse"></i>
        <i v-if="!isCollapse" class="icon el-icon-d-arrow-left" @click="isCollapse = !isCollapse"></i>
      </div>

      <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
        <router-link to="/feed">
          <el-menu-item index="1">
            <i class="el-icon-news"></i>
            <span slot="title">Лента</span>
          </el-menu-item>
        </router-link>
        <router-link to="/settings">
          <el-menu-item index="2">
            <i class="el-icon-setting"></i>
            <span slot="title">Настройки</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </div>
      
    <div class="content-container">
      <router-view></router-view>
    </div> 
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      isCollapse: true
    };
  },
}
</script>

<style>
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
</style>
