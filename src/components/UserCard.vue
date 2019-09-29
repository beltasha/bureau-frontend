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
        {{name}}
        <!-- <div>{{name}}</div> -->
        <!-- <a
            v-for="accountUrl of accountUrls"
            :key="accountUrl"
            :href="accountUrl" 
            class="account-url"
        >
          {{accountUrl}}
        </a> -->
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
    <img
        class="avatar"
        width="16" 
        src="VK_Blue_Logo_transparent.png"
    />
    <img
        class="avatar"
        width="16" 
        src="f_logo_RGB-Grey_58.png"
    />
    <img
        class="avatar"
        width="16" 
        src="237-2378905_ig-png-logo-svg-transparent-instagram-logo-png.png"
    />
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
      type: Number | String,
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
  align-items: center;
  flex: 1;
}

.user-card .user-card-button {
  display: none;
  padding: 0 
}

.user-card:hover .user-card-button {
  display: block;
  margin-right: 10px;
}
</style>
