import { useMemo, createElement } from 'react';
import { ArrowRight, ExternalLink, Mail } from 'lucide-react';
import { DiscordIcon } from '@/ui/icons';

const ICON_MAP = {
  discord: (props) => createElement(DiscordIcon, { size: 14, 'aria-hidden': 'true', ...props }),
  mail: (props) => createElement(Mail, { size: 14, 'aria-hidden': 'true', ...props }),
  external: (props) => createElement(ExternalLink, { size: 11, 'aria-hidden': 'true', ...props }),
  arrowRight: (props) => createElement(ArrowRight, { size: 12, 'aria-hidden': 'true', ...props }),
};

/**
 * Hook to resolve link props, icons, and navigation type for a footer link item.
 */
export function useFooterNavLink(item) {
  return useMemo(() => {
    if (!item) {
      return { isRouterLink: false, linkProps: {}, leftIcon: null, rightIcon: null, label: '' };
    }

    const leftIcon =
      (item.iconKey && ICON_MAP[item.iconKey]?.()) || item.leftIcon || null;
    const rightIcon =
      (item.rightIconKey && ICON_MAP[item.rightIconKey]?.()) || item.rightIcon || null;

    const isExternal = Boolean(item.isExternal);
    const isMailto = Boolean(item.isMailto);
    const isRouterLink = !isExternal && !isMailto;

    const linkProps = {
      'aria-label': item.ariaLabel,
      title: item.title,
    };

    if (isExternal) {
      linkProps.href = item.href;
      linkProps.target = '_blank';
      linkProps.rel = 'noopener noreferrer';
    } else if (isMailto) {
      linkProps.href = item.href;
    } else {
      linkProps.to = item.to;
      linkProps.onClick = item.onClick;
    }

    return {
      isRouterLink,
      linkProps,
      leftIcon,
      rightIcon,
      label: item.label,
    };
  }, [item]);
}

export default useFooterNavLink;
