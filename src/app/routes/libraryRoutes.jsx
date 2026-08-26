/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';

const LibraryPage = lazy(() => import('../pages/library/LibraryPage'));
const TagsPage = lazy(() => import('../pages/tags/TagsPage'));
const MediaDetailPage = lazy(() => import('../pages/library/MediaDetailPage'));
const PeopleCollectionDetailPage = lazy(() => import('../pages/library/PeopleCollectionDetailPage'));
const PerformerEditPage = lazy(() => import('../pages/library/performer-edit/PerformerEditPage'));
const HistoryPage = lazy(() => import('../pages/history/HistoryPage'));
const RatingsPage = lazy(() => import('../pages/ratings/RatingsPage'));
const StudioDetailPage = lazy(() => import('../pages/library/studioDetail/StudioDetailPage'));

const withSuspense = (element) => (
  <Suspense fallback={null}>
    {element}
  </Suspense>
);

export const overlayLibraryRoutes = [
  {
    path: 'library/people/:id/edit',
    element: withSuspense(<PerformerEditPage />),
  },
];

export const libraryRoutes = [
  { path: 'library', element: withSuspense(<LibraryPage />) },
  { path: 'tags', element: withSuspense(<TagsPage />) },
  {
    path: 'library/movie/:id',
    element: withSuspense(<MediaDetailPage type="movie" />),
  },
  {
    path: 'library/scene/:id',
    element: withSuspense(<MediaDetailPage type="scene" />),
  },
  {
    path: 'library/video/:id',
    element: withSuspense(<MediaDetailPage type="video" />),
  },
  {
    path: 'library/tv/:id',
    element: withSuspense(<MediaDetailPage type="tv" />),
  },
  {
    path: 'library/people/:id',
    element: withSuspense(<PeopleCollectionDetailPage type="people" />),
  },
  {
    path: 'library/collection/:id',
    element: withSuspense(<PeopleCollectionDetailPage type="collection" />),
  },
  {
    path: 'library/studio/:id',
    element: withSuspense(<StudioDetailPage />),
  },
  { path: 'history', element: withSuspense(<HistoryPage />) },
  { path: 'my-ratings', element: withSuspense(<RatingsPage />) },
];
