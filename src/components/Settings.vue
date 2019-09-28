<template>
  <el-tabs v-model="activeName" class="tabs">
    <el-tab-pane label="Подписки" name="followings">
      <Followings/>
    </el-tab-pane>
    <el-tab-pane label="Уведомления" name="notifications">
      <Notifications/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Followings from './Followings';
import Notifications from './Notifications';
import vkApi from '../api/vk';
import userApi from '../api/users';

export default {
  name: 'Settings',
  components: {
    Followings,
    Notifications,
  },
  data() {
      return {
        activeName: 'followings',
        phone: '',
      };
    },
  mounted() {
    const hashParams = this.$route.hash.split('&');
    if (!hashParams[0]) {
      return;
    }
    const accessToken = hashParams[0].split('=')[1];
    const expiresIn = hashParams[1].split('=')[1];
    const userId = hashParams[2].split('=')[1];
    localStorage.setItem('token', accessToken);

    this.$router.push('/settings');

    userApi.login(accessToken);
  }
}
</script>

<style scoped>
.tabs {
  width: 100%;
}
</style>
