import { lazy } from 'react';
import LandingPage from './pages/LandingPage';

export { LandingPage };
export const DocsPage = lazy(() => import('./pages/DocsPage'));
export const ChangelogPage = lazy(() => import('./pages/ChangelogPage'));
export const HelpPage = lazy(() => import('./pages/HelpPage'));
export const CompareHubPage = lazy(() => import('./pages/CompareHubPage'));
export const ComparePage = lazy(() => import('./pages/ComparePage'));
export const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
export const TermsPage = lazy(() => import('./pages/TermsPage'));
export const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export const SITE_PAGE_ROUTES = [
  { path: '', element: LandingPage, index: true },
  { path: 'docs', element: DocsPage },
  { path: 'docs/:slug', element: DocsPage },
  { path: 'changelog', element: ChangelogPage },
  { path: 'help', element: HelpPage },
  { path: 'compare', element: CompareHubPage },
  { path: 'compare/:slug', element: ComparePage },
  { path: 'privacy', element: PrivacyPage },
  { path: 'terms', element: TermsPage },
];

/**
 * Builds standard, localized, and fallback route definitions for the website.
 * @param {Function} withSuspense - Wrapper function to apply React.Suspense
 * @returns {Array} Route definitions array for React Router
 */
export function createSiteRouteEntries(withSuspense) {
  const defaultRoutes = SITE_PAGE_ROUTES.map(({ path, element: Element, index }) => ({
    ...(index ? { index: true } : { path }),
    element: withSuspense(Element),
  }));

  const localizedRoutes = SITE_PAGE_ROUTES.map(({ path, element: Element }) => ({
    path: path ? `:lang/${path}` : ':lang',
    element: withSuspense(Element),
  }));

  return [
    ...defaultRoutes,
    ...localizedRoutes,
    {
      path: '*',
      element: withSuspense(NotFoundPage),
    },
  ];
}

