import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import PublicTools from '@/pages/tools/PublicTools.tsx';
import Portfolio from '@/pages/portfolio/Portfolio.tsx';
import UselessIndex from '@/pages/useless/UselessIndex.tsx';
import PrivateIndex from '@/pages/private/PrivateIndex.tsx';
import Credits from '@/pages/Credits.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import UselessLayout from '@/layouts/UselessLayout.tsx';
import FleeingButtonPage from '@/pages/useless/FleeingButtonPage.tsx';
import WheelOfDestiny from '@/pages/tools/WheelOfDestiny.tsx';

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
          { path: 'fleeing', element: <FleeingButtonPage /> },
        ],
      },
      {
        path: '/tools',
        children: [
          { index: true, element: <PublicTools /> },
          { path: 'wheel', element: <WheelOfDestiny /> },
        ],
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
