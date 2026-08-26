import { AlignLeft } from 'lucide-react';
import styles from './DocsToc.module.css';
import { useDocsToc } from '../../hooks/useDocsToc';

export default function DocsToc({ headings = [] }) {
  const { tocItems, handleHeadingClick, t } = useDocsToc(headings);

  if (!tocItems || tocItems.length === 0) return null;

  return (
    <nav role="navigation" className={styles['toc-wrapper']} aria-label={t('docs.ui.tableOfContents')}>
      <div className={styles['toc-title']}>
        <AlignLeft size={14} />
        <span>{t('docs.ui.onThisPage')}</span>
      </div>

      <ul className={styles['toc-list']}>
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className={item.className}
              onClick={(e) => handleHeadingClick(e, item.id)}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

