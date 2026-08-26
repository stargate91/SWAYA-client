import PropTypes from 'prop-types';
import { Search, ChevronDown } from '@/ui/icons';
import Input from './Input';
import { useSearchInputCombo } from './useSearchInputCombo';
import styles from './SearchInputCombo.module.css';

export default function SearchInputCombo({
  value,
  onChange,
  placeholder,
  selectedOption,
  onOptionChange,
  options = [],
  sources = [],
  selectedSource,
  onSourceChange,
  sourceLabel,
  optionLabel,
  rightElement,
  className = '',
  size = 'md',
  showSearchIcon = true,
  inputRef,
  disabled = false,
  ...props
}) {
  const {
    isOpen,
    containerRef,
    handleToggle,
    ActiveIcon,
    activeLabel,
    activeIconSize,
    normalizedOptions,
    normalizedSources,
    hasSources,
    hasSelector,
    handleOptionSelect,
    handleSourceSelect,
  } = useSearchInputCombo({
    options,
    selectedOption,
    onOptionChange,
    sources,
    onSourceChange,
    size,
    disabled,
  });

  // Custom leftElement configuration
  const leftElement = hasSelector ? (
    <div className={styles['left-wrapper']}>
      <button
        type="button"
        className={styles['selector-btn']}
        tabIndex={-1}
        disabled={disabled}
        onClick={handleToggle}
      >
        {ActiveIcon && <ActiveIcon size={activeIconSize} className={styles['active-icon']} />}
        <span>{activeLabel}</span>
        <ChevronDown className={`${styles['chevron']} ${isOpen ? styles['is-open'] : ''}`} size={activeIconSize} />
      </button>
      <div className={styles['divider']} />
    </div>
  ) : showSearchIcon ? (
    <Search size={14} />
  ) : null;

  const wrapperClass = `${styles['search-input-combo-wrapper']} ${styles[`size-${size}`]} ${className}`.trim();

  return (
    <div className={wrapperClass} ref={containerRef}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        size={size}
        leftElement={leftElement}
        rightElement={rightElement}
        inputRef={inputRef}
        disabled={disabled}
        {...props}
      />
      {hasSelector && isOpen && (
        <div className={`${styles['dropdown']} ${hasSources ? styles['dropdown--cascading'] : ''}`}>
          {hasSources ? (
            <>
              {/* Left Column: Sources */}
              <div className={`${styles['dropdown-column']} ${styles['dropdown-column--sources']}`}>
                {sourceLabel && <div className={styles['dropdown-header']}>{sourceLabel}</div>}
                {normalizedSources.map((source) => (
                  <button
                    key={source.value}
                    type="button"
                    tabIndex={-1}
                    disabled={source.disabled}
                    className={`${styles['dropdown-item']} ${selectedSource === source.value ? styles['is-active'] : ''} ${source.disabled ? styles['is-disabled'] : ''}`}
                    onClick={() => handleSourceSelect(source.value)}
                  >
                    {source.label}
                  </button>
                ))}
              </div>

              {/* Right Column: Types */}
              <div className={`${styles['dropdown-column']} ${styles['dropdown-column--types']}`}>
                {optionLabel && <div className={styles['dropdown-header']}>{optionLabel}</div>}
                {normalizedOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      tabIndex={-1}
                      disabled={option.disabled}
                      className={`${styles['dropdown-item']} ${selectedOption === option.value ? styles['is-active'] : ''} ${option.disabled ? styles['is-disabled'] : ''}`}
                      onClick={() => handleOptionSelect(option.value)}
                    >
                      {Icon && <Icon size={activeIconSize} className={styles['item-icon']} />}
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            normalizedOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  tabIndex={-1}
                  disabled={option.disabled}
                  className={`${styles['dropdown-item']} ${selectedOption === option.value ? styles['is-active'] : ''} ${option.disabled ? styles['is-disabled'] : ''}`}
                  onClick={() => handleOptionSelect(option.value)}
                >
                  {Icon && <Icon size={activeIconSize} className={styles['item-icon']} />}
                  <span>{option.label}</span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

SearchInputCombo.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  selectedOption: PropTypes.string,
  onOptionChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.elementType,
    })
  ),
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  selectedSource: PropTypes.string,
  onSourceChange: PropTypes.func,
  sourceLabel: PropTypes.string,
  optionLabel: PropTypes.string,
  rightElement: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  showSearchIcon: PropTypes.bool,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};
