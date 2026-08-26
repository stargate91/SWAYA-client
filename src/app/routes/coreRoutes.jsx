/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));
const SettingsPage = lazy(() => import('../pages/settings/SettingsPage'));
const SearchPage = lazy(() => import('../pages/search/SearchPage'));
const ListsPage = lazy(() => import('../pages/lists/ListsPage'));
const AboutPage = lazy(() => import('../pages/about/AboutPage'));
const TorrentPage = lazy(() => import('../pages/torrent/TorrentPage'));
const StatisticsPage = lazy(() => import('../pages/statistics/StatisticsPage'));

const withSuspense = (Component) => (
  <Suspense fallback={null}>
    <Component />
  </Suspense>
);

export const overlayCoreRoutes = [
  { path: 'settings', element: withSuspense(SettingsPage) },
  { path: 'about', element: withSuspense(AboutPage) },
];

export const coreRoutes = [
  { index: true, element: <Navigate to="/dashboard" replace /> },
  { path: 'dashboard', element: withSuspense(DashboardPage) },
  { path: 'search', element: withSuspense(SearchPage) },
  { path: 'lists', element: withSuspense(ListsPage) },
  { path: 'torrent', element: withSuspense(TorrentPage) },
  { path: 'statistics', element: withSuspense(StatisticsPage) },
];

