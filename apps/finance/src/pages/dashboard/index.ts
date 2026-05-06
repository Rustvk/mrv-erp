import { lazy } from 'react';
// Экспортируем страницу асинхронно, чтобы Webpack разбил код на чанки
export const DashboardPage = lazy(() => import('./ui/DashboardPage'));
