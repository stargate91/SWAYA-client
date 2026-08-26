import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';
import { useDropdownOptionTruncation } from '../useDropdown';
import styles from '../Dropdown.module.css';

export default function DropdownOptionItem({ opt, value, onOptionClick }) {
  const { buttonRef, isTruncated, checkTruncation } =
    useDropdownOptionTruncation(opt.label);

  return (
    <Tooltip
      content={isTruncated ? opt.label : null}
      side="right"
      triggerClassName={styles['tooltip-trigger']}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.item} ${
          opt.value === value ? styles['is-active'] : ''
        } ${opt.disabled ? styles['is-disabled'] : ''}`.trim()}
        onClick={() => !opt.disabled && onOptionClick(opt.value)}
        onMouseEnter={checkTruncation}
        title={null}
        disabled={Boolean(opt.disabled)}
      >
        <span
          className={styles['item-label']}
          // eslint-disable-next-line react/forbid-dom-props
          style={opt.color ? { color: opt.color } : undefined}
        >
          {opt.label}
        </span>
      </button>
    </Tooltip>
  );
}

DropdownOptionItem.propTypes = {
  opt: PropTypes.object.isRequired,
  value: PropTypes.any,
  onOptionClick: PropTypes.func.isRequired,
};
