import { AxiosError, type Axios } from 'axios';
import { type RegisterFormInput } from '@/features/auth/schema/authSchema';
import { jwtDecode } from 'jwt-decode';

import axios from './axios';

type ApiResponseType = {
  data: any | null;
  errMsg: string | null;
};
interface ApiErrorResponse {
  message: string;
}
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ApiResponseType> => {
  try {
    const response = await axios.post('/auth/login', { email, password });
    return { data: response, errMsg: null };
  } catch (err) {
    const axiosError = err as AxiosError<ApiErrorResponse>;
    console.log(axiosError, 'this is the error');
    const errMsg =
      axiosError.response?.data?.message ?? 'An unexpected error occurred.';
    return { data: null, errMsg };
  }
};

export const refreshToken = async (): Promise<ApiResponseType> => {
  try {
    const response = await axios.post('/auth/login/refresh-token');
 
    return { data: response.data.access_token, errMsg: null };
  } catch (err) {
    const axiosError = err as AxiosError<ApiErrorResponse>;
    const errMsg =
      axiosError.response?.data?.message ?? 'An unexpected error occurred.';
    return { data: null, errMsg };
  }
};

export const signup = async ({
  email,
  password,
  username,
  phone_number,
}: RegisterFormInput): Promise<ApiResponseType> => {
  try {
    const response = await axios.post('/auth/signup', {
      email,
      password,
      username,
      phone_number,
    });
    return { data: response, errMsg: null };
  } catch (err) {
    const axiosError = err as AxiosError<ApiErrorResponse>;
    const errMsg =
      axiosError.response?.data?.message ?? 'An unexpected error occurred.';
    return { data: null, errMsg };
  }
};
