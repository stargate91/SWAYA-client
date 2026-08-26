import PropTypes from 'prop-types';
import { Check, ENTITY_ICONS } from '@/ui/icons';
import Badge from '@/ui/Badge';
import PosterCard from '@/ui/PosterCard';
import CardMetadata from '@/ui/CardMetadata';
import Button from '@/ui/Button';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import Inline from '@/ui/Inline';
import { useAutoScrollHighlight } from '@/hooks/useAutoScrollHighlight';

export default function MatchEpisodeCard({
  episodeEntry,
  isBucketed,
  isDisabled,
  onSelect,
  onToggle,
  isActive = false,
  isHighlighted = false,
  t,
}) {
  const stillUrl = resolveMediaImageUrl(episodeEntry.still_path, 'thumbnail');
  const cardRef = useAutoScrollHighlight(isHighlighted, { delay: 150, block: 'center' });

  const subtitleNode = (
    <Inline align="center" gap="sm" justify="between" fullWidth>
      <CardMetadata.Row
        items={[
          `E${episodeEntry.episode_number}`,
          episodeEntry.air_date ? String(episodeEntry.air_date).slice(0, 10) : null,
        ]}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(episodeEntry);
        }}
        disabled={isDisabled}
      >
        {t('common.select') || 'Select'}
      </Button>
    </Inline>
  );

  const badgeNode = (
    <>
      {isBucketed && (
        <Badge
          variant="top-right"
          family="status"
          tone="accent"
          size="xs"
          roundness="full"
          leftIcon={<Check size={12} strokeWidth={3} />}
        />
      )}
      {isActive && (
        <Badge family="status" variant="overlay" tone="accent">
          {t('organizer.details.matchModal.current')}
        </Badge>
      )}
    </>
  );

  return (
    <PosterCard
      ref={cardRef}
      imageUrl={stillUrl}
      icon={ENTITY_ICONS.episode}
      title={episodeEntry.name || t('organizer.details.matchModal.episodeNum').replace('{number}', episodeEntry.episode_number)}
      subtitle={subtitleNode}
      onClick={() => onToggle(episodeEntry.episode_number)}
      disabled={isDisabled}
      active={isHighlighted}
      selected={isBucketed}
      aspect="landscape"
      fluid={true}
      overlay={badgeNode}
    />
  );
}

MatchEpisodeCard.propTypes = {
  episodeEntry: PropTypes.object.isRequired,
  isBucketed: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  t: PropTypes.func.isRequired,
};
