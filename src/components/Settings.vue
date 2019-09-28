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

export default {
  name: 'Settings',
  components: {
    Followings,
    Notifications,
  },
  data() {
      return {
        activeName: 'followings'
      };
    },
    methods: {
    }
}
</script>

<style scoped>
.tabs {
  width: 100%;
}
</style>
