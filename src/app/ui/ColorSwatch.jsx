import { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './ColorSwatch.module.css';

export default function ColorSwatch({
  color,
  selected = false,
  onClick,
  disabled = false,
  className = '',
  shape = 'circle', // 'circle' | 'square'
  size = 'md', // 'dot' | 'sm' | 'md'
  as: Component = onClick ? 'button' : 'span',
  'aria-label': ariaLabel,
  ...props
}) {
  // Use callback ref to set background-color dynamically without violating CSP or simple inline layout styles
  const ref = useCallback((node) => {
    if (node) {
      node.style.backgroundColor = color;
    }
  }, [color]);

  const componentProps = Component === 'button' ? {
    type: 'button',
    onClick,
    disabled,
  } : {};

  return (
    <Component
      ref={ref}
      className={`${styles.swatch} ${className}`.trim()}
      data-selected={selected}
      data-shape={shape}
      data-size={size}
      aria-label={ariaLabel || color}
      {...componentProps}
      {...props}
    />
  );
}

ColorSwatch.propTypes = {
  color: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  shape: PropTypes.oneOf(['circle', 'square']),
  size: PropTypes.oneOf(['dot', 'sm', 'md']),
  as: PropTypes.elementType,
  'aria-label': PropTypes.string,
};

