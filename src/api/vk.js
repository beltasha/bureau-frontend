import http from '../http';

export default {
  getVkUser() {
    const accessToken = localStorage.getItem('token');
    return http.get(`https://api.vk.com/method/account.getProfileInfo?access_token=${accessToken}&v=V`);
  }
}