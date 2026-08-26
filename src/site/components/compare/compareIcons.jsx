/* eslint-disable react-refresh/only-export-components */
import { createElement } from 'react';
import {
  COMPARISON_ICON_MAP,
  DEFAULT_INDEX_ICONS,
  resolveComparisonIconComponent,
} from '../../hooks/useCompareDeepDive';

export { COMPARISON_ICON_MAP, DEFAULT_INDEX_ICONS, resolveComparisonIconComponent };

/**
 * Resolves the appropriate icon element for a compare deep dive card.
 */
export function getComparisonIcon(dive, index = 0) {
  const IconComponent = resolveComparisonIconComponent(dive, index);
  return createElement(IconComponent, { size: 20, 'aria-hidden': 'true' });
}
