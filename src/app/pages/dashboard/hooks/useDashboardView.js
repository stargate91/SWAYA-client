import { useState } from 'react';
import { useSettingsQuery, useUpdateSettingsMutation, useStatsQuery } from '@/queries';
import { useTranslation } from '@/providers/LanguageContext';
import { useLibraryModeStore, isNsfwMode } from '@/stores/useLibraryModeStore';

const DEFAULT_WIDGETS = Object.freeze({
  continue_watching: true,
  spotlight: true,
  recently_added_movies: true,
  recently_added_tv: true,
  recently_added_scenes: true,
  recently_added_videos: true,
  recently_activated_people: true,
  recently_followed_studios: true,
  movies_discovery: true,
  tv_discovery: true,
  top_20: true,
  adult: true,
  stashdb_discovery: true,
  fansdb_discovery: true,
});

const DEFAULT_ORDER = Object.freeze([
  'continue_watching',
  'spotlight',
  'recently_added_movies',
  'recently_added_tv',
  'recently_added_scenes',
  'recently_added_videos',
  'recently_activated_people',
  'recently_followed_studios',
  'movies_discovery',
  'tv_discovery',
  'top_20',
  'adult',
  'stashdb_discovery',
  'fansdb_discovery',
]);

export default function useDashboardView() {
  const { t } = useTranslation();
  const sessionMode = useLibraryModeStore((state) => state.sessionMode);
  const includeAdult = isNsfwMode(sessionMode);

  const { data: settings = {} } = useSettingsQuery();
  const updateSettingsMutation = useUpdateSettingsMutation();
  const { data: stats = {}, isLoading: statsLoading } = useStatsQuery(includeAdult);

  const initialWidgets = settings?.dashboard_customization || DEFAULT_WIDGETS;
  const initialOrder = settings?.dashboard_order || DEFAULT_ORDER;

  const [visibleWidgets, setVisibleWidgets] = useState(initialWidgets);
  const [widgetOrder, setWidgetOrder] = useState(initialOrder);

  const [prevSettingsWidgets, setPrevSettingsWidgets] = useState(settings?.dashboard_customization);
  const [prevSettingsOrder, setPrevSettingsOrder] = useState(settings?.dashboard_order);

  if (settings?.dashboard_customization !== prevSettingsWidgets) {
    setPrevSettingsWidgets(settings?.dashboard_customization);
    if (settings?.dashboard_customization) {
      setVisibleWidgets((prev) => ({ ...DEFAULT_WIDGETS, ...settings.dashboard_customization, ...prev }));
    }
  }

  if (settings?.dashboard_order !== prevSettingsOrder) {
    setPrevSettingsOrder(settings?.dashboard_order);
    if (settings?.dashboard_order) {
      const currentKeys = Object.keys(DEFAULT_WIDGETS);
      const savedKeys = settings.dashboard_order;
      const missingKeys = currentKeys.filter((key) => !savedKeys.includes(key));
      const merged = [...savedKeys, ...missingKeys];
      const hasChanged = merged.length !== widgetOrder.length || merged.some((k, i) => k !== widgetOrder[i]);
      if (hasChanged) {
        merged.forEach((key) => {
          if (!DEFAULT_ORDER.includes(key)) {
            console.warn(`Unknown widget in dashboard_order: ${key}`);
          }
        });
        setWidgetOrder(merged.filter((key) => DEFAULT_ORDER.includes(key)));
      }
    }
  }

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const toggleWidget = (key) => {
    setVisibleWidgets((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      updateSettingsMutation.mutate(
        { dashboard_customization: updated },
        {
          onError: (err) => {
            console.error('Failed to update dashboard customization:', err);
          },
        }
      );
      return updated;
    });
  };

  const handleOrderChange = (key, newIndex) => {
    setWidgetOrder((prev) => {
      const updated = prev.filter((k) => k !== key);
      updated.splice(newIndex, 0, key);
      updateSettingsMutation.mutate(
        { dashboard_order: updated },
        {
          onError: (err) => {
            console.error('Failed to update dashboard order:', err);
          },
        }
      );
      return updated;
    });
  };

  const showAdult = Boolean(settings?.include_adult);
  const isNsfw = showAdult && isNsfwMode(sessionMode);

  const getGreetingKey = () => {
    const isNsfwGreet = showAdult && isNsfwMode(sessionMode);

    const hasItems = (
      (stats.genre_distribution && Object.keys(stats.genre_distribution).length > 0) ||
      (stats.decade_distribution && Object.keys(stats.decade_distribution).length > 0)
    );

    if (!statsLoading && !hasItems) {
      return isNsfwGreet ? 'onboarding_nsfw' : 'onboarding';
    }

    const hour = new Date().getHours();
    let timeKey;
    if (hour >= 5 && hour < 12) {
      timeKey = 'morning';
    } else if (hour >= 12 && hour < 18) {
      timeKey = 'afternoon';
    } else if (hour >= 18 && hour < 22) {
      timeKey = 'evening';
    } else {
      timeKey = 'night';
    }

    return isNsfwGreet ? `${timeKey}_nsfw` : timeKey;
  };

  const displayName = settings?.user_name?.trim();
  const greetingKey = getGreetingKey();
  const welcomeTitle = displayName
    ? t(`dynamic.dashboardWelcome.${greetingKey}`, { name: displayName })
    : t(`dynamic.dashboardWelcomeNoName.${greetingKey}`) || 'Welcome back';

  return {
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
  };
}
