import { useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { X } from '@/ui/icons';
import { useTranslation } from '@/providers/LanguageContext';
import { useDrawerDismiss } from './useDrawerDismiss';
import IconButton from './IconButton';
import styles from './Drawer.module.css';

export default function Drawer({
  isOpen,
  onClose,
  title,
  size = 'md',
  className = '',
  style = {},
  variant = 'default',
  hasBackdrop,
  padded = false,
  footer,
  children,
}) {
  const { t } = useTranslation();
  const drawerRef = useRef(null);

  const actualHasBackdrop = hasBackdrop !== undefined ? hasBackdrop : (variant !== 'glass');

  useDrawerDismiss({
    drawerRef,
    isOpen,
    onClose,
    hasBackdrop: actualHasBackdrop,
  });

  if (!isOpen || typeof document === 'undefined') return null;

  const drawerClass = `
    ${styles.drawer}
    ${styles[`drawer--${size}`]}
    ${styles[`drawer--${variant}`]}
    ${className}
  `.trim();

  return createPortal(
    <>
      {actualHasBackdrop && (
        <div
          className={styles.backdrop}
          onClick={onClose}
          role="presentation"
        />
      )}
      <div
        ref={drawerRef}
        className={drawerClass}
        // eslint-disable-next-line react/forbid-dom-props
        style={style}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          <IconButton
            type="button"
            variant="close"
            onClick={onClose}
            label={t('common.close') || 'Close'}
            title={null}
            size="sm"
            wrapped={true}
            wrapperHoverOnly={true}
          >
            <X size={18} />
          </IconButton>
        </div>
        <div className={styles.content} data-padded={padded}>
          {children}
        </div>
        {footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </>,
    document.body
  );
}

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', '720']),
  className: PropTypes.string,
  style: PropTypes.object,
  variant: PropTypes.oneOf(['default', 'glass', 'contrast']),
  hasBackdrop: PropTypes.bool,
  padded: PropTypes.bool,
  footer: PropTypes.node,
  children: PropTypes.node,
};
