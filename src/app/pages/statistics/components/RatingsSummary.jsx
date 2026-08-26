import { useStatisticsPage } from '../hooks/useStatisticsPage';
import { BarChart2, CheckCircle, Users, Heart, Film } from '@/ui/icons';
import Skeleton from '@/ui/Skeleton';
import Inline from '@/ui/Inline';
import Card from '@/ui/Card';
import Grid from '@/ui/Grid';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import SegmentedRating from '@/ui/SegmentedRating';
import styles from './RatingsSummary.module.css';

const bulletSep = '\u2022';

export function RatingsSummary() {
  const { ratingsState, t } = useStatisticsPage();

  if (ratingsState.isStatsLoading) {
    return (
      <Grid variant="two-cols">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx} variant="flat-glass" padding="md">
            <Stack gap="md" justify="center" fullHeight>
              <Skeleton variant="title-sm" />
              <Skeleton variant="text" />
            </Stack>
          </Card>
        ))}
      </Grid>
    );
  }

  return (
    <Grid variant="two-cols">
      {/* CARD 1: Media Average Ratings */}
      <Card
        variant="flat-glass"
        padding="md"
        divider
        eyebrow={t('statistics.ratings.mediaAverages', { defaultValue: 'Average Ratings' })}
        actions={<BarChart2 size={16} className={styles['glow-blue']} />}
      >
        <Stack gap="sm" justify="center" fullHeight>
          {/* Movies Row */}
          <Inline gap="md" align="center" justify="between">
            <Text variant="body" color="muted" weight="medium">
              {t('tabs.movies', { defaultValue: 'Movies' })}
            </Text>
            <Inline gap="md" align="center">
              <Text variant="title" color="primary" weight="bold">{ratingsState.moviesStats.average}</Text>
              <SegmentedRating
                readonly
                showLabel={false}
                value={ratingsState.moviesStats.averageNum}
                t={t}
              />
            </Inline>
          </Inline>

          {/* TV Shows Row */}
          <Inline gap="md" align="center" justify="between">
            <Text variant="body" color="muted" weight="medium">
              {t('tabs.tvShows', { defaultValue: 'TV Shows' })}
            </Text>
            <Inline gap="md" align="center">
              <Text variant="title" color="primary" weight="bold">{ratingsState.tvStats.average}</Text>
              <SegmentedRating
                readonly
                showLabel={false}
                value={ratingsState.tvStats.averageNum}
                t={t}
              />
            </Inline>
          </Inline>

          {/* Scenes Row */}
          {ratingsState.activeSessionMode === 'nsfw' && (
            <Inline gap="md" align="center" justify="between">
              <Text variant="body" color="muted" weight="medium">
                {t('tabs.scenes', { defaultValue: 'Scenes' })}
              </Text>
              <Inline gap="md" align="center">
                <Text variant="title" color="primary" weight="bold">{ratingsState.scenesStats.average}</Text>
                <SegmentedRating
                  readonly
                  showLabel={false}
                  value={ratingsState.scenesStats.averageNum}
                  t={t}
                />
              </Inline>
            </Inline>
          )}

          {/* Videos Row */}
          <Inline gap="md" align="center" justify="between">
            <Text variant="body" color="muted" weight="medium">
              {t('tabs.videos', { defaultValue: 'Videos' })}
            </Text>
            <Inline gap="md" align="center">
              <Text variant="title" color="primary" weight="bold">{ratingsState.videosStats.average}</Text>
              <SegmentedRating
                readonly
                showLabel={false}
                value={ratingsState.videosStats.averageNum}
                t={t}
              />
            </Inline>
          </Inline>
        </Stack>
      </Card>

      {/* CARD 2: Media Counts */}
      <Card
        variant="flat-glass"
        padding="md"
        divider
        eyebrow={t('statistics.ratings.mediaItems', { defaultValue: 'Rated vs Unrated Titles' })}
        actions={<CheckCircle size={16} className={styles['glow-success']} />}
      >
        <Stack gap="sm" justify="center" fullHeight>
          {/* Movies counts */}
          <Inline gap="md" align="center" justify="between">
            <Text variant="body" color="muted" weight="medium">
              {t('tabs.movies', { defaultValue: 'Movies' })}
            </Text>
            <Inline gap="sm" align="center">
              <Text variant="body" color="primary" weight="semibold">{ratingsState.moviesStats.totalRated} {t('statistics.ratings.rated', { defaultValue: 'rated' })}</Text>
              <Text variant="body" color="muted">{bulletSep}</Text>
              <Text variant="body" color="muted">
                {ratingsState.moviesStats.totalUnrated} {t('statistics.ratings.unrated', { defaultValue: 'unrated' })}
                {ratingsState.moviesStats.unratedPercentText}
              </Text>
            </Inline>
          </Inline>

          {/* TV Shows counts */}
          <Inline gap="md" align="center" justify="between">
            <Text variant="body" color="muted" weight="medium">
              {t('tabs.tvShows', { defaultValue: 'TV Shows' })}
            </Text>
            <Inline gap="sm" align="center">
              <Text variant="body" color="primary" weight="semibold">{ratingsState.tvStats.totalRated} {t('statistics.ratings.rated', { defaultValue: 'rated' })}</Text>
              <Text variant="body" color="muted">{bulletSep}</Text>
              <Text variant="body" color="muted">
                {ratingsState.tvStats.totalUnrated} {t('statistics.ratings.unrated', { defaultValue: 'unrated' })}
                {ratingsState.tvStats.unratedPercentText}
              </Text>
            </Inline>
          </Inline>

          {/* Scenes counts */}
          {ratingsState.activeSessionMode === 'nsfw' && (
            <Inline gap="md" align="center" justify="between">
              <Text variant="body" color="muted" weight="medium">
                {t('tabs.scenes', { defaultValue: 'Scenes' })}
              </Text>
              <Inline gap="sm" align="center">
                <Text variant="body" color="primary" weight="semibold">{ratingsState.scenesStats.totalRated} {t('statistics.ratings.rated', { defaultValue: 'rated' })}</Text>
                <Text variant="body" color="muted">{bulletSep}</Text>
                <Text variant="body" color="muted">
                  {ratingsState.scenesStats.totalUnrated} {t('statistics.ratings.unrated', { defaultValue: 'unrated' })}
                  {ratingsState.scenesStats.unratedPercentText}
                </Text>
              </Inline>
            </Inline>
          )}

          {/* Videos counts */}
          <Inline gap="md" align="center" justify="between">
            <Text variant="body" color="muted" weight="medium">
              {t('tabs.videos', { defaultValue: 'Videos' })}
            </Text>
            <Inline gap="sm" align="center">
              <Text variant="body" color="primary" weight="semibold">{ratingsState.videosStats.totalRated} {t('statistics.ratings.rated', { defaultValue: 'rated' })}</Text>
              <Text variant="body" color="muted">{bulletSep}</Text>
              <Text variant="body" color="muted">
                {ratingsState.videosStats.totalUnrated} {t('statistics.ratings.unrated', { defaultValue: 'unrated' })}
                {ratingsState.videosStats.unratedPercentText}
              </Text>
            </Inline>
          </Inline>
        </Stack>
      </Card>

      {/* CARD 3: Talents Stats */}
      <Card
        variant="flat-glass"
        padding="md"
        divider
        eyebrow={t('statistics.ratings.talents', { defaultValue: 'Talents' })}
        actions={<Users size={16} className={styles['glow-muted']} />}
      >
        <Stack gap="sm" justify="center" fullHeight>
          {/* People Avg Rating */}
          <Inline gap="md" align="center" justify="between">
            <Text variant="body" color="muted" weight="medium">
              {t('statistics.ratings.average', { defaultValue: 'Average Rating' })}
            </Text>
            <Inline gap="md" align="center">
              <Text variant="title" color="primary" weight="bold">{ratingsState.peopleStats.average}</Text>
              <SegmentedRating
                readonly
                showLabel={false}
                value={ratingsState.peopleStats.averageNum}
                t={t}
              />
            </Inline>
          </Inline>

          {/* People counts */}
          <Inline gap="md" align="center" justify="between">
            <Text variant="body" color="muted" weight="medium">
              {t('statistics.ratings.totalRated', { defaultValue: 'Total Rated' })}
            </Text>
            <Inline gap="sm" align="center">
              <Text variant="body" color="primary" weight="semibold">{ratingsState.peopleStats.totalRated} {t('statistics.ratings.rated', { defaultValue: 'rated' })}</Text>
              <Text variant="body" color="muted">{bulletSep}</Text>
              <Text variant="body" color="muted">
                {ratingsState.peopleStats.totalUnrated} {t('statistics.ratings.unrated', { defaultValue: 'unrated' })}
                {ratingsState.peopleStats.unratedPercentText}
              </Text>
            </Inline>
          </Inline>

          {/* People Favorites */}
          <Inline gap="md" align="center" justify="between">
            <Text variant="body" color="muted" weight="medium">
              {ratingsState.activeSessionMode === 'nsfw'
                ? (t('statistics.ratings.favoritePerformers') || 'Top Adult Stars')
                : (t('statistics.ratings.favoriteArtists') || 'Top Stars')}
            </Text>
            <Inline gap="sm" align="center">
              <Text variant="title" color="primary" weight="bold">{ratingsState.peopleStats.favoritesCount}</Text>
              <Heart size={14} className={styles['glow-danger']} fill="currentColor" />
            </Inline>
          </Inline>
        </Stack>
      </Card>

      {/* CARD 4: Studios Stats */}
      <Card
        variant="flat-glass"
        padding="md"
        divider
        eyebrow={t('tabs.studios', { defaultValue: 'Studios' })}
        actions={<Film size={16} className={styles['glow-blue']} />}
      >
        <Stack gap="sm" justify="center" fullHeight>
          {/* Studios Avg Rating */}
          <Inline gap="md" align="center" justify="between">
            <Text variant="body" color="muted" weight="medium">
              {t('statistics.ratings.average', { defaultValue: 'Average Rating' })}
            </Text>
            <Inline gap="md" align="center">
              <Text variant="title" color="primary" weight="bold">{ratingsState.studiosStats.average}</Text>
              <SegmentedRating
                readonly
                showLabel={false}
                value={ratingsState.studiosStats.averageNum}
                t={t}
              />
            </Inline>
          </Inline>

          {/* Studios counts */}
          <Inline gap="md" align="center" justify="between">
            <Text variant="body" color="muted" weight="medium">
              {t('statistics.ratings.totalRated', { defaultValue: 'Total Rated' })}
            </Text>
            <Inline gap="sm" align="center">
              <Text variant="body" color="primary" weight="semibold">{ratingsState.studiosStats.totalRated} {t('statistics.ratings.rated', { defaultValue: 'rated' })}</Text>
              <Text variant="body" color="muted">{bulletSep}</Text>
              <Text variant="body" color="muted">
                {ratingsState.studiosStats.totalUnrated} {t('statistics.ratings.unrated', { defaultValue: 'unrated' })}
                {ratingsState.studiosStats.unratedPercentText}
              </Text>
            </Inline>
          </Inline>

          {/* Studios Favorites */}
          <Inline gap="md" align="center" justify="between">
            <Text variant="body" color="muted" weight="medium">
              {t('statistics.ratings.favoriteStudios', { defaultValue: 'Top Studios' })}
            </Text>
            <Inline gap="sm" align="center">
              <Text variant="title" color="primary" weight="bold">{ratingsState.studiosStats.favoritesCount}</Text>
              <Heart size={14} className={styles['glow-danger']} fill="currentColor" />
            </Inline>
          </Inline>
        </Stack>
      </Card>
    </Grid>
  );
}

