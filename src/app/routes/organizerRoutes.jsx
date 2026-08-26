/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';

const OrganizerPage = lazy(() => import('../pages/organizer/OrganizerPage'));

export const organizerRoutes = [
  {
    path: 'organizer',
    element: (
      <Suspense fallback={null}>
        <OrganizerPage />
      </Suspense>
    ),
  },
];
