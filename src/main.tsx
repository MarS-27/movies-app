import { StrictMode, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import Home from './pages/Home.tsx';
import { LinearProgress } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store/store.ts';

const Movies = lazy(() => import('./pages/Movies.tsx'));

function AppEntrypoint() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppEntrypoint />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'movies',
        element: (
          <Suspense fallback={<LinearProgress sx={{ mt: 1 }} />}>
            <Movies />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
