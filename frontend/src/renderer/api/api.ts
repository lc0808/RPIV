import axios, { AxiosError } from 'axios';

const setup = () => {
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Interceptador de erros.
   */
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 500) {
        console.log('Internal Server Error');
      }
      return Promise.reject(error);
    },
  );

  /**
   * Interceptar uma request para adicionar o token e a
   * linguagem no header da requisição.
   */
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export const api = setup();
