import { memo } from 'react';
import PropTypes from 'prop-types';
import Card from '@/ui/Card';
import Grid from '@/ui/Grid';
import Tooltip from '@/ui/Tooltip';
import RatingCard from '@/ui/data/RatingCard';
import { useMediaRatingsData } from '../../../hooks/useMediaRatingsData';

function BespokeRatingsSection({ item, activeHeaderRatingType, t }) {
  const {
    ratings,
    hasRatings,
    sectionTitle,
  } = useMediaRatingsData({
    item,
    activeHeaderRatingType,
    t,
  });

  if (!hasRatings) return null;

  return (
    <Card
      variant="glass-shaded"
      headerVariant="shaded"
      padding="md"
      title={sectionTitle}
    >
      <Grid variant="auto-fit-xs">
        {ratings.map((rating) => (
          <Tooltip key={rating.id} content={rating.alt} side="top" fullWidth>
            <RatingCard
              logoSrc={rating.logo}
              logoAlt={rating.alt}
              value={rating.value}
              size="sm"
              fullWidth
            />
          </Tooltip>
        ))}
      </Grid>
    </Card>
  );
}

BespokeRatingsSection.propTypes = {
  item: PropTypes.object,
  activeHeaderRatingType: PropTypes.string,
  t: PropTypes.func,
};

export default memo(BespokeRatingsSection);
