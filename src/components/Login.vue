<template>
  <div style="height:100%; width:100%" v-loading="true">
  </div>
</template>

<script>
import userApi from '../api/users';

export default { 
  mounted() {
    const code = this.$route.query.code;
    localStorage.setItem('token', code);
    // const hashParams = this.$route.hash.split('&');
    // if (!hashParams[0]) {
    //   return;
    // }
    // const accessToken = hashParams[0].split('=')[1];
    // const expiresIn = hashParams[1].split('=')[1];
    // const userId = hashParams[2].split('=')[1];
    // localStorage.setItem('token', accessToken);
    debugger
    userApi.login({code, clientId: process.env.VUE_APP_VK_APP_ID, redirectId: process.env.VUE_APP_VK_REDIRECT_URL})
      .then(() => {
        this.$router.push('/settings');
      });
  }
}
</script>

<style scoped>
</style>
