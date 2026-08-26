import { SlidersHorizontal } from '@/ui/icons';
import UtilityBarPortal from '@/ui/UtilityBarPortal';
import Tooltip from '@/ui/Tooltip';
import ContinueWatchingWidget from './widgets/ContinueWatchingWidget';
import SpotlightWidget from './widgets/SpotlightWidget';
import RecentlyAddedWidget from './widgets/RecentlyAddedWidget';
import RecentlyActivePeopleWidget from './widgets/RecentlyActivePeopleWidget';
import RecentlyFollowedStudiosWidget from './widgets/RecentlyFollowedStudiosWidget';
import MoviesDiscoveryWidget from './widgets/MoviesDiscoveryWidget';
import TvDiscoveryWidget from './widgets/TvDiscoveryWidget';
import AdultRecommendationsWidget from './widgets/AdultRecommendationsWidget';
import TMDBDiscoveryWidget from './widgets/TMDBDiscoveryWidget';
import StashDbDiscoveryWidget from './widgets/StashDbDiscoveryWidget';
import FansDbDiscoveryWidget from './widgets/FansDbDiscoveryWidget';
import DashboardCustomizerDrawer from './widgets/DashboardCustomizerDrawer';
import PageHeader from '@/ui/PageHeader';
import Stack from '@/ui/Stack';
import WidgetErrorBoundary from './components/WidgetErrorBoundary';
import LazyWidgetContainer from './components/LazyWidgetContainer';
import useDashboardView from './hooks/useDashboardView';
import { hasProviderCredential } from '@/lib/providerAvailability';

const WIDGET_REGISTRY = {
  continue_watching: {
    component: ContinueWatchingWidget,
    titleKey: 'dashboard.widget_continue_watching',
    fallbackTitle: 'Continue Watching',
  },
  spotlight: {
    component: SpotlightWidget,
    titleKey: 'dashboard.widget_spotlight',
    fallbackTitle: 'Spotlight (Trending)',
  },
  recently_added_movies: {
    component: RecentlyAddedWidget,
    titleKey: 'dashboard.widget_recently_added_movies',
    fallbackTitle: 'Freshly Added Movies',
    getProps: () => ({ mediaType: 'movie' }),
    show: (settings, isNsfw) => !isNsfw,
  },
  recently_added_tv: {
    component: RecentlyAddedWidget,
    titleKey: 'dashboard.widget_recently_added_tv',
    fallbackTitle: 'Freshly Added TV Shows',
    getProps: () => ({ mediaType: 'tv' }),
    show: (settings, isNsfw) => !isNsfw,
  },
  recently_added_scenes: {
    component: RecentlyAddedWidget,
    titleKey: 'dashboard.widget_recently_added_scenes',
    fallbackTitle: 'Freshly Added Scenes',
    getProps: () => ({ mediaType: 'scene' }),
    show: (settings, isNsfw) => isNsfw,
  },
  recently_added_videos: {
    component: RecentlyAddedWidget,
    titleKey: 'dashboard.widget_recently_added_videos',
    fallbackTitle: 'Freshly Added Videos',
    getProps: () => ({ mediaType: 'video' }),
    show: (settings, isNsfw) => !isNsfw,
  },
  recently_activated_people: {
    component: RecentlyActivePeopleWidget,
    titleKey: (isNsfw) => isNsfw ? 'dashboard.widget_recently_activated_people_adult' : 'dashboard.widget_recently_activated_people',
    fallbackTitle: (isNsfw) => isNsfw ? 'Lately Tracked Adult Stars' : 'Lately Tracked Artists',
    getProps: (_settings, lang) => ({ language: lang }),
  },
  recently_followed_studios: {
    component: RecentlyFollowedStudiosWidget,
    titleKey: (isNsfw) => isNsfw ? 'dashboard.widget_recently_followed_studios_adult' : 'dashboard.widget_recently_followed_studios',
    fallbackTitle: (isNsfw) => isNsfw ? 'Lastly Followed Studios' : 'Lastly Followed Companies',
  },
  movies_discovery: {
    component: MoviesDiscoveryWidget,
    titleKey: 'dashboard.widget_movies_discovery',
    fallbackTitle: 'Discover Movies',
    show: (settings, isNsfw) => !isNsfw && hasProviderCredential(settings, 'tmdb'),
  },
  tv_discovery: {
    component: TvDiscoveryWidget,
    titleKey: 'dashboard.widget_tv_discovery',
    fallbackTitle: 'Discover TV Shows',
    show: (settings, isNsfw) => !isNsfw && hasProviderCredential(settings, 'tmdb'),
  },
  top_20: {
    component: TMDBDiscoveryWidget,
    titleKey: 'dashboard.widget_top_20',
    fallbackTitle: 'Top 20 Discoveries',
    show: (settings, isNsfw) => !isNsfw && hasProviderCredential(settings, 'tmdb'),
  },
  adult: {
    component: AdultRecommendationsWidget,
    titleKey: 'dashboard.widget_adult',
    fallbackTitle: 'Adult recommendations',
    show: (settings, isNsfw) => isNsfw && Boolean(settings?.include_adult) && hasProviderCredential(settings, 'tmdb'),
  },
  stashdb_discovery: {
    component: StashDbDiscoveryWidget,
    titleKey: 'dashboard.widget_stashdb_discovery',
    fallbackTitle: 'StashDB Discovery',
    show: (settings, isNsfw) => isNsfw && Boolean(settings?.include_adult) && hasProviderCredential(settings, 'stashdb'),
  },
  fansdb_discovery: {
    component: FansDbDiscoveryWidget,
    titleKey: 'dashboard.widget_fansdb_discovery',
    fallbackTitle: 'FansDB Discovery',
    show: (settings, isNsfw) => isNsfw && Boolean(settings?.include_adult) && hasProviderCredential(settings, 'fansdb'),
  },
};

