import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

/**
 * Unified portal component to inject action items or headers into top/bottom utility bars.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.enabled]
 * @param {'top' | 'bottom'} [props.position] - Target utility bar vertical placement (default: 'top')
 * @param {'left' | 'center' | 'right'} [props.align] - Horizontal alignment bucket (default: 'left')
 */
export default function UtilityBarPortal({
  children,
  enabled = true,
  position = 'top',
  align = 'left',
}) {
  const [targetEl, setTargetEl] = useState(null);

  useEffect(() => {
    if (enabled) {
      const targetId = `page-bar-${position}-${align}`;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTargetEl(document.getElementById(targetId));
    } else {
      setTargetEl(null);
    }
  }, [enabled, position, align]);

  if (!targetEl) return null;

  return createPortal(children, targetEl);
}

UtilityBarPortal.propTypes = {
  children: PropTypes.node,
  enabled: PropTypes.bool,
  position: PropTypes.oneOf(['top', 'bottom']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
};
