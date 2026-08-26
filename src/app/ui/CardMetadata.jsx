import { memo } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@/ui/Tooltip';
import Pill from '@/ui/Pill';
import { Star } from '@/ui/icons';
import { formatRating } from '@/lib/formatters';
import Inline from '@/ui/Inline';
import { useCardMetadataItems } from './useCardMetadataItems';
import styles from './CardMetadata.module.css';

const CardMetadata = memo(function CardMetadata({
  title,
  onTitleClick,
  subtitle,
  hoverSubtitle,
  performers,
  ratingImdb,
  ratingTmdb,
  ratingTheporndb,
  ratingPill,
  sortKey,
  date,
  className = '',
  titleClassName = '',
  subtitleRowClassName = '',
  subtitleClassName = '',
  performerLinkClassName = '',
  metaRightClassName = '',
  dateClassName = '',
  tooltipTriggerClassName = '',
  ...props
}) {
  const { activeRating } = useCardMetadataItems({
    ratingImdb,
    ratingTmdb,
    ratingTheporndb,
    ratingPill,
    sortKey,
  });

  if (!title && !subtitle && (!performers || performers.length === 0) && !ratingImdb && !ratingTmdb && !ratingTheporndb && !ratingPill && !date) {
    return null;
  }

  const renderRating = () => {
    if (ratingPill) return ratingPill;

    if (activeRating) {
      return (
        <Pill variant={activeRating.variant}>
          <Star size={10} fill="currentColor" strokeWidth={1.8} />
          {formatRating(activeRating.val)}
        </Pill>
      );
    }

    return null;
  };

  return (
    <div className={className} {...props}>
      {title && (
        typeof title === 'string' ? (
          <Tooltip content={title} side="top" triggerClassName={tooltipTriggerClassName}>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
              className={titleClassName}
              onClick={onTitleClick}
              role={onTitleClick ? 'button' : undefined}
              tabIndex={onTitleClick ? 0 : undefined}
              onKeyDown={onTitleClick ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onTitleClick(e);
                }
              } : undefined}
            >
              {title}
            </div>
          </Tooltip>
        ) : (
          title
        )
      )}
      {(subtitle || performers?.length > 0 || ratingImdb || ratingTmdb || ratingTheporndb || ratingPill || date) && (
        hoverSubtitle ? (
          <div className={`${styles['subtitle-swap']} ${subtitleRowClassName}`}>
            <div className={styles['subtitle-swap__default']} data-swap-layer="default">
              {subtitle && (
                <div className={subtitleClassName}>
                  {subtitle}
                </div>
              )}
              {(ratingImdb || ratingTmdb || ratingTheporndb || ratingPill) && (
                <div className={metaRightClassName}>
                  {renderRating()}
                </div>
              )}
            </div>
            <div className={`${styles['subtitle-swap__hover']} ${subtitleClassName}`} data-swap-layer="hover">
              {hoverSubtitle}
            </div>
          </div>
        ) : (
          <div className={subtitleRowClassName}>
            {performers && performers.length > 0 ? (
              <div className={subtitleClassName}>
                {performers.map((p, idx) => (
                  <span key={`${p.id}-${idx}`}>
                    {idx > 0 && ', '}
                    <a
                      href={`#/library/people/${p.id}`}
                      className={`${styles['performer-link']} ${performerLinkClassName || ''}`.trim()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {p.name}
                    </a>
                  </span>
                ))}
              </div>
            ) : (
              subtitle && (
                <div className={subtitleClassName}>
                  {subtitle}
                </div>
              )
            )}
            {(date || ratingImdb || ratingTmdb || ratingTheporndb || ratingPill) && (
              <div className={metaRightClassName}>
                {date && <span className={dateClassName}>{date}</span>}
                {renderRating()}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
});

CardMetadata.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onTitleClick: PropTypes.func,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  hoverSubtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  performers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  ratingImdb: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ratingTmdb: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ratingTheporndb: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ratingPill: PropTypes.node,
  sortKey: PropTypes.string,
  date: PropTypes.string,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  subtitleRowClassName: PropTypes.string,
  subtitleClassName: PropTypes.string,
  performerLinkClassName: PropTypes.string,
  metaRightClassName: PropTypes.string,
  dateClassName: PropTypes.string,
  tooltipTriggerClassName: PropTypes.string,
};

export const CardMetadataRow = function CardMetadataRow({ items = [], className = '' }) {
  const { filteredItems } = useCardMetadataItems({ items });

  return (
    <Inline gap="xs" align="center" className={`${styles.row} ${className}`.trim()}>
      {filteredItems.map((item, index) => (
        <span key={`${String(item)}-${index}`} className={styles.item}>
          {item}
        </span>
      ))}
    </Inline>
  );
};

CardMetadataRow.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
};

CardMetadata.Row = CardMetadataRow;

export default CardMetadata;
