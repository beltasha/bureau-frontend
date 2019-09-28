<template>
  <el-tabs v-model="activeName" class="tabs">
    <el-tab-pane label="Подписки" name="followings">
      <Followings/>
    </el-tab-pane>
    <el-tab-pane label="Уведомления" name="notifications">
      Уведомления
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Followings from './Followings';
export default {
  name: 'Settings',
  components: {
    Followings,
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
