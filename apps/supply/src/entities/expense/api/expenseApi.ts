import { baseApi } from '@mrv-erp/api';
import type { ExpensePlan } from '@mrv-erp/types';

// Используем injectEndpoints, чтобы "вживить" эндпоинты в базовый API
const expenseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Запрос на получение плана расходов
    getExpensePlanById: build.query<ExpensePlan, string>({
      query: (planId) => ({
        url: `/expenses/plans/${planId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'ExpensePlan', id }],
    }),

    // Мутация для создания нового плана (пример)
    createExpensePlan: build.mutation<ExpensePlan, Partial<ExpensePlan>>({
      query: (newPlan) => ({
        url: `/expenses/plans`,
        method: 'POST',
        body: newPlan,
      }),
      invalidatesTags: ['ExpensePlan'],
    }),
  }),
  // Эта настройка позволяет не перезаписывать эндпоинты, если они уже были внедрены
  overrideExisting: false,
});

// RTK Query автоматически сгенерирует хуки! Экспортируем их:
export const {
  useGetExpensePlanByIdQuery,
  useCreateExpensePlanMutation
} = expenseApi;
