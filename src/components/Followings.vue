<template>
  <main>
    <article>
      <section class="section-search" >
        <el-input
          v-model="searchText"
          class="search-input"
          placeholder="Введите имя"
          prefix-icon="el-icon-search"
          clearable
          @input="debounceInput"
        />
        <div v-loading="isLoading" class="spinner-class">
          <UserCard
            v-for="user of thirdPartyUsers"
            :key=user.id
            :avatar-url=user.photoUrl
            :name=user.firstName
            :last-name=user.lastName
            :id=user.id
            :account-urls=[user.accountUrl]
            :social-network-type=user.socialNetworkType
            @add="add(user)"
            can-add
          />
          <el-divider v-if="savedUsers.length && thirdPartyUsers.length"></el-divider>
          <UserCard
            v-for="user of savedUsers"
            :key=user.id
            :avatar-url=user.photoUrl
            :name=user.firstName
            :last-name=user.lastName
            :id=user.id
            :account-urls=[user.accountUrl]
            :social-network-type=user.socialNetworkType
            @remove="remove(user)"
            can-remove
          />
        </div>
      </section>
      
    </article>
  </main>
</template>

<script>
import debounce from 'lodash.debounce';
import UserCard from './UserCard';
import userApi from '../api/users';

export default {
  components: {
    UserCard,
  },
  data() {
    return { 
      searchText: '',
      thirdPartyUsers: [],
      savedUsers: [],
      isLoadingThirdPartyUsers: false,
      isLoadingSavedUsers: false,
    }
  },
  computed: {
    isLoading() {
      return this.isLoadingThirdPartyUsers || this.isLoadingSavedUsers;
    }
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

    this.isLoadingThirdPartyUsers = true;
    this.isLoadingSavedUsers = true;

    userApi.fetchAllUsers(this.searchText)
      .then(({savedUsers, thirdPartyUsers}) => {
          this.savedUsers = savedUsers;
          this.thirdPartyUsers = thirdPartyUsers;
        })
      .finally(() => {
        this.isLoadingThirdPartyUsers = false;
        this.isLoadingSavedUsers = false;
      });
  },
  methods: {
    debounceInput: debounce(function(search) {
      this.isLoadingThirdPartyUsers = true;
      this.isLoadingSavedUsers = true;

      userApi.fetchAllUsers(search)
        .then(({savedUsers, thirdPartyUsers}) => {
          this.savedUsers = savedUsers;
          this.thirdPartyUsers = thirdPartyUsers;
        })
        .finally(() => {
          this.isLoadingThirdPartyUsers = false;
          this.isLoadingSavedUsers = false;
        });
    }, 500),
    add(userToAdd) {
      this.isLoadingThirdPartyUsers = true;
      this.isLoadingSavedUsers = true;
      return userApi.addUser(userToAdd)
        .then(({data}) => data)
        .then(() => userApi.fetchAllUsers(this.searchText))
        .then(({savedUsers, thirdPartyUsers}) => {
          this.savedUsers = savedUsers;
          this.thirdPartyUsers = thirdPartyUsers;
        })
        .finally(() => {
          this.isLoadingThirdPartyUsers = false;
          this.isLoadingSavedUsers = false;
        });
    },
    remove(userToRemove) {
      this.isLoadingThirdPartyUsers = true;
      this.isLoadingSavedUsers = true;
      return userApi.removeUser(userToRemove.id)
        .then(({data}) => data)
        .then(() => userApi.fetchAllUsers(this.searchText))
        .then(({savedUsers, thirdPartyUsers}) => {
          this.savedUsers = savedUsers;
          this.thirdPartyUsers = thirdPartyUsers;
        })
        .finally(() => {
          this.isLoadingThirdPartyUsers = false;
          this.isLoadingSavedUsers = false;
        });
    },
  }
}
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
}

article {
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
}

section {
  display: flex;
  margin: 8px 0;
}

.section-search {
  flex-direction: column;
  justify-content: center;
}

.search-input {
  margin-bottom: 10px;
}

.spinner-class {
  display: flex;
  flex-direction: column;
}
</style>
