import { createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { APP_ROUTES } from '@/shared/constants/routes';
import { MainLayout } from '../layouts/MainLayout';
import { DashboardPage } from '@/pages/dashboard';
import { ExpensesPage } from '@/pages/expenses';

export const appRouter = createBrowserRouter([
  {
    // Корневой маршрут оборачивается в Layout
    element: <MainLayout />,
    children: [
      {
        path: APP_ROUTES.DASHBOARD,
        // Оборачиваем Lazy-страницы в Suspense для отображения лоадера во время подгрузки чанка
        element: (
          <Suspense fallback={<div className="p-4 text-gray-500">Загрузка дашборда...</div>}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.EXPENSES,
        element: (
          <Suspense fallback={<div className="p-4 text-gray-500">Загрузка расходов...</div>}>
            <ExpensesPage />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.NOT_FOUND,
        element: <div className="p-8 text-red-500 text-xl font-bold">Страница не найдена 404</div>,
      },
    ],
  },
]);
