import PropTypes from 'prop-types';
import { X } from './icons';
import IconButton from './IconButton';
import { useTranslation } from '@/providers/LanguageContext';
import { useEscapeKeyDismiss } from '@/hooks/useEscapeKeyDismiss';
import styles from './Overlay.module.css';

export default function Overlay({
  children,
  sidebar,
  onClose,
  centered = false,
  variant,
  width,
  padding,
  className = '',
  closeLabel,
  escHint,
}) {
  const { t } = useTranslation();

  useEscapeKeyDismiss(onClose, Boolean(onClose));

  const resolvedVariant = variant || (centered ? 'standalone' : undefined);
  const resolvedWidth = width || (resolvedVariant === 'sidebar-wide' ? 'wide' : (resolvedVariant === 'standalone' ? 'narrow' : undefined));

  return (
    <div
      className={`${styles.root} ${className}`.trim()}
      data-variant={resolvedVariant}
      data-width={resolvedWidth}
      data-padding={padding}
      data-centered={centered || resolvedVariant === 'standalone'}
    >
      {onClose && (
        <div className={styles['close-container']}>
          <IconButton
            variant="close-overlay"
            onClick={onClose}
            label={closeLabel || t('common.close')}
            title={null}
            size="md"
          >
            <X size={18} />
          </IconButton>
          <span className={styles['esc-hint']}>
            {escHint || t('settingsPage.closeShortcut') || 'ESC'}
          </span>
        </div>
      )}
      {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}
      {children}
    </div>
  );
}

Overlay.propTypes = {
  children: PropTypes.node,
  sidebar: PropTypes.node,
  onClose: PropTypes.func,
  centered: PropTypes.bool,
  variant: PropTypes.oneOf(['standalone', 'sidebar-compact', 'sidebar-wide']),
  width: PropTypes.oneOf(['narrow', 'compact', 'medium', 'wide', 'fluid', 'full']),
  padding: PropTypes.oneOf(['normal', 'compact', 'flush']),
  className: PropTypes.string,
  closeLabel: PropTypes.string,
  escHint: PropTypes.string,
};

Overlay.ContentWrapper = function ContentWrapper({ children, className = '' }) {
  return <main className={`${styles['content-wrapper']} ${className}`.trim()}>{children}</main>;
};

Overlay.ContentWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Overlay.Content = function Content({ children, width, className = '' }) {
  return (
    <div
      className={`${styles.content} ${className}`.trim()}
      data-width={width}
    >
      {children}
    </div>
  );
};

Overlay.Content.propTypes = {
  children: PropTypes.node,
  width: PropTypes.oneOf(['narrow', 'compact', 'medium', 'wide', 'fluid', 'full']),
  className: PropTypes.string,
};
