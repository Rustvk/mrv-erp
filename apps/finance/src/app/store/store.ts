import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@mrv-erp/api';

export const store = configureStore({
  reducer: {
    // Подключаем редьюсер нашего базового API
    [baseApi.reducerPath]: baseApi.reducer,

    // Сюда позже добавим локальные слайсы приложения (например, UI-состояние supply)
    // supplyUi: supplyUiReducer,
  },
  // Обязательное добавление middleware от RTK Query для кэширования и запросов
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

// Выводим типы для TypeScript (чтобы useSelector и useDispatch знали о структуре нашего Store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
