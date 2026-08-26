import styles from './PlayerMenu.module.css';

export function PlayerMenu({ title, children, className = '', ...props }) {
  return (
    <div
      className={`${styles.menu} ${className}`.trim()}
      onWheel={(e) => e.stopPropagation()}
      {...props}
    >
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
}

export function PlayerMenuItem({ active = false, children, className = '', ...props }) {
  return (
    <button
      className={`${styles.item} ${active ? styles.active : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export function PlayerMenuEmpty({ children, className = '', ...props }) {
  return (
    <div className={`${styles.empty} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function PlayerMenuDivider({ className = '', ...props }) {
  return (
    <div className={`${styles.divider} ${className}`.trim()} {...props} />
  );
}

export default PlayerMenu;
