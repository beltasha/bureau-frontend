<template>
  <el-tabs v-model="activeName" class="tabs">
    <el-tab-pane label="Подписки" name="followings">
      Подписки
    </el-tab-pane>
    <el-tab-pane label="Уведомления" name="notifications">
      Уведомления
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'Settings',
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
