/**
 * @file routes.tsx
 * @description This file defines the routing structure for the entire application
 * using `react-router-dom`.
 */

import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import PublicTools from '@/pages/tools/PublicTools.tsx';
import Portfolio from '@/pages/portfolio/Portfolio.tsx';
import Credits from '@/pages/Credits.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import WheelOfDestiny from '@/pages/tools/WheelOfDestiny.tsx';
import AudioVisualizer from '@/pages/tools/AudioVisualizer.tsx';
import { AnonymizerPage } from '@/pages/tools/AnonymizerPage.tsx';
import UselessPage from '@/pages/useless/UselessPage.tsx';
import { PrivatePage } from '@/pages/private/PrivatePage.tsx';

/**
 * The main router configuration for the application.
 *
 * This configuration uses `createBrowserRouter` to define all the available routes,
 * their corresponding components, and their nested structures.
 *
 * The top-level route uses `MainLayout` to provide a consistent structure for all
 * primary pages. It includes nested routes for the homepage, tools, portfolio, etc.
 *
 * A wildcard route (`*`) is defined at the end to catch any undefined paths and
 * display a `404` error page.
 *
 * @constant
 */
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
          { path: 'anonymizer', element: <AnonymizerPage /> },
        ],
      },
      {
        path: 'portfolio',
        element: <Portfolio />,
      },
      {
        path: 'private',
        element: <PrivatePage />,
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
