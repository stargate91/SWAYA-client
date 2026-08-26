import { Calendar, Clock, Video, Globe } from '@/ui/icons';
import Pill from '@/ui/Pill';
import { formatRating } from '@/lib/formatters';
import { useTranslation } from '@/providers/LanguageContext';
import { useMediaDetailContext } from './MediaDetailContext';
import { useActiveMediaRating } from '../../hooks/useActiveMediaRating';
import styles from './MediaHeaderInfo.module.css';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import Tooltip from '@/ui/Tooltip';

export default function MediaHeaderInfo({ isFallbackGrid = false }) {
  const t = useTranslation().t;
  const { state, handleOpenLogoModal } = useMediaDetailContext();
  const {
    title,
    logoUrl,
    showOriginalTitle,
    originalTitle,
    tagline,
    taglineText,
    metaDate,
    isMovie,
    isScene,
    formattedDuration,
    seasonsText,
    episodesText,
    langText,
    ratingImdb,
    ratingTmdb,
    normalizedGenres,
    item,
    showStudioPill,
    showNetworkPill,
    studioName,
    networkName,
  } = state;

  const activeRating = useActiveMediaRating(state);

  return (
    <div className={`${styles.layout} ${isFallbackGrid ? styles['layout-fallback'] : ''}`}>
      <Stack gap="4xl" fullWidth>
        <Tooltip
          content={logoUrl ? (t('library.details.changeLogo') || 'Change Logo') : (t('library.details.addLogo') || 'Add Logo')}
          side="top"
          triggerClassName={styles['logo-tooltip']}
        >
          <div
            className={`${styles['logo-container']} ${styles.clickable}`}
            role="button"
            tabIndex={0}
            onClick={handleOpenLogoModal}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleOpenLogoModal();
              }
            }}
          >
            {logoUrl ? (
              <img src={logoUrl} alt={title} className={styles.logo} />
            ) : (
              <Text as="h1" variant={(isFallbackGrid || isScene) ? 'hero' : 'title'} shadow="title" className={styles['fallback-title']}>{title}</Text>
            )}
          </div>
        </Tooltip>

        <Stack gap="md" fullWidth>
          {logoUrl && (isScene || item?.type === 'scene') && (
            <Text as="h1" variant="hero" shadow="title" className={styles['scene-title-below-logo']}>{title}</Text>
          )}

          <Stack gap="md" className={styles['details-group']}>
            {showOriginalTitle && (
              <Text as="div" variant="body" color="muted" weight="medium" italic>
                {originalTitle}
              </Text>
            )}

            {tagline && (
              <Text as="div" variant="body" color="accent" weight="medium" italic shadow="tagline">
                {taglineText}
              </Text>
            )}

            {(metaDate || formattedDuration || seasonsText || episodesText || langText || ratingImdb || ratingTmdb || showStudioPill || showNetworkPill) && (
              <Inline gap="lg" align="center">
                {showStudioPill && (
                  <Pill variant="meta">
                    <Video size={14} />
                    {studioName}
                  </Pill>
                )}
                {showNetworkPill && (
                  <Pill variant="meta">
                    <Globe size={14} />
                    {networkName}
                  </Pill>
                )}
                {metaDate && (
                  <Pill variant="meta">
                    <Calendar size={14} />
                    {metaDate}
                  </Pill>
                )}
                {(isMovie || isScene) && formattedDuration && (
                  <Pill variant="meta">
                    <Clock size={14} />
                    {formattedDuration}
                  </Pill>
                )}
                {!isMovie && !isScene && seasonsText && (
                  <Pill variant="meta">
                    {seasonsText}
                  </Pill>
                )}
                {!isMovie && !isScene && episodesText && (
                  <Pill variant="meta">
                    {episodesText}
                  </Pill>
                )}
                {langText && (
                  <Pill variant="meta">
                    {langText}
                  </Pill>
                )}
                {activeRating && (
                  <Pill variant="meta">
                    <img
                      src={activeRating.logo}
                      alt={activeRating.type === 'imdb' ? 'IMDb' : activeRating.type === 'tmdb' ? 'TMDb' : 'ThePornDB'}
                    />
                    <span>
                      {formatRating(activeRating.val)}
                    </span>
                  </Pill>
                )}
              </Inline>
            )}

            {normalizedGenres && normalizedGenres.length > 0 && (
              <Inline gap="lg" align="center">
                {normalizedGenres.map((genre, idx) => (
                  <Pill key={idx} variant="meta">
                    {t(`dynamic.genres.${genre}`, { defaultValue: genre }).toUpperCase()}
                  </Pill>
                ))}
              </Inline>
            )}
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
