import axios from 'axios';

export const config = {
  baseURL: process.env.VUE_APP_API_URL,
};

export function setAuthHeader(token) {
  http.defaults.headers.common.Authorization = token;
}

const http = axios.create(config);

export default http;