import { useState, useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import { FAQ_ITEMS, normalizeFaqList } from '../data/faqConfig';

/**
 * Hook managing collapsible FAQ accordion items, active open states, accessibility attributes, and translations.
 * @param {Array<object>|object} [itemsOrConfig] - List of FAQ items or accordion configuration object
 * @param {object} [options={}] - Additional options when passing items array
 * @returns {{
 *   openId: string|number|null,
 *   toggleItem: (itemId: string|number) => void,
 *   formattedItems: Array<object>,
 *   tagText: string,
 *   titleText: string,
 *   titleAccentText: string,
 *   subtitleText: string,
 *   id: string
 * }}
 */
export function useFaqAccordion(itemsOrConfig, options = {}) {
  const isOptionsObj = itemsOrConfig && !Array.isArray(itemsOrConfig) && typeof itemsOrConfig === 'object';
  const config = isOptionsObj ? itemsOrConfig : { items: itemsOrConfig, ...options };

  const {
    items,
    initialOpenId = null,
    tag,
    title,
    titleAccent,
    subtitle,
    id = 'faq',
  } = config;

  const { t } = useTranslation();
  const activeItems = items && items.length > 0 ? items : FAQ_ITEMS;

  const [openId, setOpenId] = useState(
    initialOpenId ?? (activeItems.length > 0 ? (activeItems[0]?.id ?? 0) : null)
  );

  const toggleItem = (itemId) => {
    setOpenId((prev) => (prev === itemId ? null : itemId));
  };

  const formattedItems = useMemo(() => {
    return normalizeFaqList(activeItems, t, id);
  }, [activeItems, id, t]);


  const displayTag = tag ?? t('landing.faq.tag', { defaultValue: 'Got Questions?' });
  const displayTitle = title ?? t('landing.faq.title', { defaultValue: 'Frequently Asked' });
  const displayTitleAccent =
    titleAccent !== undefined
      ? titleAccent
      : title !== undefined
        ? ''
        : t('landing.faq.titleAccent', { defaultValue: 'Questions.' });
  const displaySubtitle =
    subtitle ??
    t('landing.faq.subtitle', {
      defaultValue:
        'Everything you need to know about SWAYA, licensing, offline privacy, and playback performance.',
    });

  return {
    openId,
    toggleItem,
    formattedItems,
    displayTag,
    displayTitle,
    displayTitleAccent,
    displaySubtitle,
    t,
  };
}

export default useFaqAccordion;
