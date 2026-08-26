import { memo } from 'react';
import PropTypes from 'prop-types';
import { useMediaDetailContext } from '../MediaDetailContext';
import { useTechnicalPanelData } from '../../../hooks/useTechnicalPanelData';
import Grid from '@/ui/Grid';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import SpecCard from '@/ui/data/SpecCard';
import {
  Clapperboard,
  Film,
  Volume2,
  Clock,
  Database,
  Sparkles,
  Layers,
  FastForward,
} from '@/ui/icons';

const ICON_MAP = {
  clapperboard: Clapperboard,
  film: Film,
  volume2: Volume2,
  clock: Clock,
  database: Database,
  sparkles: Sparkles,
  layers: Layers,
  fastForward: FastForward,
};

function TechnicalPanel({ showTitle = true, variant }) {
  const { state, t } = useMediaDetailContext();
  const { item, isMovie } = state || {};

  const {
    hasEditionSource,
    hasSpecs,
    gridVariant,
    editionSourceSpecs,
    technicalSpecs,
  } = useTechnicalPanelData({
    item,
    isMovie,
    variant,
    t,
  });

  return (
    <Stack gap="xl">
      {showTitle && hasEditionSource && (
        <Stack gap="md">
          <Text as="h4" variant="caption" uppercase color="muted">
            {t('library.details.editionAndSource') || 'Edition & Source'}
          </Text>
          <Grid variant={gridVariant} gap="sm">
            {editionSourceSpecs.map((spec) => {
              const IconComponent = ICON_MAP[spec.iconType] || Sparkles;
              return (
                <SpecCard
                  key={spec.key}
                  icon={<IconComponent size={16} />}
                  label={spec.label}
                  value={spec.value}
                  fullWidth
                />
              );
            })}
          </Grid>
        </Stack>
      )}

      {hasSpecs && (
        <Stack gap="md">
          {showTitle && (
            <Text as="h4" variant="caption" uppercase color="muted">
              {t('library.details.technicalInfo') || 'Technical Info'}
            </Text>
          )}
          <Grid variant={gridVariant} gap="sm">
            {technicalSpecs.map((spec) => {
              const IconComponent = ICON_MAP[spec.iconType] || Sparkles;
              return (
                <SpecCard
                  key={spec.key}
                  icon={<IconComponent size={16} />}
                  label={spec.label}
                  value={spec.value}
                  fullWidth
                />
              );
            })}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}

TechnicalPanel.propTypes = {
  showTitle: PropTypes.bool,
  variant: PropTypes.string,
};

export default memo(TechnicalPanel);
