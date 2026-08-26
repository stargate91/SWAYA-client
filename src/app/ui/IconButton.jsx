import styles from './IconButton.module.css';

/**
 * IconButton wraps an icon inside a styled button.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Icon element to render
 * @param {string} [props.className] - Additional custom class names
 * @param {'primary' | 'secondary' | 'secondary-neutral' | 'ghost' | 'danger' | 'flat-danger' | 'close' | 'play-overlay' | 'carousel-arrow' | 'glass' | 'success' | 'favorite'} [props.variant] - Button variant
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'md-btn'} [props.size] - Button size
 * @param {string} [props.label] - Accessible label
 * @param {string} [props.title] - Tooltip text
 * @param {boolean} [props.active] - Whether the button is in active/selected state
 * @param {boolean} [props.wrapped] - Optional border container wrapping
 * @param {boolean} [props.wrapperHoverOnly] - Transparent wrapper that appears on hover only
 */
export default function IconButton({
  as: Component = 'button',
  children,
  className = '',
  variant = 'secondary-neutral',
  size = 'md',
  label,
  title,
  active = false,
  wrapped = false,
  wrapperHoverOnly = false,
  destructiveHover = false,
  radius,
  ...props
}) {
  const accessibleLabel = label || title;

  const button = (
    <Component
      type={Component === 'button' ? (props.type || 'button') : undefined}
      data-variant={variant}
      data-size={size}
      data-active={active ? 'true' : undefined}
      data-destructive-hover={destructiveHover}
      data-radius={radius}
      className={`${styles['icon-button']} ui-icon-button ${className}`.trim()}
      aria-label={accessibleLabel}
      title={title || undefined}
      {...props}
    >
      {children}
    </Component>
  );

  if (wrapped) {
    return (
      <div
        data-hover-only={wrapperHoverOnly ? 'true' : undefined}
        className={`${styles['icon-button-wrapper']} ui-icon-button-wrapper`}
      >
        {button}
      </div>
    );
  }

  return button;
}

import PropTypes from 'prop-types';
IconButton.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'secondary-neutral',
    'ghost',
    'danger',
    'flat-danger',
    'close',
    'play-overlay',
    'carousel-arrow',
    'glass',
    'success',
    'favorite',
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'md-btn']),
  label: PropTypes.string,
  title: PropTypes.string,
  active: PropTypes.bool,
  wrapped: PropTypes.bool,
  wrapperHoverOnly: PropTypes.bool,
  destructiveHover: PropTypes.bool,
  radius: PropTypes.oneOf(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full']),
};
