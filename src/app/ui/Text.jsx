import PropTypes from 'prop-types';
import styles from './Text.module.css';

/**
 * Standard typography component.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as] - HTML tag to render
 * @param {'body' | 'caption' | 'title' | 'display' | 'small' | 'xsmall' | 'hero'} [props.variant] - Text styling flavor
 * @param {'primary' | 'secondary' | 'muted' | 'faint' | 'accent' | 'success' | 'danger' | 'ink'} [props.color] - Text color
 * @param {'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'} [props.weight] - Font weight override
 * @param {boolean} [props.uppercase] - Whether to transform text to uppercase
 * @param {'tight' | 'normal' | 'wide' | 'wider' | 'widest'} [props.tracking] - Letter-spacing flavor
 * @param {string} [props.className] - Additional custom class names
 * @param {React.ReactNode} props.children
 */
export default function Text({
  as: Component = 'span',
  variant = 'body',
  size,
  color = 'primary',
  leading,
  weight,
  uppercase = false,
  tracking,
  truncate = false,
  clamp,
  preserveWhitespace = false,
  italic = false,
  interactive = false,
  tabular = false,
  mono = false,
  breakAll = false,
  strikethrough = false,
  align,
  width,
  maxWidth,
  shadow,
  style,
  className = '',
  children,
  ...props
}) {
  const classes = [
    styles.root,
    styles[`variant-${variant}`],
    size && styles[`size-${size}`],
    styles[`color-${color}`],
    leading && styles[`leading-${leading}`],
    weight && styles[`weight-${weight}`],
    uppercase && styles.uppercase,
    tracking && styles[`tracking-${tracking}`],
    truncate && styles.truncate,
    clamp && styles.clamp,
    preserveWhitespace && styles['preserve-whitespace'],
    italic && styles.italic,
    interactive && styles.interactive,
    shadow && styles[`shadow-${shadow}`],
    tabular && styles.tabular,
    (mono || variant === 'mono') && styles.mono,
    breakAll && styles['break-all'],
    strikethrough && styles.strikethrough,
    align && styles[`align-${align}`],
    className
  ].filter(Boolean).join(' ');

  const mergedStyle = {
    ...style,
    ...(clamp ? { '--text-clamp': clamp } : {}),
    ...(width ? { width, display: style?.display || 'inline-block' } : {}),
    ...(maxWidth ? { maxWidth } : {}),
  };

  return (
    <Component {...props} {...{ className: classes, style: mergedStyle }}>
      {children}
    </Component>
  );
}

Text.propTypes = {
  as: PropTypes.elementType,
  variant: PropTypes.oneOf(['body', 'caption', 'title', 'display', 'small', 'xsmall', 'hero', 'mono']),
  size: PropTypes.oneOf(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']),
  color: PropTypes.oneOf(['primary', 'primary-80', 'translucent', 'secondary', 'muted', 'faint', 'accent', 'success', 'danger', 'ink', 'tmdb']),
  leading: PropTypes.oneOf(['relaxed', 'normal', 'tight']),
  weight: PropTypes.oneOf(['normal', 'medium', 'semibold', 'bold', 'extrabold']),
  uppercase: PropTypes.bool,
  tracking: PropTypes.oneOf(['tight', 'normal', 'wide', 'wider', 'widest']),
  truncate: PropTypes.bool,
  clamp: PropTypes.number,
  italic: PropTypes.bool,
  interactive: PropTypes.bool,
  shadow: PropTypes.oneOf(['title', 'tagline']),
  tabular: PropTypes.bool,
  mono: PropTypes.bool,
  breakAll: PropTypes.bool,
  strikethrough: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  children: PropTypes.node,
};
