import { useStatisticsPage } from '../hooks/useStatisticsPage';
import WidgetShell from '@/ui/WidgetShell';
import Card from '@/ui/Card';
import Text from '@/ui/Text';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Grid from '@/ui/Grid';
import { formatNumber } from '@/lib/formatters';

const StatisticsWidget = () => {
  const { stats, isLoading, t, scenesStats } = useStatisticsPage();

  return (
    <WidgetShell loading={isLoading} size="sm" transparent={true}>
      <Grid variant="stats">
        <Card variant="flat-glass" padding="xl" glowBlob={true} flex={1}>
          <Stack justify="between" fullHeight gap="md">
            <Text variant="caption" color="secondary" weight="extrabold" uppercase as="div">
              {t('statistics.stats.total_movies') || 'Total Movies'}
            </Text>
            <Stack gap="xs">
              <Text variant="hero" color="primary" weight="extrabold" as="div">
                {formatNumber(stats.total_movies || 0)}
              </Text>
              <Inline gap="sm" align="center">
                <Text variant="small" color="accent" weight="semibold">
                  {t('statistics.stats.movies_sub') || 'In Library'}
                </Text>
              </Inline>
            </Stack>
          </Stack>
        </Card>

        <Card variant="flat-glass" padding="xl" glowBlob={true} flex={1}>
          <Stack justify="between" fullHeight gap="md">
            <Text variant="caption" color="secondary" weight="extrabold" uppercase as="div">
              {scenesStats.title}
            </Text>
            <Stack gap="xs">
              <Text variant="hero" color="primary" weight="extrabold" as="div">
                {scenesStats.value}
              </Text>
              <Inline gap="sm" align="center">
                <Text variant="small" color="accent" weight="semibold">
                  {scenesStats.subText}
                </Text>
              </Inline>
            </Stack>
          </Stack>
        </Card>

        <Card variant="flat-glass" padding="xl" glowBlob={true} flex={1}>
          <Stack justify="between" fullHeight gap="md">
            <Text variant="caption" color="secondary" weight="extrabold" uppercase as="div">
              {t('statistics.stats.total_tv') || 'TV Shows'}
            </Text>
            <Stack gap="xs">
              <Text variant="hero" color="primary" weight="extrabold" as="div">
                {formatNumber(stats.total_tv || 0)}
              </Text>
              <Inline gap="sm" align="center">
                <Text variant="small" color="accent" weight="semibold">
                  {t('statistics.stats.tv_sub', { count: stats.total_episodes || 0 }) || `${stats.total_episodes || 0} Episodes`}
                </Text>
              </Inline>
            </Stack>
          </Stack>
        </Card>

        <Card variant="flat-glass" padding="xl" glowBlob={true} flex={1}>
          <Stack justify="between" fullHeight gap="md">
            <Text variant="caption" color="secondary" weight="extrabold" uppercase as="div">
              {t('statistics.stats.storage_used') || 'Storage Used'}
            </Text>
            <Stack gap="xs">
              <Text variant="hero" color="primary" weight="extrabold" as="div">
                {stats.storage || '0.0 GB'}
              </Text>
              <Inline gap="sm" align="center">
                <Text variant="small" color="accent" weight="semibold">
                  {t('statistics.stats.storage_sub', { count: stats.drive_count || 0 }) || `across ${stats.drive_count || 0} drives`}
                </Text>
              </Inline>
            </Stack>
          </Stack>
        </Card>

        <Card variant="flat-glass" padding="xl" glowBlob={true} flex={1}>
          <Stack justify="between" fullHeight gap="md">
            <Text variant="caption" color="secondary" weight="extrabold" uppercase as="div">
              {t('statistics.stats.unmatched') || 'Review Needed'}
            </Text>
            <Stack gap="xs">
              <Text variant="hero" color="primary" weight="extrabold" as="div">
                {formatNumber(stats.unmatched || 0)}
              </Text>
              <Inline gap="sm" align="center">
                <Text variant="small" color="accent" weight="semibold">
                  {t('statistics.stats.unmatched_sub') || 'Files in scanner queue'}
                </Text>
              </Inline>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </WidgetShell>
  );
};

export default StatisticsWidget;
