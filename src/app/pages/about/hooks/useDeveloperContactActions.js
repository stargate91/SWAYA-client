import { useCallback } from 'react';
import { toast } from '@/stores/useToastStore';
import { openExternalLink } from '../utils/aboutHelpers';

/**
 * Hook to manage developer contact actions, clipboard copying, and external linking.
 *
 * @param {object} appInfo - Application and developer metadata
 * @param {Function} t - Translation function
 * @returns {{
 *   developerEmail: string,
 *   handleEmailClick: (e: React.MouseEvent) => void,
 *   handleOpenExternalLink: (url: string) => (e: React.MouseEvent) => void
 * }}
 */
export function useDeveloperContactActions(appInfo, t) {
  const developerEmail =
    appInfo?.developer?.email ||
    (t ? t('about.app_info.developer_email') : '') ||
    'levicore@proton.me';

  const handleEmailClick = useCallback(
    (e) => {
      if (e?.preventDefault) {
        e.preventDefault();
      }
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(developerEmail).catch(() => {});
      }
      const message = t
        ? t('about.toasts.email_copied', {
            email: developerEmail,
            defaultValue: `Copied email to clipboard: ${developerEmail}`,
          })
        : `Copied email to clipboard: ${developerEmail}`;
      toast(message, 'success');
      openExternalLink(`mailto:${developerEmail}`);
    },
    [developerEmail, t]
  );

  const handleOpenExternalLink = useCallback(
    (url) => (e) => {
      if (e?.preventDefault) {
        e.preventDefault();
      }
      if (url) {
        openExternalLink(url);
      }
    },
    []
  );

  return {
    developerEmail,
    handleEmailClick,
    handleOpenExternalLink,
  };
}

export default useDeveloperContactActions;
