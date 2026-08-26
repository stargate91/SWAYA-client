import { useState, useRef, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { usePopoverPositioning } from './usePopoverPositioning';
import styles from './Popover.module.css';

export default function Popover({
  trigger,
  children,
  align = 'right',
  width,
  ignoreSelectors = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  const { coords } = usePopoverPositioning({
    triggerRef,
    popoverRef,
    isOpen,
    onClose: () => setIsOpen(false),
    align,
    ignoreSelectors,
  });

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {cloneElement(trigger, {
        ref: triggerRef,
        onClick: (e) => {
          if (trigger.props.onClick) trigger.props.onClick(e);
          handleToggle(e);
        },
        'aria-expanded': isOpen,
      })}

      {isOpen && createPortal(
        <div
          ref={popoverRef}
          className={`${styles.popover} ${align === 'right' ? styles['align-right'] : styles['align-left']} ${coords.openUpwards ? styles['is-upwards'] : ''}`}
          onWheel={(e) => e.stopPropagation()}
          // eslint-disable-next-line react/forbid-dom-props
          style={{
            '--popover-top': `${coords.top}px`,
            '--popover-left': `${coords.left}px`,
            '--popover-width': width || undefined,
          }}
        >
          {typeof children === 'function' ? children({ close: () => setIsOpen(false) }) : children}
        </div>,
        document.body
      )}
    </>
  );
}

Popover.propTypes = {
  trigger: PropTypes.element.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  align: PropTypes.oneOf(['left', 'right']),
  width: PropTypes.string,
  ignoreSelectors: PropTypes.arrayOf(PropTypes.string),
};
