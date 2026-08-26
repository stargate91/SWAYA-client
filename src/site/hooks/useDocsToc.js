import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import styles from '../components/docs/DocsToc.module.css';

/**
 * Hook observing markdown article heading intersections to highlight active table-of-contents links.
 * @param {Array<{ id: string, text: string, level: number }>} [headings=[]] - Extracted headings
 * @returns {{
 *   activeId: string,
 *   tocItems: Array<object>,
 *   handleHeadingClick: (e: React.MouseEvent, id: string) => void,
 *   t: Function
 * }}
 */
export function useDocsToc(headings = []) {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleHeadingClick = useCallback((e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  }, []);

  const tocItems = useMemo(() => {
    return (headings || []).map(({ id, text, level }) => ({
      id,
      text,
      level,
      href: `#${id}`,
      isActive: activeId === id,
      className: `${styles['toc-link']} ${level === 3 ? styles['toc-link--h3'] : ''} ${activeId === id ? styles['toc-link--active'] : ''}`.trim(),
    }));
  }, [headings, activeId]);

  return {
    activeId,
    tocItems,
    handleHeadingClick,
    t,
  };
}

export default useDocsToc;

