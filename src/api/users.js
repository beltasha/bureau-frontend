import http from '../http';
import { setAuthHeader } from '../http';

const savedUsersMock = [
  {
    id: 23232323,
    name: "Егор Крид",
    accountUrl: 'https://vk.com/kreed58',
    photoUrl: 'https://sun9-68.userapi.com/c852236/v852236506/171f26/C7oO3gSGnn8.jpg?ava=1',
    socialNetworkType: 'VK',
  },
  {
    id: 43434343,
    name: "Егор Крид",
    accountUrl: 'https://www.instagram.com/egorkreed',
    photoUrl: null,
    socialNetworkType: 'Instagram',
  },
  {
    id: 32707600,
    name: "Ольга Бузова",
    accountUrl: 'https://vk.com/olgabuzova',
    photoUrl: 'https://sun9-60.userapi.com/c850324/v850324431/1dffa8/EfHhV4TGJHc.jpg?ava=1',
    socialNetworkType: 'VK',
  },
];

const foundUsersMock = [
  {
    id: 32707600,
    name: "Ольга Бузова",
    accountUrl: 'https://vk.com/olgabuzova',
    photoUrl: 'https://sun9-60.userapi.com/c850324/v850324431/1dffa8/EfHhV4TGJHc.jpg?ava=1',
    socialNetworkType: 'VK',
  },
  {
    id: 12121212,
    name: "Ольга Бузова",
    accountUrl: 'https://www.instagram.com/buzova8',
    photoUrl: 'https://sun9-60.userapi.com/c850324/v850324431/1dffa8/EfHhV4TGJHc.jpg?ava=1',
    socialNetworkType: 'Instagram',
  }
];

const hasSubstring = (stringRaw, substringRaw) => {
  if (!substringRaw) {
    return true;
  }
  const string = stringRaw.toString().trim().toLowerCase();
  const substring = substringRaw.toString().trim().toLowerCase();
  return string.includes(substring);
} 

export default {
  fetchSavedUsers(search='') {
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({data: savedUsersMock});
    //   }, 1000);
    // })
    return http.get('users/saved')
      .then(({data: users}) => {
        const filteredUsers = users.filter(user => hasSubstring(user.name, search));
        return {data: filteredUsers}
      });
  },
  fetchThirdPartyUsers(search='') {
    if (!search) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({data: []});
        }, 1000);
      });
    }

    return http.post('users/search', { text: search, token: localStorage.getItem('token') });
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({data: foundUsersMock});
    //   }, 1000);
    // });
  },
  fetchAllUsers(search='') {
    return Promise.all([this.fetchSavedUsers(search), this.fetchThirdPartyUsers(search)])
      .then(([responce1, responce2]) => {
        const savedUsers = responce1.data;
        const thirdPartyUsers = responce2.data;

        if (!search) {
          return {
            savedUsers,
            thirdPartyUsers,
          }
        }
        
        const filteredThirdPartyUsers = [];
        const filteredSavedUsers = [];

        thirdPartyUsers.forEach((thirdPartyUser) => {
          const savedUser = savedUsers
            .find(savedUserItem => savedUserItem.id === thirdPartyUser.id);
          if (savedUser) {
            filteredSavedUsers.push(savedUser);
          } else {
            filteredThirdPartyUsers.push(thirdPartyUser);
          }
        });

        return {
          savedUsers: filteredSavedUsers,
          thirdPartyUsers: filteredThirdPartyUsers,
        }
      });
  },
  addUser(user) {
    return http.post('users/save', {user, token: localStorage.getItem('token')});
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({data: user});
    //   }, 1000);
    // });
  },
  removeUser(userId) {
    return http.remove('users', {userId, token: localStorage.getItem('token')});
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(userId);
    //   }, 1000);
    // });
  },
  login({code, clientId, redirectId}) {
    return http.post('user/addupdatevkuser', {code, clientId, redirectId})
      .then(({data}) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
      });
  },
  updatePhone(phone) {
    return http.post('user/updatephone', { phone, userId: localStorage.getItem('userId') })
      .then(() => {
        console.log('success');
      });
  },
  fetchPosts() {
    return http.post('user/get-posts', {token});
  }
  // register(email, password) {
  //   return http.post('user/registration', {email, password})
  //     .then((token) => {
  //       setAuthHeader(token);
  //     });
  //   // return new Promise((resolve) => {
  //   //   setTimeout(() => {
  //   //     resolve();
  //   //   }, 1000);
  //   // });
  // },
}