import styles from './PlayerIconButton.module.css';

export default function PlayerIconButton({
  variant = 'default',
  size = 'md',
  active = false,
  peakState = 'none',
  className = '',
  children,
  ...props
}) {
  const classNames = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    active ? styles.active : '',
    peakState !== 'none' ? styles[`button--${peakState}`] : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}
