import PropTypes from 'prop-types';
import Badge from '@/ui/Badge';
import { useHero } from '../../hooks/useHero';
import HeroPosterWall from './HeroPosterWall';
import HeroActionGroup from './HeroActionGroup';
import styles from './Hero.module.css';

export default function Hero({ onOpenDemo }) {
  const {
    brandTitle,
    taglinePrefix,
    taglineAccent,
    subtitle,
    priceOld,
    priceNew,
    priceTag,
    buyCtaText,
    demoCtaText,
    checkoutUrl,
    handleBuyClick,
    guarantees,
  } = useHero();

  return (
    <section className={styles.hero}>
      {/* Background Dynamic Infinite Scrolling Poster Wall */}
      <HeroPosterWall />

      <div className={styles.content}>
        {/* Massive Headline and Main Tagline within single semantic H1 */}
        <h1 className={styles['hero-heading']}>
          <span className={styles['brand-title']}>{brandTitle}</span>
          <span className={styles.tagline}>
            {taglinePrefix} <span className={styles['tagline-accent']}>{taglineAccent}</span>
          </span>
        </h1>

        <p className={styles.subtitle}>{subtitle}</p>

        {/* Pricing tag */}
        <div className={styles.pricing}>
          <span className={styles['price-old']}>{priceOld}</span>
          <span className={styles['price-new']}>{priceNew}</span>
          <Badge tone="accent" size="sm" className={styles['price-tag']}>
            {priceTag}
          </Badge>
        </div>

        {/* Action Group */}
        <HeroActionGroup
          checkoutUrl={checkoutUrl}
          buyCtaText={buyCtaText}
          demoCtaText={demoCtaText}
          guarantees={guarantees}
          onOpenDemo={onOpenDemo}
          onBuyClick={handleBuyClick}
        />
      </div>
    </section>
  );
}

Hero.propTypes = {
  onOpenDemo: PropTypes.func.isRequired,
};
