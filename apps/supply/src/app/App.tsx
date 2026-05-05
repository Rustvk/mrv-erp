import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './store/store';
import { appRouter } from './router/appRouter';

export const App = () => {
  return (
    <Provider store={store}>
      {/* RouterProvider берет на себя рендеринг Layout и страниц */}
      <RouterProvider router={appRouter} />
    </Provider>
  );
};
