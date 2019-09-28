import axios from 'axios';

export const config = {
  baseURL: process.env.VUE_APP_API_URL,
};

const http = axios.create(config);

export default http;