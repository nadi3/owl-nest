import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import PublicTools from '@/pages/tools/PublicTools.tsx';
import Portfolio from '@/pages/portfolio/Portfolio.tsx';
import PrivateIndex from '@/pages/private/PrivateIndex.tsx';
import Credits from '@/pages/Credits.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import WheelOfDestiny from '@/pages/tools/WheelOfDestiny.tsx';
import AudioVisualizer from '@/pages/tools/AudioVisualizer.tsx';
import { AnonymizerLayout } from '@/layouts/AnonymizerLayout.tsx';
import { AnonymizerPage } from '@/pages/tools/AnonymizerPage.tsx';
import UselessPage from '@/pages/useless/UselessPage.tsx';

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
        element: <UselessPage />,
      },
      {
        path: '/tools',
        children: [
          { index: true, element: <PublicTools /> },
          { path: 'wheel', element: <WheelOfDestiny /> },
          { path: 'visualizer', element: <AudioVisualizer /> },
          {
            path: 'anonymizer',
            element: <AnonymizerLayout />,
            children: [
              {
                index: true,
                element: <AnonymizerPage />,
              },
            ],
          },
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
