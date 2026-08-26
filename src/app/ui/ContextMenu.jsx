import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useContextMenuDismiss } from './useContextMenuDismiss';
import styles from './ContextMenu.module.css';

export default function ContextMenu({ x, y, onClose, items = [] }) {
  const menuRef = useRef(null);

  useContextMenuDismiss({ menuRef, onClose, x, y });

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      className={styles.menu}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, idx) => {
        if (item.divider) {
          return <div key={`div-${idx}`} className={styles.divider} />;
        }

        const Icon = item.icon;
        const isDanger = item.variant === 'danger' || item.isDanger;
        const itemClassName = `
          ${styles.item}
          ${isDanger ? styles['item--danger'] : ''}
          ${item.className || ''}
        `.trim();

        return (
          <button
            key={item.key || idx}
            type="button"
            className={itemClassName}
            onClick={() => {
              item.onClick?.();
              onClose();
            }}
            disabled={item.disabled}
          >
            {Icon && <Icon className={styles.icon} size={14} />}
            <span className={styles.label}>{item.label}</span>
            {item.shortcut && <span className={styles.shortcut}>{item.shortcut}</span>}
          </button>
        );
      })}
    </div>,
    document.body
  );
}
