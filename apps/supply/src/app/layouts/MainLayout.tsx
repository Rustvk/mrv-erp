import { Outlet, Link } from 'react-router-dom';
import { APP_ROUTES } from '@/shared/constants/routes';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-brand-50 flex">
      {/* Простой Sidebar (позже вынесем в widgets) */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-brand-500 mb-8">Supply Module</h1>
        <nav className="flex flex-col gap-2">
          <Link
            to={APP_ROUTES.DASHBOARD}
            className="text-brand-900 hover:text-brand-500 font-medium transition-colors"
          >
            Дашборд
          </Link>
          <Link
            to={APP_ROUTES.EXPENSES}
            className="text-brand-900 hover:text-brand-500 font-medium transition-colors"
          >
            Расходы
          </Link>
        </nav>
      </aside>

      {/* Основной контент */}
      <main className="flex-1 p-8">
        {/* Outlet — это "дырка", куда React Router вставит текущую страницу */}
        <Outlet />
      </main>
    </div>
  );
};
