import Page from '@/ui/Page';
import Badge from '@/ui/Badge';
import StatisticsWidget from './components/StatisticsWidget';
import { LibraryDNA } from './components/LibraryDNA';
import { TimeTravelTimeline } from './components/TimeTravelTimeline';
import { RatingsSummary } from './components/RatingsSummary';
import { RatingDistribution } from './components/RatingDistribution';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Grid from '@/ui/Grid';
import SectionHeader from '@/ui/SectionHeader';
import { useStatisticsPage } from './hooks/useStatisticsPage';

export default function StatisticsPage() {
  const {
    t,
    isAdultMode,
  } = useStatisticsPage();

  const pageTitle = (
    <Inline gap="sm" align="center">
      {t('sidebar.statistics') || 'Statistics'}
      {isAdultMode && (
        <Badge
          family="adult"
          tone="danger"
          size="xs"
        >
          {t('common.adult_badge', { defaultValue: '18+' })}
        </Badge>
      )}
    </Inline>
  );

  return (
    <Page
      title={pageTitle}
      description={t('statistics.description') || 'Visual overview and breakdown of your media library'}
    >
      <Stack gap="5xl">
        {/* Section 1: Overview */}
        <Stack gap="lg">
          <SectionHeader title={t('statistics.sections.overview') || 'Overview'} />
          <StatisticsWidget />
        </Stack>

        {/* Section 2: Ratings & Reviews */}
        <Stack gap="lg">
          <SectionHeader title={t('statistics.sections.ratings') || 'Ratings & Reviews'} />
          <RatingsSummary />
          <RatingDistribution />
        </Stack>

        {/* Section 3: Library DNA & Timeline */}
        <Stack gap="lg">
          <SectionHeader title={t('statistics.sections.insights') || 'Library DNA & Timeline'} />
          <Grid variant="bento">
            {/* Box 3: Library DNA Radar */}
            <LibraryDNA />

            {/* Box 4: Time Travel Timeline */}
            <TimeTravelTimeline />
          </Grid>
        </Stack>
      </Stack>
    </Page>
  );
}
