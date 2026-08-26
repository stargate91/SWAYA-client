import PropTypes from 'prop-types';
import Text from '@/ui/Text';
import ImageTooltip from '@/ui/ImageTooltip';
import { useRatingsTitleCellModel } from '../hooks/useRatingsTitleCellModel';

export default function RatingsTitleCell({
  row,
  mediaType,
  settings,
  onNavigate,
}) {
  const {
    displayTitle,
    showTooltip,
    tooltipProps,
    textEventProps,
  } = useRatingsTitleCellModel({ row, mediaType, settings });

  return (
    <>
      <Text
        interactive
        onClick={onNavigate}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onNavigate();
          }
        }}
        {...textEventProps}
      >
        {displayTitle}
      </Text>
      {showTooltip && (
        <ImageTooltip {...tooltipProps} />
      )}
    </>
  );
}

RatingsTitleCell.propTypes = {
  row: PropTypes.object.isRequired,
  mediaType: PropTypes.string,
  settings: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
};
