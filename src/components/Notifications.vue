<template>
  <el-form class="notifications-form" label-position="top">
    <el-form-item label="Почта">
      <el-input class="notifications-input" v-model="email" @input="isDirty = true"></el-input>
    </el-form-item>
    <el-form-item label="Частота уведомлений">  
      <el-radio-group v-model="frequence" :disabled="!email" @change="isDirty = true">
        <el-radio label="Мгновенно"></el-radio>
        <el-radio label="Раз в день"></el-radio>
        <el-radio label="Раз в сутки"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item class="form-button">
      <el-button type="primary" v-if="isDirty && email" @click="onSubmit">Сохранить</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      frequence: 'Мгновенно',
      isDirty: false,
    }
  },
  methods: {
    onSubmit() {
      // TODO save settings;
      this.isDirty = false;
      this.$message({
        message: 'Настройки уведомлений успешно сохранены',
        type: 'success'
      });
    }
  }
}
</script>

<style scoped>
  .notifications-form {
    width: 100%;
    max-width: 700px;
  }
  .notifications-form .notifications-input {
    max-width: 350px;
  }
</style>
