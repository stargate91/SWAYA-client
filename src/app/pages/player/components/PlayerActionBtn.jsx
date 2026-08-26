import styles from './PlayerActionBtn.module.css';

export default function PlayerActionBtn({
  variant = 'default',
  size = 'lg',
  icon,
  className = '',
  children,
  ...props
}) {
  const classNames = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}
