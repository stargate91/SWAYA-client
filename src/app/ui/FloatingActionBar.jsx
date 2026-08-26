import PropTypes from 'prop-types';
import styles from './FloatingActionBar.module.css';

export default function FloatingActionBar({
  visible = false,
  shaking = false,
  eyebrow,
  title,
  description,
  actions = [],
  className = '',
}) {
  return (
    <div
      className={`${styles.shell} ${visible ? styles.visible : ''} ${shaking ? styles.shaking : ''} ${className}`.trim()}
      data-shaking={shaking}
    >
      <div className={styles.bar} aria-hidden={visible ? undefined : true}>
        <div className={styles.copy}>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          {title ? <strong className={styles.title}>{title}</strong> : null}
          {description ? <span className={styles.description}>{description}</span> : null}
        </div>
        <div className={styles.actions}>
          {actions.map((action) => (
            <button
              key={action.key}
              type="button"
              className={`${styles.action} ${action.variant === 'primary' ? styles['action-primary'] : action.variant === 'danger' ? styles['action-danger'] : ''} ${action.className || ''}`.trim()}
              onClick={action.onClick}
              disabled={action.disabled}
              aria-label={action.label}
            >
              {action.icon ? <action.icon size={16} /> : null}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

FloatingActionBar.propTypes = {
  visible: PropTypes.bool,
  shaking: PropTypes.bool,
  eyebrow: PropTypes.node,
  title: PropTypes.node,
  description: PropTypes.node,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
      variant: PropTypes.string,
      icon: PropTypes.elementType,
      className: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};
