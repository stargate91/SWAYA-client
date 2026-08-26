/**
 * Calculates responsive column count based on grid variant and container width.
 */
export function getGridColumnCount(variant, width) {
  if (!width || width <= 0) return 4;

  if (variant === 'scene' || variant === 'auto-scene') {
    if (width >= 1500) return 4;
    if (width >= 1050) return 3;
    if (width >= 600) return 2;
    return 1;
  }

  if (variant === 'backdrop') {
    if (width >= 1200) return 4;
    if (width >= 800) return 3;
    if (width >= 320) return 2;
    return 1;
  }

  if (variant === 'picker') {
    if (width >= 1200) return 6;
    if (width >= 800) return 4;
    if (width >= 420) return 3;
    if (width >= 260) return 2;
    return 1;
  }

  if (variant === 'logo') {
    if (width >= 1600) return 6;
    if (width >= 1200) return 5;
    if (width >= 800) return 4;
    if (width >= 500) return 3;
    return 2;
  }

  if (variant === 'auto-gallery') {
    return Math.max(1, Math.floor(width / 288));
  }

  if (variant === 'auto-tags' || variant === 'tag') {
    if (width >= 1600) return 6;
    if (width >= 1200) return 5;
    if (width >= 750) return 3;
    return 2;
  }

  // Default / poster / auto-poster / mixed
  if (width >= 1600) return 8;
  if (width >= 1100) return 6;
  if (width >= 700) return 4;
  return 2;
}

/**
 * Resolves tokenized gap name to pixel value.
 */
export function getGapSizeInPx(gap) {
  switch (gap) {
    case '2xs': return 4;
    case 'xs': return 8;
    case 'sm': return 12;
    case 'md': return 16;
    case 'lg': return 20;
    case 'xl': return 24;
    case '2xl': return 32;
    case '3xl': return 40;
    default: return 24;
  }
}

/**
 * Calculates exact deterministic row height for grid variants based on container width and column count.
 */
export function calculateRowHeight(variant, width, columnCount, gap) {
  if (width && columnCount > 0) {
    const gapPx = getGapSizeInPx(gap || ((variant === 'backdrop' || variant === 'logo' || variant === 'picker') ? 'md' : 'xl'));
    const totalGaps = (columnCount - 1) * gapPx;
    const itemWidth = Math.max(0, (width - totalGaps) / columnCount);
    const rowBottomPadding = gapPx;

    switch (variant) {
      case 'scene':
      case 'auto-scene': {
        const mediaHeight = itemWidth / (16 / 9);
        const detailsHeight = 52;
        return Math.round(mediaHeight + detailsHeight + rowBottomPadding);
      }
      case 'backdrop': {
        const mediaHeight = itemWidth / (16 / 9);
        return Math.round(mediaHeight + rowBottomPadding);
      }
      case 'logo': {
        const mediaHeight = itemWidth / (16 / 9);
        const detailsHeight = 44;
        return Math.round(mediaHeight + detailsHeight + rowBottomPadding);
      }
      case 'auto-tags':
      case 'tag': {
        return Math.round(itemWidth + rowBottomPadding);
      }
      case 'auto-gallery': {
        return Math.round(itemWidth * 0.8 + rowBottomPadding);
      }
      case 'picker': {
        const mediaHeight = itemWidth / (2 / 3);
        return Math.round(mediaHeight + rowBottomPadding);
      }
      case 'poster':
      case 'auto-poster':
      default: {
        const mediaHeight = itemWidth / (2 / 3);
        const detailsHeight = 54;
        return Math.round(mediaHeight + detailsHeight + rowBottomPadding);
      }
    }
  }
  return getDefaultRowHeight(variant);
}

/**
 * Default estimated row heights for each variant.
 */
export function getDefaultRowHeight(variant) {
  switch (variant) {
    case 'scene':
    case 'auto-scene':
      return 310;
    case 'backdrop':
      return 130;
    case 'picker':
      return 220;
    case 'logo':
      return 200;
    case 'auto-gallery':
      return 240;
    case 'auto-tags':
    case 'tag':
      return 230;
    case 'poster':
    case 'auto-poster':
    default:
      return 400;
  }
}
