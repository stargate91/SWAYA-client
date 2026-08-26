import PropTypes from 'prop-types';
import Autocomplete from '@/ui/Autocomplete';
import { X, Search } from '@/ui/icons';
import { useFocusTagSelector } from '../hooks/useFocusTagSelector';

import styles from './AdultDashboardFocusSelector.module.css';

export default function AdultDashboardFocusSelector({ provider, currentFocus, t }) {
  const {
    inputValue,
    setInputValue,
    filteredOptions,
    handleSelect,
    handleClear,
  } = useFocusTagSelector({ provider, currentFocus });

  return (
    <Autocomplete
      value={inputValue}
      onChange={setInputValue}
      options={filteredOptions}
      onSelect={handleSelect}
      placeholder={t('dashboard.search_tag_placeholder') || 'Search categories...'}
      size="sm"
      className={styles['focus-autocomplete']}
      leftElement={<Search size={14} className={styles['search-icon']} />}
      rightElement={
        currentFocus ? (
          <button
            type="button"
            onClick={handleClear}
            className={styles['clear-btn']}
            title={t('common.clear') || 'Clear Focus'}
          >
            <X size={14} />
          </button>
        ) : null
      }
    />
  );
}

AdultDashboardFocusSelector.propTypes = {
  provider: PropTypes.string,
  currentFocus: PropTypes.string,
  t: PropTypes.func.isRequired,
};

