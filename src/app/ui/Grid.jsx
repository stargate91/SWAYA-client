import PropTypes from 'prop-types';
import styles from './Grid.module.css';

/**
 * Grid layout primitive to display items in a responsive grid.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {'poster' | 'scene' | 'backdrop' | 'logo' | 'mixed' | 'auto-poster' | 'auto-scene' | 'stats' | 'bento' | 'split' | 'auto-card' | 'picker' | 'default' | 'auto-fit' | 'auto-gallery' | 'auto-fill-xs' | 'auto-fit-xs' | 'two-cols' | 'three-cols' | 'specs'} [props.variant] - The type/variant of the grid layout
 * @param {'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'} [props.gap] - Custom gap token
 * @param {string} [props.className] - Additional class name
 * @param {object} [props.style] - Inline style override
 */
export default function Grid({ as: Component = 'div', children, variant = 'default', gap, columns, className = '', ...props }) {
  let resolvedVariant = variant;
  if (variant === 'default' && columns) {
    if (columns === 2) resolvedVariant = 'two-cols';
    else if (columns === 3) resolvedVariant = 'three-cols';
  }

  return (
    <Component
      data-variant={resolvedVariant}
      {...(gap ? { 'data-gap': gap } : {})}
      className={`${styles.grid} ui-grid ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}

Grid.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'default',
    'poster',
    'scene',
    'backdrop',
    'logo',
    'mixed',
    'auto-poster',
    'auto-scene',
    'auto-gallery',
    'stats',
    'bento',
    'split',
    'auto-card',
    'picker',
    'specs',
    'auto-fit',
    'auto-fill-xs',
    'auto-fit-xs',
    'two-cols',
    'three-cols',
    'hero-detail',
    'carousel-2row',
  ]),
  columns: PropTypes.oneOf([2, 3]),
  gap: PropTypes.oneOf(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']),
  className: PropTypes.string,
  style: PropTypes.object,
};

