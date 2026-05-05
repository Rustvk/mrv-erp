import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Инициализируем ПУСТОЙ API.
// Мы не описываем здесь эндпоинты, чтобы не создавать огромный файл на 1000 строк.
export const baseApi = createApi({
  reducerPath: 'api', // Имя в Redux Store
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.my-enterprise.com/v1/', // Ваш корпоративный бэкенд
    prepareHeaders: (headers) => {
      // Здесь в будущем можно будет доставать токен из localStorage или Redux state
      // const token = localStorage.getItem('token');
      // if (token) { headers.set('authorization', `Bearer ${token}`); }
      return headers;
    },
  }),
  // Теги для инвалидации кэша (чтобы данные обновлялись после мутаций)
  tagTypes: ['ExpensePlan', 'User'],
  endpoints: () => ({}), // Эндпоинты пустые!
});
