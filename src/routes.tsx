/**
 * @file routes.tsx
 * @description This file defines the routing structure for the entire application
 * using `react-router-dom`.
 */

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ErrorPage from '@/pages/ErrorPage.tsx';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Home = lazy(() => import('@/pages/Home'));
const PublicTools = lazy(() => import('@/pages/tools/PublicTools.tsx'));
const Portfolio = lazy(() => import('@/pages/portfolio/Portfolio.tsx'));
const Credits = lazy(() => import('@/pages/Credits.tsx'));
const WheelOfDestiny = lazy(() => import('@/pages/tools/WheelOfDestiny.tsx'));
const AudioVisualizer = lazy(() => import('@/pages/tools/AudioVisualizer.tsx'));
const UselessPage = lazy(() => import('@/pages/useless/UselessPage.tsx'));

const AnonymizerPage = lazy(() =>
  import('@/pages/tools/AnonymizerPage.tsx').then((module) => ({ default: module.AnonymizerPage }))
);
const PrivatePage = lazy(() =>
  import('@/pages/private/PrivatePage.tsx').then((module) => ({ default: module.PrivatePage }))
);

const PageLoader = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <CircularProgress />
  </Box>
);

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
    element: (
      <Suspense fallback={<PageLoader />}>
        <MainLayout />
      </Suspense>
    ),
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
