import { useMemo, createElement, isValidElement } from 'react';

/**
 * Hook to resolve styling, icon nodes, and link attributes for HelpChannelCard.
 */
export function useHelpChannelCard({
  type,
  icon: Icon,
  buttonIcon: ButtonIcon,
  isExternal = false,
}) {
  return useMemo(() => {
    const cardModifierKey = type === 'discord' ? 'card--discord' : 'card--email';

    const renderIconElement = (iconProp, defaultSize) => {
      if (!iconProp) return null;
      if (isValidElement(iconProp)) return iconProp;
      if (typeof iconProp === 'function' || (typeof iconProp === 'object' && iconProp?.$$typeof)) {
        return createElement(iconProp, { size: defaultSize, 'aria-hidden': 'true' });
      }
      return null;
    };

    const renderedIcon = renderIconElement(Icon, 24);
    const renderedButtonIcon = renderIconElement(ButtonIcon, 14);

    const target = isExternal ? '_blank' : undefined;
    const rel = isExternal ? 'noopener noreferrer' : undefined;

    return {
      cardModifierKey,
      renderedIcon,
      renderedButtonIcon,
      target,
      rel,
    };
  }, [type, Icon, ButtonIcon, isExternal]);
}

export default useHelpChannelCard;
