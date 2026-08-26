import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';
import { useTranslation } from '@/providers/LanguageContext';
import { useDropdownMenu } from '../useDropdown';
import DropdownOptionItem from './DropdownOptionItem';
import styles from '../Dropdown.module.css';

export default function DropdownMenu({
  isOpen,
  menuCoords,
  options,
  value,
  onOptionClick,
  searchable,
  variant,
  size = 'md',
  className = '',
  themeColor = '',
  multiple = false,
}) {
  const { t } = useTranslation();
  const {
    searchTerm,
    setSearchTerm,
    searchInputRef,
    menuRef,
    filteredOptions,
    isNoResults,
  } = useDropdownMenu({
    isOpen,
    options,
    searchable,
    menuCoords,
  });

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      ref={menuRef}
      data-size={size}
      className={`${styles.menu} ${styles['menu--' + size] || ''} ${
        searchable ? styles.hasSearch : ''
      } ${menuCoords.openUpwards ? styles['is-upwards'] : ''} ${
        variant === 'sorter' ? styles['menu-sorter'] : ''
      } ${className}`.trim()}
      // eslint-disable-next-line react/forbid-dom-props
      style={{
        ...(themeColor ? { '--list-theme-color': themeColor } : {}),
        '--dropdown-menu-top': `${menuCoords.top}px`,
        '--dropdown-menu-left': `${menuCoords.left}px`,
        '--dropdown-menu-width': `${menuCoords.width}px`,
        visibility: menuCoords.width > 0 ? 'visible' : 'hidden',
      }}
    >
      {searchable ? (
        <div className={styles['search-container']}>
          <input
            ref={searchInputRef}
            type="text"
            className={styles['search-input']}
            placeholder={t('common.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
      <div
        className={`${styles['items-wrapper']} ${
          multiple ? styles['items-wrapper-multiple'] : ''
        }`.trim()}
      >
        {filteredOptions.map((opt) => {
          if (multiple) {
            const isChecked = Array.isArray(value) && value.includes(opt.value);
            return (
              <div
                key={opt.value}
                className={`${styles.item} tags-dropdown-item ${styles['item-checkbox']}`}
              >
                <Checkbox
                  checked={isChecked}
                  onChange={() => !opt.disabled && onOptionClick(opt.value)}
                  disabled={Boolean(opt.disabled)}
                >
                  <span
                    className={styles['item-label']}
                    // eslint-disable-next-line react/forbid-dom-props
                    style={opt.color ? { color: opt.color } : undefined}
                  >
                    {opt.label}
                  </span>
                </Checkbox>
              </div>
            );
          }

          return (
            <DropdownOptionItem
              key={opt.value}
              opt={opt}
              value={value}
              onOptionClick={onOptionClick}
            />
          );
        })}
        {isNoResults ? (
          <div className={styles['no-results']}>{t('common.noResults')}</div>
        ) : null}
      </div>
    </div>,
    document.body
  );
}

DropdownMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  menuCoords: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  onOptionClick: PropTypes.func.isRequired,
  searchable: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  themeColor: PropTypes.string,
  multiple: PropTypes.bool,
};
