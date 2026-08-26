/* eslint-disable react/forbid-component-props */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Stack.module.css';

const Stack = forwardRef(({
  as: Component = 'div',
  size,
  gap,
  padding,
  justify,
  align,
  indent,
  fill = false,
  flex,
  fullWidth,
  fullHeight,
  maxHeight,
  scrollable = false,
  className = '',
  style,
  children,
  ...props
}, ref) => {
  const finalSize = gap || size || 'md';
  const classes = [
    styles.root,
    styles[`gap-${finalSize}`],
    padding && styles[`padding-${padding}`],
    justify && styles[`justify-${justify}`],
    align && styles[`align-${align}`],
    indent && styles[`indent-${indent}`],
    fill && styles.fill,
    flex === 1 && styles['flex-1'],
    fullWidth && styles['full-width'],
    fullHeight && styles['full-height'],
    scrollable && styles.scrollable,
    className,
  ].filter(Boolean).join(' ');

  const mergedStyle = {
    ...style,
    ...(maxHeight ? { maxHeight } : {}),
  };

  return (
    <Component
      ref={ref}
      className={classes}
      style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
      {...props}
    >
      {children}
    </Component>
  );
});

Stack.displayName = 'Stack';

Stack.propTypes = {
  as: PropTypes.elementType,
  size: PropTypes.oneOf(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']),
  gap: PropTypes.oneOf(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']),
  padding: PropTypes.oneOf(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']),
  justify: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around']),
  align: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  indent: PropTypes.string,
  fill: PropTypes.bool,
  flex: PropTypes.number,
  fullWidth: PropTypes.bool,
  fullHeight: PropTypes.bool,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  scrollable: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default Stack;
