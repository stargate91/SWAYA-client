import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Badge from '@/ui/Badge';
import Text from '@/ui/Text';
import Spinner from '@/ui/Spinner';
import Alert from '@/ui/Alert';
import { useChangelogParser } from '../hooks/useChangelogParser';

const TAG_SEPARATOR = ': ';

export default function ChangelogPanel({
  t,
  isLoadingChangelog,
  changelogError,
  changelogContent,
}) {
  const { releases, getSectionBadge } = useChangelogParser({ changelogContent, t });

  if (isLoadingChangelog) {
    return <Spinner centered label={t('common.loading')} />;
  }

  if (changelogError) {
    return <Alert variant="danger">{changelogError}</Alert>;
  }

  if (releases.length === 0) {
    return (
      <Card
        title={t('about.changelog.title', { defaultValue: 'Changelog' })}
        eyebrow={t('about.changelog.history', { defaultValue: 'HISTORY' })}
      >
        <Text variant="body" color="muted">
          {changelogContent || t('about.changelog.noEntries', { defaultValue: 'No changelog entries found.' })}
        </Text>
      </Card>
    );
  }

  return (
    <Stack gap="xl">
      {releases.map((release, index) => {
        const versionLabel = t('about.changelog.version', { version: release.version, defaultValue: `Version ${release.version}` });
        const dateEyebrow = release.date
          ? t('about.changelog.released', { date: release.date, defaultValue: `RELEASED • ${release.date}` })
          : t('about.changelog.noDate', { defaultValue: 'RELEASE' });

        return (
          <Card
            key={release.version}
            title={versionLabel}
            eyebrow={dateEyebrow}
            actions={
              index === 0 ? (
                <Badge tone="success" size="sm">
                  {t('about.changelog.latest', { defaultValue: 'Latest Release' })}
                </Badge>
              ) : null
            }
          >
            <Stack gap="lg">
              {release.sections.map((section, sIdx) => {
                const badge = getSectionBadge(section.title);
                const BadgeIcon = badge.icon;

                return (
                  <Stack key={sIdx} gap="sm">
                    <Inline gap="xs" align="center">
                      <Badge tone={badge.tone} size="xs">
                        <BadgeIcon size={11} /> {badge.label}
                      </Badge>
                    </Inline>

                    <Stack gap="xs" indent="sm">
                      {section.items.map((item, iIdx) => (
                        <Text key={iIdx} variant="caption" color="secondary">
                          {item.tag ? (
                            <>
                              <Text as="span" variant="caption" weight="semibold" color="primary">
                                {item.tag}{TAG_SEPARATOR}
                              </Text>
                              {item.text}
                            </>
                          ) : (
                            item.text
                          )}
                        </Text>
                      ))}
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Card>
        );
      })}
    </Stack>
  );
}

