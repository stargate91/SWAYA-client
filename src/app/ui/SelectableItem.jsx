/* eslint-disable react/forbid-component-props */
import PropTypes from 'prop-types';
import styles from './SelectableItem.module.css';

/**
 * SelectableItem is a generic list row / option item with customizable color tint, selection state, and slot support.
 *
 * @param {object} props
 * @param {boolean} [props.selected] - Selected / active state
 * @param {string} [props.color] - Custom theme/accent color for hover and selected state
 * @param {React.ReactNode} [props.startSlot] - Content or control on the left (e.g. Checkbox, icon)
 * @param {React.ReactNode} [props.endSlot] - Content or control on the right
 * @param {React.ReactNode} [props.label] - Text or node label
 * @param {React.ReactNode} [props.children] - Alternative or additional children
 * @param {boolean} [props.disabled] - Disabled state
 * @param {() => void} [props.onClick] - Click event handler
 * @param {'div' | 'button'} [props.as] - Underlying wrapper element (default: 'div')
 * @param {string} [props.className] - Additional class name
 */
export default function SelectableItem({
  selected = false,
  color,
  startSlot,
  endSlot,
  label,
  children,
  disabled = false,
  onClick,
  as: Component = 'div',
  className = '',
  style,
  ...props
}) {
  const interactiveProps = {};
  if (Component === 'div' && !disabled) {
    interactiveProps.role = 'button';
    interactiveProps.tabIndex = 0;
    interactiveProps.onKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.(e);
      }
    };
  }

  const mergedStyle = {
    ...style,
    ...(color ? { '--selectable-color': color } : {}),
  };

  return (
    <Component
      type={Component === 'button' ? 'button' : undefined}
      data-selected={selected}
      aria-selected={selected}
      data-disabled={disabled ? 'true' : undefined}
      disabled={Component === 'button' ? disabled : undefined}
      className={`${styles.item} ${className}`.trim()}
      onClick={disabled ? undefined : onClick}
      style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
      {...interactiveProps}
      {...props}
    >
      {startSlot && <span className={styles['start-slot']}>{startSlot}</span>}
      {label ? <span className={styles.label}>{label}</span> : children}
      {endSlot && <span className={styles['end-slot']}>{endSlot}</span>}
    </Component>
  );
}

SelectableItem.propTypes = {
  selected: PropTypes.bool,
  color: PropTypes.string,
  startSlot: PropTypes.node,
  endSlot: PropTypes.node,
  label: PropTypes.node,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  as: PropTypes.elementType,
  className: PropTypes.string,
  style: PropTypes.object,
};
