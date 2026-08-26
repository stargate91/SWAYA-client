import { useNavigate } from 'react-router-dom';
import { Minus, Square, X, Flame, ArrowLeft, ArrowRight, LogOut } from '@/ui/icons';
import UtilityButton from '@/ui/UtilityButton';
import Button from '@/ui/Button';
import ProgressBar from '@/ui/ProgressBar';
import Tooltip from '@/ui/Tooltip';
import { isNsfwMode } from '@/stores/useLibraryModeStore';
import { isElectron } from '@/lib/ipc';
import GlobalSearch from './GlobalSearch';
import SubProcessIndicators from './SubProcessIndicators';
import styles from './WindowTitlebar.module.css';
import Inline from '@/ui/Inline';
import { useWindowTitlebarActions } from './useWindowTitlebarActions';

const BRAND_NAME = 'SWAYA';

export default function WindowTitlebar() {
  const navigate = useNavigate();
  const {
    settings,
    sessionMode,
    scanProgress,
    imageProgress,
    hydrateProgress,
    collectionProgress,
    torrentProgress,
    syncProgress,
    canGoBack,
    canGoForward,
    handleGoBack,
    handleGoForward,
    handleAbort,
    handleToggleClick,
    minimize,
    toggleMaximize,
    close,
    resizeToMinimum,
    t,
  } = useWindowTitlebarActions();

  return (
    <header className={styles.titlebar}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={styles['drag-region']}
        onDoubleClick={resizeToMinimum}
      >
        <span className={styles['brand-text']}>{BRAND_NAME}</span>
      </div>

      <Inline gap="sm" align="center" className={styles['nav-buttons']}>
        <Tooltip content={t('common.back')} side="bottom">
          <button
            type="button"
            className={styles['nav-btn']}
            disabled={!canGoBack}
            tabIndex={-1}
            onClick={handleGoBack}
            aria-label="Back"
          >
            <ArrowLeft size={16} />
          </button>
        </Tooltip>
        <Tooltip content={t('common.forward')} side="bottom">
          <button
            type="button"
            className={styles['nav-btn']}
            disabled={!canGoForward}
            tabIndex={-1}
            onClick={handleGoForward}
            aria-label="Forward"
          >
            <ArrowRight size={16} />
          </button>
        </Tooltip>
      </Inline>

      <div className={`${styles['center-container']} ${scanProgress ? styles['has-progress'] : ''}`}>
        <div className={`${styles['search-wrapper']} ${scanProgress ? styles['has-progress'] : ''}`}>
          <GlobalSearch />
        </div>
        {scanProgress && (
          <div className={`${styles['progress-wrapper']} ${styles['is-single']}`}>
            <ProgressBar {...scanProgress} onAbort={handleAbort} />
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <SubProcessIndicators
          imageProgress={imageProgress}
          hydrateProgress={hydrateProgress}
          collectionProgress={collectionProgress}
          torrentProgress={torrentProgress}
          syncProgress={syncProgress}
        />
        {settings?.include_adult && (
          <Tooltip
            content={isNsfwMode(sessionMode) ? (t('common.sfwMode') || 'SFW Mode') : (t('common.nsfwMode') || 'NSFW Mode')}
            side="bottom"
            triggerClassName={styles['tooltip-trigger']}
          >
            <UtilityButton
              type="button"
              className={`${styles.button} ${styles['adult-toggle']} ${isNsfwMode(sessionMode) ? styles['is-nsfw'] : ''}`.trim()}
              tabIndex={-1}
              aria-label="Toggle Adult Mode"
              onClick={handleToggleClick}
            >
              <Flame size={18} fill={isNsfwMode(sessionMode) ? 'currentColor' : 'none'} />
            </UtilityButton>
          </Tooltip>
        )}
        {!isElectron && (
          <Button
            variant="primary"
            size="sm"
            leftIcon={LogOut}
            className={styles['exit-demo-btn']}
            onClick={() => navigate('/')}
          >
            {t('common.exitDemo') || 'Exit Demo'}
          </Button>
        )}
        <UtilityButton
          type="button"
          className={styles.button}
          size="titlebar"
          tabIndex={-1}
          aria-label={t('titlebar.minimizeWindow')}
          onClick={minimize}
        >
          <Minus size={16} />
        </UtilityButton>
        <UtilityButton
          type="button"
          className={styles.button}
          size="titlebar"
          tabIndex={-1}
          aria-label={t('titlebar.maximizeWindow')}
          onClick={toggleMaximize}
        >
          <Square size={14} />
        </UtilityButton>
        <UtilityButton
          type="button"
          className={`${styles.button} ${styles['close-btn']}`}
          size="titlebar"
          danger
          tabIndex={-1}
          aria-label={t('titlebar.closeWindow')}
          onClick={close}
        >
          <X size={16} />
        </UtilityButton>
      </div>
    </header>
  );
}
