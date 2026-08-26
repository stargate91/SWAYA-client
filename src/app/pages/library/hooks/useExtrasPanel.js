import { useMemo, useCallback } from 'react';
import { showItemInFolder } from '@/lib/ipc';
import { toTitleCase } from '@/lib/formatters';

export function useExtrasPanel({ item, isMovie, t, toast }) {
  const extras = useMemo(() => item?.extras || [], [item?.extras]);

  const extraGroups = useMemo(() => {
    if (isMovie) {
      return [{ label: null, items: extras }];
    }
    return extras.reduce((groups, extra) => {
      const label = extra.parent_label || t?.('library.details.extras') || 'Extras';
      const existingGroup = groups.find((group) => group.label === label);

      if (existingGroup) {
        existingGroup.items.push(extra);
      } else {
        groups.push({ label, items: [extra] });
      }

      return groups;
    }, []);
  }, [extras, isMovie, t]);

  const getExtraMeta = useCallback((extra) => {
    if (!extra) return '';
    const meta = [];

    if (extra.category) {
      meta.push(toTitleCase(extra.category));
    }

    if (extra.subtype && extra.category !== 'metadata') {
      meta.push(toTitleCase(extra.subtype));
    }

    if (extra.language) {
      meta.push(String(extra.language).toUpperCase());
    }

    return meta.join(' · ');
  }, []);

  const handleBrowseFolder = useCallback(async (path) => {
    if (!path) return;
    const result = await showItemInFolder(path);
    if (!result?.success) {
      toast?.(result?.error || t?.('organizer.toasts.showInFolderFailed') || 'Failed to open folder', 'danger');
    }
  }, [toast, t]);

  const headingTitle = t?.('library.details.extras') || 'Film Extras';
  const browseTooltip = t?.('library.details.showInFolder') || 'Show in Folder';
  const noExtrasText = t?.('library.details.noExtraFilesFound') || 'No extra files found.';

  return {
    extras,
    extraGroups,
    hasExtras: extras.length > 0,
    getExtraMeta,
    handleBrowseFolder,
    headingTitle,
    browseTooltip,
    noExtrasText,
  };
}

export default useExtrasPanel;
