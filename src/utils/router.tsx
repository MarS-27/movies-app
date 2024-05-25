import { createBrowserRouter } from 'react-router-dom';
import { ErrorElement } from '../ErrorElement';
import Home from '../pages/Home';
import { Suspense, lazy } from 'react';
import { LinearProgress } from '@mui/material';
import Movie from '../pages/Movie';
import { AppEntrypoint } from '../components/AppEntrypoint.tsx';

const Movies = lazy(() => import('../pages/Movies.tsx'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppEntrypoint />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'movies',
        element: (
          <Suspense
            fallback={<LinearProgress color="secondary" sx={{ mt: 1 }} />}
          >
            <Movies />
          </Suspense>
        ),
      },
      {
        path: 'movie/:movieId',
        element: <Movie />,
      },
    ],
  },
]);
