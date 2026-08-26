import { useMemo } from 'react';
import { buildMediaExternalLinks, resolveSocialLinks } from '@/lib/externalLinks';

export default function useMediaSocialLinks(item) {
  const externalLinks = useMemo(
    () => buildMediaExternalLinks(item),
    [item]
  );

  const socialLinks = useMemo(() => {
    if (!item) return [];
    return resolveSocialLinks(externalLinks);
  }, [externalLinks, item]);

  return socialLinks;
}
