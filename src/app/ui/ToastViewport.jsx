import PropTypes from 'prop-types';
import { X } from '@/ui/icons';
import { useToastStore } from '@/stores/useToastStore';
import { useToastTimer } from './useToastTimer';
import styles from './ToastViewport.module.css';

function ToastItem({ toast, onRemove }) {
  const { id, title, tone, duration } = toast;
  const { startTimer, pauseTimer, handleClose } = useToastTimer({ id, duration, onRemove });

  const toastClass = `${styles.toast} ${styles[`toast--${tone}`] || ''}`.trim();

  return (
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
    <div
      className={toastClass}
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
    >
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        <button
          type="button"
          className={styles.close}
          onClick={handleClose}
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

ToastItem.propTypes = {
  toast: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tone: PropTypes.string,
    duration: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default function ToastViewport({ toasts: propToasts, onRemoveToast: propOnRemoveToast }) {
  const storeToasts = useToastStore((state) => state.toasts);
  const removeToastFromStore = useToastStore((state) => state.removeToast);

  const activeToasts = propToasts !== undefined ? propToasts : storeToasts;
  const handleRemove = propOnRemoveToast !== undefined ? propOnRemoveToast : removeToastFromStore;

  if (!activeToasts || activeToasts.length === 0) {
    return null;
  }

  return (
    <div className={styles['toast-viewport']} aria-live="polite">
      {activeToasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={handleRemove} />
      ))}
    </div>
  );
}

ToastViewport.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      tone: PropTypes.string,
      duration: PropTypes.number.isRequired,
    })
  ),
  onRemoveToast: PropTypes.func,
};
