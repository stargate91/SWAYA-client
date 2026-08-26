import PropTypes from 'prop-types';
import Badge from '@/ui/Badge';
import CardMetadata from '@/ui/CardMetadata';
import PosterCard from '@/ui/PosterCard';
import CompactCard from '@/ui/CompactCard';
import Text from '@/ui/Text';
import { useMatchCandidateCard } from '../../hooks/useMatchCandidateCard';

export default function MatchCandidateCard({
  candidate,
  sourceLabel,
  variant = 'list',
  mode,
  isResolvingId,
  isBrowserLoading,
  onSelect,
  t,
  rowStatus,
}) {
  const {
    candidateId,
    aspect,
    displayTitle,
    displayYear,
    posterUrl,
    typeLabel,
    fallbackIcon,
    isDisabled,
    isResolving,
    activeBadge,
    handleSelect,
  } = useMatchCandidateCard({
    candidate,
    mode,
    isResolvingId,
    isBrowserLoading,
    rowStatus,
    onSelect,
    t,
  });

  if (variant === 'poster') {
    return (
      <PosterCard
        key={`${sourceLabel}-${candidateId}`}
        customStyle={{
          '--ui-poster-card-width': aspect === 'landscape' ? '17.5rem' : '9rem',
          flexShrink: 0,
        }}
        aspect={aspect}
        imageUrl={posterUrl}
        icon={fallbackIcon}
        onClick={handleSelect}
        disabled={isDisabled}
        title={displayTitle}
        subtitle={
          <CardMetadata.Row
            items={[
              displayYear,
              typeLabel,
            ]}
          />
        }
        overlay={
          activeBadge ? (
            <Badge family="status" variant="overlay" tone={activeBadge.tone}>
              {activeBadge.label}
            </Badge>
          ) : null
        }
      />
    );
  }

  const rightAction = isResolving ? (
    <Text variant="small" color="muted">
      {t('organizer.details.matchModal.applying')}
    </Text>
  ) : null;

  return (
    <CompactCard
      key={`${sourceLabel}-${candidateId}`}
      imageUrl={posterUrl}
      fallbackIcon={fallbackIcon}
      aspect={aspect}
      title={displayTitle}
      badge={
        activeBadge ? (
          <Badge family="status" tone={activeBadge.tone} variant="inline">
            {activeBadge.label}
          </Badge>
        ) : null
      }
      active={candidate.is_active}
      disabled={isDisabled}
      onClick={handleSelect}
      meta={
        <CardMetadata.Row
          items={[
            displayYear,
            typeLabel,
          ]}
        />
      }
      description={candidate.overview}
      rightElement={rightAction}
    />
  );
}

MatchCandidateCard.propTypes = {
  candidate: PropTypes.object.isRequired,
  sourceLabel: PropTypes.string,
  variant: PropTypes.oneOf(['list', 'poster']),
  mode: PropTypes.string,
  isResolvingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isBrowserLoading: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  rowStatus: PropTypes.string,
};

