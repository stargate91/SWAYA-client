import PropTypes from 'prop-types';
import { Sparkles } from 'lucide-react';
import Badge from '@/ui/Badge';
import { Breadcrumb } from '../common';
import { useCompareHero } from '../../hooks/useCompareHero';
import CompareHeroActions from './CompareHeroActions';
import CompareHeroPricingPill from './CompareHeroPricingPill';
import styles from './CompareHero.module.css';

export default function CompareHero({
  comparison,
  homeUrl,
  hubUrl,
  swayaPricingLabel,
  competitorPricingLabel,
  mainTitlePrefix,
  onOpenDemo,
}) {
  const {
    breadcrumbItems,
    checkoutUrl,
    buyCtaText,
    demoCtaText,
    handleBuyClick,
    badge,
    mainTitlePrefix: titlePrefix,
    tagline,
    subtitle,
    swayaPricingLabel: swayaLabel,
    swayaPricing,
    competitorPricingLabel: competitorLabel,
    competitorPricing,
  } = useCompareHero({
    comparison,
    homeUrl,
    hubUrl,
    swayaPricingLabel,
    competitorPricingLabel,
    mainTitlePrefix,
  });

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Header */}
      <header className={styles.hero}>
        <div className={styles['badge-row']}>
          <Badge tone="accent" size="sm" leftIcon={<Sparkles size={12} aria-hidden="true" />}>
            {badge}
          </Badge>
        </div>

        <h1 className={styles.title}>
          {titlePrefix}
          <span className={styles['title-accent']}>{tagline}</span>
        </h1>

        <p className={styles.subtitle}>{subtitle}</p>

        <CompareHeroActions
          checkoutUrl={checkoutUrl}
          buyCtaText={buyCtaText}
          demoCtaText={demoCtaText}
          onOpenDemo={onOpenDemo}
          onBuyClick={handleBuyClick}
        />

        <CompareHeroPricingPill
          swayaPricingLabel={swayaLabel}
          swayaPricing={swayaPricing}
          competitorPricingLabel={competitorLabel}
          competitorPricing={competitorPricing}
        />
      </header>
    </>
  );
}

CompareHero.propTypes = {
  comparison: PropTypes.shape({
    name: PropTypes.string.isRequired,
    badge: PropTypes.string.isRequired,
    heroTagline: PropTypes.string.isRequired,
    heroSubtitle: PropTypes.string.isRequired,
    swayaPricing: PropTypes.string.isRequired,
    competitorPricing: PropTypes.string.isRequired,
  }).isRequired,
  homeUrl: PropTypes.string.isRequired,
  hubUrl: PropTypes.string.isRequired,
  swayaPricingLabel: PropTypes.string.isRequired,
  competitorPricingLabel: PropTypes.string.isRequired,
  mainTitlePrefix: PropTypes.string.isRequired,
  onOpenDemo: PropTypes.func.isRequired,
};


