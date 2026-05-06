export const APP_ROUTES = {
  DASHBOARD: '/',
  EXPENSES: '/expenses',
  EXPENSE_DETAILS: '/expenses/:id', // Динамический параметр
  NOT_FOUND: '*',
} as const;
