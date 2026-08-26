import { useMemo, useCallback } from 'react';
import { Sparkles, Sliders, Zap, CheckCircle2 } from '@/ui/icons';

/**
 * Parses markdown changelog text into structured release objects
 */
export function parseChangelog(markdown) {
  if (!markdown) return [];
  const lines = markdown.split(/\r?\n/);
  const releases = [];
  let currentRelease = null;
  let currentSection = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check version header: e.g. "## [1.0.0] - 2026-08-14" or "## 1.0.0 (2026-08-14)"
    const versionMatch = line.match(/^##\s+\[?v?([0-9.]+(?:-[a-zA-Z0-9.]+)?)]?\s*(?:-\s*|\s*\()([0-9]{4}-[0-9]{2}-[0-9]{2}|\w+ \d+, \d{4})?\)?/);
    if (versionMatch) {
      if (currentRelease) {
        if (currentSection) {
          currentRelease.sections.push(currentSection);
          currentSection = null;
        }
        releases.push(currentRelease);
      }
      currentRelease = {
        version: versionMatch[1],
        date: versionMatch[2] || '',
        sections: [],
      };
      continue;
    }

    // Check section header: e.g. "### Added", "### Changed", "### Fixed", "### Performance & Optimization"
    if (line.startsWith('### ') && currentRelease) {
      if (currentSection) {
        currentRelease.sections.push(currentSection);
      }
      const title = line.replace('### ', '').trim();
      currentSection = {
        title,
        items: [],
      };
      continue;
    }

    // Bullet point: "- **Title**: Description" or "- Description"
    if ((line.startsWith('- ') || line.startsWith('* ')) && currentSection) {
      const itemContent = line.slice(2).trim();
      const boldMatch = itemContent.match(/^\*\*(.*?)\*\*:\s*(.*)$/);
      if (boldMatch) {
        currentSection.items.push({
          tag: boldMatch[1],
          text: boldMatch[2],
        });
      } else {
        currentSection.items.push({
          tag: null,
          text: itemContent,
        });
      }
    }
  }

  if (currentRelease) {
    if (currentSection) {
      currentRelease.sections.push(currentSection);
    }
    releases.push(currentRelease);
  }

  return releases;
}

export function getSectionBadgeConfig(title, t) {
  const lower = (title || '').toLowerCase();
  if (lower.includes('added') || lower.includes('new') || lower.includes('feature')) {
    return {
      tone: 'success',
      icon: Sparkles,
      label: t('about.changelog.categories.added', { defaultValue: 'Added' }),
    };
  }
  if (lower.includes('performance') || lower.includes('optimization') || lower.includes('speed')) {
    return {
      tone: 'accent',
      icon: Zap,
      label: t('about.changelog.categories.performance', { defaultValue: 'Performance' }),
    };
  }
  if (lower.includes('fixed') || lower.includes('bug')) {
    return {
      tone: 'warning',
      icon: CheckCircle2,
      label: t('about.changelog.categories.fixed', { defaultValue: 'Fixed' }),
    };
  }
  return {
    tone: 'neutral',
    icon: Sliders,
    label: t('about.changelog.categories.changed', { defaultValue: 'Changed' }),
  };
}

export function useChangelogParser({ changelogContent, t }) {
  const releases = useMemo(() => parseChangelog(changelogContent), [changelogContent]);

  const getSectionBadge = useCallback((title) => {
    return getSectionBadgeConfig(title, t);
  }, [t]);

  return {
    releases,
    getSectionBadge,
  };
}
