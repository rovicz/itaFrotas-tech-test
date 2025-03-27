import { createBrowserRouter } from 'react-router';

import { Home } from '../pages/home';
import { Auth } from '../pages/auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: '/',
        element: <Auth />,
      },
    ],
  },
  {
    path: '/home',
    element: <Home />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
]);
