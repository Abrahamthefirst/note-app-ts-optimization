import axios from 'axios';
import { refreshToken } from './auth';
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem('note-app:token');

    const token = JSON.parse(tokenString ?? '');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(config.headers.Authorization, "request interceptor")
    }
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error, 'interceptor error', error.response, "ERror resposne");
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data: token } = await refreshToken();
        localStorage.setItem('note-app:token', JSON.stringify(token));
        originalRequest.headers.Authorization = `Bearer ${token}`;
        console.log(originalRequest.headers.Authorization, "Auth headers")
        return instance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
export default instance;
