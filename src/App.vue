<template>
  <div id="app">
    <p>
    <router-link to="/feed">Лента</router-link>
    <router-link to="/settings">Настройки</router-link>
  </p>

  <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
