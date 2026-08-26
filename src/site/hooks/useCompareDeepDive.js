import { useMemo, createElement } from 'react';
import { FolderSync, Film, Lock, Sparkles, Shield, Zap } from 'lucide-react';

export const COMPARISON_ICON_MAP = {
  organizer: FolderSync,
  player: Film,
  privacy: Lock,
  security: Shield,
  performance: Zap,
  sparkles: Sparkles,
};

export const DEFAULT_INDEX_ICONS = [
  FolderSync,
  Film,
  Lock,
];

/**
 * Resolves the appropriate icon component for a comparison deep dive card.
 */
export function resolveComparisonIconComponent(dive, index = 0) {
  if (!dive) return Sparkles;
  if (dive.iconKey && COMPARISON_ICON_MAP[dive.iconKey]) {
    return COMPARISON_ICON_MAP[dive.iconKey];
  }
  if (dive.iconType && COMPARISON_ICON_MAP[dive.iconType]) {
    return COMPARISON_ICON_MAP[dive.iconType];
  }
  return DEFAULT_INDEX_ICONS[index] || Sparkles;
}

/**
 * Hook to resolve icon node and card text for CompareDeepDiveCard.
 */
export function useCompareDeepDive(dive, index = 0) {
  return useMemo(() => {
    const IconComponent = resolveComparisonIconComponent(dive, index);
    const iconNode = createElement(IconComponent, { size: 20, 'aria-hidden': 'true' });

    return {
      iconNode,
      title: dive?.title || '',
      description: dive?.description || '',
    };
  }, [dive, index]);
}

export default useCompareDeepDive;
