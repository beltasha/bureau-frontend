<template>
  <el-card class="user-card">
    <div class="user-info-container">
      <el-avatar
        v-if="avatarUrl"
        class="avatar"
        size="small" 
        :src="avatarUrl"
      />
      <el-avatar
        v-if="!avatarUrl"
        class="avatar"
        size="small" 
        icon="el-icon-user-solid"
      />
      <div class="user-info">
        <div>{{name}}</div>
        <a
            v-for="accountUrl of accountUrls"
            :key="accountUrl"
            :href="accountUrl" 
            class="account-url"
        >
          {{accountUrl}}
        </a>
      </div>
    </div>
    <el-button 
      v-if="canRemove"
      type="text"
      class="user-card-button"
      @click="$emit('remove')"
    >
      Удалить
    </el-button>
    <el-button 
      v-if="canAdd"
      type="text"
      class="user-card-button"
      @click="$emit('add')"
    >
      Добавить
    </el-button>
  </el-card>
</template>

<script>

export default {
  props: {
    avatarUrl: {
      type: String,
      default: '',
    },
    accountUrls: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    sosialNetworkType: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      required: true,
    },
    canRemove: Boolean,
    canAdd: Boolean,
  },
}
</script>

<style>
.user-card {
  margin-bottom: 10px;
  
}

.user-card .el-card__body {
  display: flex;
  align-items: center;
  padding: 10px;
}

.avatar {
  margin-right: 10px;
}

a.account-url {
  color: #66b1ff;
  font-size: x-small;
}

.user-card .user-info {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.user-info-container {
  display: flex;
  flex: 1;
}

.user-card .user-card-button {
  display: none;
  padding: 0 
}

.user-card:hover .user-card-button {
  display: block;
}
</style>
