import axios from 'axios';
import { refreshToken } from '../features/auth/api/auth';
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const axiosDefault = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
})


instance.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem('note-app:token');

    const token = JSON.parse(tokenString ?? '');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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

    console.log(originalRequest, "origin")
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data: token } = await refreshToken();
        localStorage.setItem('note-app:token', JSON.stringify(token));
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return instance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
export default instance;
