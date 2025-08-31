import { AxiosError, type Axios } from 'axios';
import { type RegisterFormInput } from '@/features/auth/schema/auth.schema';
import { jwtDecode } from 'jwt-decode';

import axios, { axiosDefault } from '../../../api/axios';

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

export const requestEmailVerificationLink = async (
  token: string
): Promise<ApiResponseType> => {
  try {
    const response = await axiosDefault.get(
      `${import.meta.env.VITE_API_BASE_URL}/auth/email/request_email_verification/${token}`
    );
    return { data: response.data?.message, errMsg: null };
  } catch (err) {
    const axiosError = err as AxiosError<ApiErrorResponse>;
    const errMsg =
      axiosError.response?.data?.message ?? 'An unexpected error occurred.';
    return { data: null, errMsg };
  }
};

export const forgotPassword = async ({ email }: { email: string }) => {
  try {
    const response = await axiosDefault.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`,
      { email }
    );
    return { data: response.data?.message, errMsg: null };
  } catch (err) {
    const axiosError = err as AxiosError<ApiErrorResponse>;
    const errMsg =
      axiosError.response?.data?.message ?? 'An unexpected error occurred.';
    return { data: null, errMsg };
  }
};
export const resetPassword = async ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => {
  try {
    const response = await axiosDefault.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`,
      {
        token,
        password,
      }
    );
    return { data: response.data?.message, errMsg: null };
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
