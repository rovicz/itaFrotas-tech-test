import { createBrowserRouter } from 'react-router';

import { Home } from '../pages/home';
import { Auth } from '../pages/auth';
import { AuthProvider } from '../providers/AuthProvider';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Auth />
      </AuthProvider>
    ),
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
    element: (
      <AuthProvider>
        <Home />
      </AuthProvider>
    ),
    errorElement: <h1>404</h1>,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
]);
