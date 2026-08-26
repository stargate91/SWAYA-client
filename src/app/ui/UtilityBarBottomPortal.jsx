import PropTypes from 'prop-types';
import UtilityBarPortal from './UtilityBarPortal';

/**
 * Convenience portal for bottom utility bar.
 */
export default function UtilityBarBottomPortal({ children, align = 'left', enabled = true, ...props }) {
  return (
    <UtilityBarPortal position="bottom" align={align} enabled={enabled} {...props}>
      {children}
    </UtilityBarPortal>
  );
}

UtilityBarBottomPortal.propTypes = {
  children: PropTypes.node,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  enabled: PropTypes.bool,
};
