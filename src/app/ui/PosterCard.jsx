import { memo } from 'react';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import CardMetadata from './CardMetadata';
import PosterCardMedia from './posterCard/PosterCardMedia';
import PosterCardBadges from './posterCard/PosterCardBadges';
import PosterCardTitleOverlay from './posterCard/PosterCardTitleOverlay';
import { usePosterCard } from './posterCard/usePosterCard';
import styles from './PosterCard.module.css';

export { PosterCardMedia, PosterCardBadges, PosterCardTitleOverlay };

const PosterCard = memo(function PosterCard({
  as: Component,
  className = '',
  variant = 'default',
  aspect = 'poster',
  size,
  imageUrl,
  backgroundColor,
  icon: IconComponent,
  placeholderText,
  title,
  subtitle,
  hoverSubtitle,
  userRating = 0,
  isFavorite = false,
  topRightAction,
  topLeftAction,
  bottomAction,
  isWatched = false,
  progressPercent,
  overlay,
  playOverlay,
  ratingImdb,
  ratingTmdb,
  ratingTheporndb,
  ratingPill,
  performers,
  date,
  onClick,
  disabled = false,
  active = false,
  selected = false,
  disableHoverAnimation = false,
  fillHeight = false,
  fluid = false,
  imageWrapperClassName = '',
  imageClassName = '',
  loading = 'lazy',
  style,
  customStyle,
  children,
  previewSrc = null,
  isLoadingPreview = false,
  onHoverChange,
  isMissing = false,
  altText,
  sortKey,
  ...props
}) {
  const isOverlayTitle = variant === 'overlay-title';

  const {
    DefaultComponent,
    imageError,
    handleImageError,
    isVideoPlaying,
    handleVideoPlaying,
    handleMouseEnter,
    handleMouseLeave,
    cardClassName,
    interactiveProps,
    computedStyle,
  } = usePosterCard({
    imageUrl,
    previewSrc,
    onClick,
    onHoverChange,
    asComponent: Component,
    size,
    active,
    disableHoverAnimation,
    className,
    style,
    customStyle,
  });

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cardClassName}
      data-aspect={aspect}
      data-variant={variant}
      data-fill-height={fillHeight}
      data-fluid={fluid || undefined}
      data-selected={selected || undefined}
      data-clickable={!!onClick || undefined}
      data-missing={isMissing || undefined}
      // eslint-disable-next-line react/forbid-dom-props
      style={computedStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={disabled ? undefined : onClick}
      {...interactiveProps}
      {...props}
    >
      <div className={styles['media-shell']}>
        <DefaultComponent
          className={`${styles['image-wrapper']} ${imageWrapperClassName}`.trim()}
        >
          <PosterCardMedia
            imageUrl={imageUrl}
            imageError={imageError}
            handleImageError={handleImageError}
            altText={altText}
            imageClassName={imageClassName}
            backgroundColor={backgroundColor}
            icon={IconComponent}
            placeholderText={placeholderText}
            previewSrc={previewSrc}
            isVideoPlaying={isVideoPlaying}
            handleVideoPlaying={handleVideoPlaying}
            aspect={aspect}
            fillHeight={fillHeight}
            isMissing={isMissing}
            disableHoverAnimation={disableHoverAnimation}
            loading={loading}
          >
            {overlay}
            <PosterCardBadges
              userRating={userRating}
              isFavorite={isFavorite}
              isWatched={isWatched}
              progressPercent={progressPercent}
            />
            {isOverlayTitle ? (
              <PosterCardTitleOverlay
                title={title}
                subtitle={subtitle}
                hoverSubtitle={hoverSubtitle}
              />
            ) : null}
            {children}
          </PosterCardMedia>
        </DefaultComponent>
        {topLeftAction}
        {topRightAction}
        {bottomAction}
        {playOverlay ? (
          <IconButton
            type="button"
            variant="play-overlay"
            className={`${styles['play-overlay']} ${
              isLoadingPreview ? styles['play-overlay--loading'] : ''
            } ${active ? styles['play-overlay--active'] : ''}`.trim()}
            onClick={playOverlay.onClick}
            label={playOverlay.label}
            title={null}
            disabled={playOverlay.disabled}
          >
            {isLoadingPreview && (
              <span className={styles['play-overlay-spinner']} />
            )}
            {playOverlay.icon}
          </IconButton>
        ) : null}
      </div>

      {!isOverlayTitle && (
        <CardMetadata
          title={title}
          subtitle={subtitle}
          hoverSubtitle={hoverSubtitle}
          performers={performers}
          ratingImdb={ratingImdb}
          ratingTmdb={ratingTmdb}
          ratingTheporndb={ratingTheporndb}
          ratingPill={ratingPill}
          date={date}
          className={styles.details}
          titleClassName={styles.title}
          subtitleRowClassName={styles['subtitle-row']}
          subtitleClassName={styles.subtitle}
          metaRightClassName={styles['meta-right']}
          dateClassName={styles.date}
          tooltipTriggerClassName={styles['tooltip-trigger']}
          sortKey={sortKey}
        />
      )}
    </div>
  );
});

PosterCard.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  className: PropTypes.string,
  variant: PropTypes.string,
  aspect: PropTypes.string,
  imageUrl: PropTypes.string,
  backgroundColor: PropTypes.string,
  icon: PropTypes.elementType,
  placeholderText: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  hoverSubtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  userRating: PropTypes.number,
  isFavorite: PropTypes.bool,
  topRightAction: PropTypes.node,
  topLeftAction: PropTypes.node,
  bottomAction: PropTypes.node,
  isWatched: PropTypes.bool,
  progressPercent: PropTypes.number,
  overlay: PropTypes.node,
  playOverlay: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.node.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
  }),
  ratingImdb: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ratingTmdb: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ratingTheporndb: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ratingPill: PropTypes.node,
  sortKey: PropTypes.string,
  performers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  date: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  disableHoverAnimation: PropTypes.bool,
  fillHeight: PropTypes.bool,
  fluid: PropTypes.bool,
  imageWrapperClassName: PropTypes.string,
  imageClassName: PropTypes.string,
  style: PropTypes.object,
  customStyle: PropTypes.object,
  children: PropTypes.node,
  previewSrc: PropTypes.string,
  isLoadingPreview: PropTypes.bool,
  onHoverChange: PropTypes.func,
  isMissing: PropTypes.bool,
  size: PropTypes.string,
  altText: PropTypes.string,
};

export default PosterCard;
