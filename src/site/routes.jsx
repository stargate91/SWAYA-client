import { Suspense } from 'react';
import SiteLayout from './layouts/SiteLayout';
import { createSiteRouteEntries, NotFoundPage } from './routesConfig';

const withSuspense = (Component) => (
  <Suspense fallback={null}>
    <Component />
  </Suspense>
);

export const siteRoutes = [
  {
    path: '/',
    element: <SiteLayout />,
    errorElement: withSuspense(NotFoundPage),
    children: createSiteRouteEntries(withSuspense),
  },
];

