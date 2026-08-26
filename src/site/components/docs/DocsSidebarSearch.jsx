import { Search, X } from 'lucide-react';
import styles from './DocsSidebarSearch.module.css';


export default function DocsSidebarSearch({
  searchQuery,
  onSearchChange,
  onClearSearch,
  placeholder,
  ariaLabel,
  clearAriaLabel,
}) {
  return (
    <div className={styles['search-box']}>
      <Search size={15} className={styles['search-icon']} aria-hidden="true" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className={styles['search-input']}
        aria-label={ariaLabel}
      />
      {searchQuery && (
        <button
          type="button"
          className={styles['clear-button']}
          onClick={onClearSearch}
          aria-label={clearAriaLabel}
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