const DashboardView = () => {
  const {
    t,
    settings,
    isNsfw,
    showAdult,
    visibleWidgets,
    toggleWidget,
    widgetOrder,
    handleOrderChange,
    isCustomizerOpen,
    setIsCustomizerOpen,
    welcomeTitle,
  } = useDashboardView();

  return (
    <>
      <UtilityBarPortal align="right">
        <Tooltip
          content={t('dashboard.customize') || 'Customize Dashboard'}
          side="bottom"
        >
          <button
            type="button"
            onClick={() => setIsCustomizerOpen(true)}
            className="media-detail-page__side-nav-toggle"
          >
            <SlidersHorizontal size={18} />
          </button>
        </Tooltip>
      </UtilityBarPortal>

      <Stack gap="4xl">
        <PageHeader
          title={welcomeTitle}
          description={t('dashboard.subtitle') || 'Here is an overview of your media library.'}
        />

        <Stack gap="4xl">
          {widgetOrder.map((key, index) => {
            const widgetConfig = WIDGET_REGISTRY[key];
            if (!widgetConfig) return null;

            const lang = settings?.ui_language || settings?.primary_metadata_language;

            if (widgetConfig.show && !widgetConfig.show(settings, isNsfw)) {
              return null;
            }

            const titleKey = typeof widgetConfig.titleKey === 'function'
              ? widgetConfig.titleKey(isNsfw)
              : widgetConfig.titleKey;

            const fallbackTitle = typeof widgetConfig.fallbackTitle === 'function'
              ? widgetConfig.fallbackTitle(isNsfw)
              : widgetConfig.fallbackTitle;

            const title = t(titleKey) || fallbackTitle;
            const WidgetComponent = widgetConfig.component;
            const customProps = widgetConfig.getProps ? widgetConfig.getProps(settings, lang, t) : {};

            const widgetEl = visibleWidgets[key] && <WidgetComponent {...customProps} title={title} />;

            if (widgetEl) {
              return (
                <LazyWidgetContainer key={key} priority={index < 2}>
                  <WidgetErrorBoundary name={key} title={title} t={t}>
                    {widgetEl}
                  </WidgetErrorBoundary>
                </LazyWidgetContainer>
              );
            }
            return null;
          })}
        </Stack>
      </Stack>

      <DashboardCustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        visibleWidgets={visibleWidgets}
        toggleWidget={toggleWidget}
        widgetOrder={widgetOrder}
        handleOrderChange={handleOrderChange}
        showAdult={showAdult}
        widgetRegistry={WIDGET_REGISTRY}
        settings={settings}
      />
    </>
  );
};

export default DashboardView;
