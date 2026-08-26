import { useParams, Navigate } from 'react-router-dom';
import FaqSection from '../components/faq';
import {
  CompareHero,
  CompareAssessment,
  CompareFeatureMatrix,
  CompareDeepDives,
  CompareRelatedDocs,
  CompareCta,
} from '../components/compare';
import { useComparePage } from '../hooks/useComparePage';
import styles from './ComparePage.module.css';

export default function ComparePage() {
  const { slug } = useParams();
  const pageData = useComparePage(slug);

  if (!pageData.comparison) {
    return <Navigate to={pageData.compareHubUrl} replace />;
  }

  const {
    comparison,
    homeUrl,
    hubUrl,
    swayaPricingLabel,
    competitorPricingLabel,
    mainTitlePrefix,
    relatedDocs,
    compareFaqProps,
    onOpenDemo,
    t,
  } = pageData;

  return (
    <div className={styles.container}>
      <CompareHero
        comparison={comparison}
        homeUrl={homeUrl}
        hubUrl={hubUrl}
        swayaPricingLabel={swayaPricingLabel}
        competitorPricingLabel={competitorPricingLabel}
        mainTitlePrefix={mainTitlePrefix}
        onOpenDemo={onOpenDemo}
      />

      <CompareAssessment comparison={comparison} t={t} />

      <CompareFeatureMatrix comparison={comparison} t={t} />

      <CompareDeepDives comparison={comparison} t={t} />

      <CompareRelatedDocs
        relatedDocs={relatedDocs}
        competitorName={comparison.name}
        t={t}
      />

      {compareFaqProps && (
        <div className={styles['faq-wrapper']}>
          <FaqSection {...compareFaqProps} />
        </div>
      )}

      <CompareCta onOpenDemo={onOpenDemo} />
    </div>
  );
}

