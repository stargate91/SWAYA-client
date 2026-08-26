import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Badge from '@/ui/Badge';
import { useTranslation } from '@/providers/LanguageContext';
import { useLocalizedUrls } from '../../hooks/useLocalizedUrls';
import { getComparisonsSummaryList } from '../../data/comparisonsSummary';
import CompareCard from './CompareCard';
import styles from './ComparePreviewSection.module.css';

export default function ComparePreviewSection() {
  const { t } = useTranslation();
  const { prefix, compareUrl } = useLocalizedUrls();

  const comparisons = useMemo(() => {
    return getComparisonsSummaryList();
  }, []);

  const tagText = t('landing.compare.tag', { defaultValue: 'Software Alternatives' });
  const titleText = t('landing.compare.title', { defaultValue: 'Why SWAYA?' });
  const titleAccentText = t('landing.compare.titleAccent', { defaultValue: 'See How We Compare.' });
  const subtitleText = t('landing.compare.subtitle', {
    defaultValue:
      'Discover how SWAYA delivers an offline, serverless media workstation with automated batch file renaming and built-in 4K MPV playback.',
  });
  const viewAllText = t('landing.compare.viewAll', {
    defaultValue: 'Explore All Alternatives & Full Matrix →',
  });

  return (
    <section id="compare" className={styles.section} aria-labelledby="compare-preview-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles['badge-row']}>
            <Badge tone="accent" size="sm" leftIcon={<Sparkles size={12} aria-hidden="true" />}>
              {tagText}
            </Badge>
          </div>

          <h2 id="compare-preview-heading" className={styles.title}>
            {titleText} <span className={styles['title-accent']}>{titleAccentText}</span>
          </h2>

          <p className={styles.subtitle}>{subtitleText}</p>
        </div>

        <div className={styles.grid}>
          {comparisons.map((comp) => (
            <CompareCard key={comp.slug} comp={comp} prefix={prefix} t={t} />
          ))}
        </div>

        <div className={styles['footer-action']}>
          <Link to={compareUrl} className={styles['view-all-btn']}>
            <span>{viewAllText}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
