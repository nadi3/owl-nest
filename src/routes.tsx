import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import PublicServices from '@/pages/PublicServices.tsx';
import Portfolio from '@/pages/Portfolio';
import UselessIndex from '@/pages/UselessIndex.tsx';
import PrivateIndex from '@/pages/PrivateIndex.tsx';
import Credits from '@/pages/Credits.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import UselessLayout from '@/layouts/UselessLayout.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'useless',
        element: <UselessLayout />,
        children: [
          { index: true, element: <UselessIndex /> },
          // { path: 'gravity', element: <GravityPage /> },
        ],
      },
      {
        path: 'services',
        element: <PublicServices />,
      },
      {
        path: 'portfolio',
        element: <Portfolio />,
      },
      {
        path: 'private',
        element: <PrivateIndex />,
      },
      {
        path: 'credits',
        element: <Credits />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage code="404" />,
  },
]);
