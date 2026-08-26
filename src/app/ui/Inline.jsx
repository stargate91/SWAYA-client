/* eslint-disable react/forbid-component-props */
import PropTypes from 'prop-types';
import styles from './Inline.module.css';

export default function Inline({
  as: Component = 'div',
  gap,
  padding,
  align,
  justify,
  flex,
  fullWidth,
  fullHeight,
  height,
  maxHeight,
  wrap,
  surface,
  radius,
  interactive = false,
  className = '',
  style,
  children,
  ...props
}) {
  const isButton = Component === 'button';
  const classes = [
    styles.root,
    isButton && styles['as-button'],
    gap && styles[`gap-${gap}`],
    padding && styles[`padding-${padding}`],
    align && styles[`align-${align}`],
    justify && styles[`justify-${justify}`],
    surface && styles[`surface-${surface}`],
    radius && styles[`radius-${radius}`],
    interactive && styles.interactive,
    flex === 1 && styles['flex-1'],
    fullWidth && styles['full-width'],
    fullHeight && styles['full-height'],
    wrap === false && styles.nowrap,
    className
  ].filter(Boolean).join(' ');

  const mergedStyle = {
    ...style,
    ...(height ? { height } : {}),
    ...(maxHeight ? { maxHeight } : {}),
  };

  return (
    <Component
      type={isButton ? (props.type || 'button') : undefined}
      className={classes}
      style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
      {...props}
    >
      {children}
    </Component>
  );
}

Inline.propTypes = {
  as: PropTypes.elementType,
  gap: PropTypes.oneOf(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  padding: PropTypes.oneOf(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']),
  align: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  justify: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around']),
  surface: PropTypes.oneOf(['soft', 'card', 'glass']),
  radius: PropTypes.oneOf(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full']),
  interactive: PropTypes.bool,
  flex: PropTypes.number,
  fullWidth: PropTypes.bool,
  fullHeight: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrap: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

