/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { createHashRouter, createBrowserRouter } from 'react-router-dom';
import { coreRoutes, overlayCoreRoutes } from './routes/coreRoutes';
import { organizerRoutes } from './routes/organizerRoutes';
import { libraryRoutes, overlayLibraryRoutes } from './routes/libraryRoutes';
import { siteRoutes } from '@site/routes';
import { isElectron } from '@/lib/ipc';

const AppShell = lazy(() => import('./shell/AppShell'));
const OverlayShell = lazy(() => import('./shell/OverlayShell'));
const OnboardingWizard = lazy(() => import('./pages/onboarding/OnboardingWizard'));
const PlayerPage = lazy(() => import('./pages/player/PlayerPage'));

import RouteErrorBoundary from './shell/RouteErrorBoundary';

const routes = [
  {
    path: '/onboarding',
    errorElement: <RouteErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <OnboardingWizard />
      </Suspense>
    ),
  },
  {
    path: '/player/:itemId',
    errorElement: <RouteErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <PlayerPage />
      </Suspense>
    ),
  },
  {
    element: (
      <Suspense fallback={null}>
        <OverlayShell />
      </Suspense>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      ...overlayCoreRoutes,
      ...overlayLibraryRoutes,
    ],
  },
  {
    element: (
      <Suspense fallback={null}>
        <AppShell />
      </Suspense>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      ...coreRoutes.filter((route) => !route.index),
      ...organizerRoutes,
      ...libraryRoutes,
    ],
  },
  ...siteRoutes,
];

const createRouter = isElectron ? createHashRouter : createBrowserRouter;
export const router = createRouter(routes);

