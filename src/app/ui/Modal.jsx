import { FocusScope } from '@radix-ui/react-focus-scope';
import PropTypes from 'prop-types';
import { X } from '@/ui/icons';
import { useTranslation } from '@/providers/LanguageContext';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useEscapeKeyDismiss } from '@/hooks/useEscapeKeyDismiss';
import IconButton from './IconButton';
import styles from './Modal.module.css';

export default function Modal({
  open,
  title,
  description,
  children,
  footer,
  onClose,
  variant, // 'danger' | 'theater'
  width = 'md', // 'md' | 'lg' | 'xl' | 'full'
  height = 'auto', // 'auto' | 'md' | 'lg' | 'full'
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  showHeader = true,
  icon: Icon,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  headerStyle = null,
  style = null,
}) {
  const { t } = useTranslation();

  useBodyScrollLock(open);
  useEscapeKeyDismiss(onClose, Boolean(open && onClose && closeOnEscape));

  if (!open) return null;

  const handleBackdropClick = () => {
    if (closeOnBackdropClick && onClose) {
      onClose();
    }
  };

  const themeClass = variant ? styles[variant] || '' : '';
  const widthClass = width ? (styles[`width-${width}`] || '') : '';
  const heightClass = height ? (styles[`height-${height}`] || '') : '';

  const rootClass = `
    ${styles.root}
    ui-modal
    ${themeClass}
    ${widthClass}
    ${heightClass}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const headerClass = `${styles.header} ${headerClassName}`.trim();
  const bodyClass = `${styles.body} ${bodyClassName}`.trim();

  return (
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions, react/forbid-dom-props */
    <div className={`${styles.backdrop} ui-modal-backdrop`} style={style} onClick={handleBackdropClick}>
      <FocusScope asChild loop trapped onMountAutoFocus={(e) => e.preventDefault()}>
        <div
          className={rootClass}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          data-modal="true"
        >
          {showHeader && (title || description) ? (
            /* eslint-disable-next-line react/forbid-dom-props */
            <header className={headerClass} style={headerStyle}>
              <div>
                {title ? (
                  <h3 className={styles.title}>
                    {Icon ? <Icon className={styles['title-icon']} size={20} /> : null}
                    <span>{title}</span>
                  </h3>
                ) : null}
                {description ? <p className={styles.description}>{description}</p> : null}
              </div>
              {showCloseButton && onClose ? (
                <IconButton
                  type="button"
                  variant="close"
                  onClick={onClose}
                  label={t('common.close')}
                  title={null}
                  size="sm"
                  wrapped={true}
                >
                  <X size={16} />
                </IconButton>
              ) : null}
            </header>
          ) : null}
          <div className={bodyClass}>{children}</div>
          {footer ? <footer className={styles.footer}>{footer}</footer> : null}
        </div>
      </FocusScope>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.node,
  description: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.string,
  width: PropTypes.oneOf(['md', 'lg', 'xl', 'full']),
  height: PropTypes.oneOf(['auto', 'md', 'lg', 'full']),
  closeOnBackdropClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  showHeader: PropTypes.bool,
  icon: PropTypes.elementType,
  className: PropTypes.string,
  bodyClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  headerStyle: PropTypes.object,
  style: PropTypes.object,
};
