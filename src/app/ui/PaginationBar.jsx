import PropTypes from 'prop-types';
import { useTranslation } from '@/providers/LanguageContext';
import { DEFAULT_PAGE_SIZE_OPTIONS } from '@/lib/paginationConstants';
import Button from './Button';
import Inline from './Inline';
import { usePaginationEditor } from './usePaginationEditor';
import styles from './PaginationBar.module.css';

const SLASH_SEPARATOR = '/ ';
const SLASH_SPACED = ' / ';

function PaginationPageSizes({ pageSize, pageSizeOptions, onPageSizeChange, ariaLabel }) {
  return (
    <Inline gap="sm" align="center" className={styles.sizes} role="group" aria-label={ariaLabel}>
      {pageSizeOptions.map((option) => (
        <Button
          key={option}
          type="button"
          variant="secondary-neutral"
          size="sm"
          className={`${styles.size} ${pageSize === option ? styles['is-active'] : ''}`.trim()}
          onClick={() => onPageSizeChange?.(option)}
        >
          {option}
        </Button>
      ))}
    </Inline>
  );
}

PaginationPageSizes.propTypes = {
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.array.isRequired,
  onPageSizeChange: PropTypes.func,
  ariaLabel: PropTypes.string,
};

function PaginationPageEditor({ currentPage, totalPages, onPageChange }) {
  const {
    isEditing,
    pageValue,
    setPageValue,
    inputRef,
    submitPage,
    handleKeyDown,
    startEditing,
  } = usePaginationEditor({
    currentPage,
    totalPages,
    onPageChange,
  });

  return (
    <div className={`${styles.page} ${styles['page-editable']}`}>
      {isEditing ? (
        <>
          <input
            ref={inputRef}
            type="number"
            min="1"
            max={totalPages}
            value={pageValue}
            onChange={(event) => setPageValue(event.target.value)}
            onBlur={submitPage}
            onKeyDown={handleKeyDown}
          />
          <span>{SLASH_SEPARATOR}{totalPages}</span>
        </>
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={styles['page-display']}
          onClick={startEditing}
        >
          {currentPage}{SLASH_SPACED}{totalPages}
        </Button>
      )}
    </div>
  );
}

PaginationPageEditor.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
};

export default function PaginationBar({
  summaryText,
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  showPageSizes = false,
  onPageChange,
  onPageSizeChange,
  labels = {},
  isInfinite,
  paginationMode = 'pages',
  onPaginationModeChange,
}) {
  const { t } = useTranslation();
  const isInfiniteMode = isInfinite !== undefined ? Boolean(isInfinite) : paginationMode === 'infinite';

  return (
    <div className={styles.container}>
      <div className={styles.meta}>
        <span>{summaryText}</span>
      </div>
      <div className={styles.controls}>
        {showPageSizes && !isInfiniteMode ? (
          <PaginationPageSizes
            pageSize={pageSize}
            pageSizeOptions={pageSizeOptions}
            onPageSizeChange={onPageSizeChange}
            ariaLabel={labels.pageSizesAriaLabel ?? t('pagination.rowsPerPage')}
          />
        ) : null}

        {isInfiniteMode ? (
          <Inline gap="sm" align="center" className={styles.nav}>
            {onPaginationModeChange ? (
              <Inline gap="xs" align="center" className={styles.modes}>
                <Button
                  type="button"
                  variant="secondary-neutral"
                  size="sm"
                  className={styles.button}
                  onClick={() => onPaginationModeChange('pages')}
                >
                  {t('pagination.modePages') || 'Pages'}
                </Button>
                <Button
                  type="button"
                  variant="secondary-neutral"
                  size="sm"
                  className={`${styles.button} ${styles['is-active']}`}
                  onClick={() => onPaginationModeChange('infinite')}
                >
                  {t('pagination.modeInfinite') || 'Infinite'}
                </Button>
              </Inline>
            ) : null}
          </Inline>
        ) : (
          <Inline gap="sm" align="center" className={styles.nav}>
            {onPaginationModeChange ? (
              <Inline gap="xs" align="center" className={styles.modes}>
                <Button
                  type="button"
                  variant="secondary-neutral"
                  size="sm"
                  className={`${styles.button} ${styles['is-active']}`}
                  onClick={() => onPaginationModeChange('pages')}
                >
                  {t('pagination.modePages') || 'Pages'}
                </Button>
                <Button
                  type="button"
                  variant="secondary-neutral"
                  size="sm"
                  className={styles.button}
                  onClick={() => onPaginationModeChange('infinite')}
                >
                  {t('pagination.modeInfinite') || 'Infinite'}
                </Button>
              </Inline>
            ) : null}
            <Button
              type="button"
              variant="secondary-neutral"
              size="sm"
              className={styles.button}
              onClick={() => onPageChange?.(1)}
              disabled={currentPage === 1}
            >
              {(labels.first ?? t('pagination.first')) || 'First'}
            </Button>
            <Button
              type="button"
              variant="secondary-neutral"
              size="sm"
              className={styles.button}
              onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              {(labels.prev ?? t('pagination.prev')) || 'Prev'}
            </Button>
            <PaginationPageEditor currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            <Button
              type="button"
              variant="secondary-neutral"
              size="sm"
              className={styles.button}
              onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              {(labels.next ?? t('pagination.next')) || 'Next'}
            </Button>
            <Button
              type="button"
              variant="secondary-neutral"
              size="sm"
              className={styles.button}
              onClick={() => onPageChange?.(totalPages)}
              disabled={currentPage === totalPages}
            >
              {(labels.last ?? t('pagination.last')) || 'Last'}
            </Button>
          </Inline>
        )}
      </div>
    </div>
  );
}

PaginationBar.propTypes = {
  summaryText: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.array,
  showPageSizes: PropTypes.bool,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  labels: PropTypes.object,
  isInfinite: PropTypes.bool,
  paginationMode: PropTypes.string,
  onPaginationModeChange: PropTypes.func,
};
