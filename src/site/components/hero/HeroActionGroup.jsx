import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight, Play } from 'lucide-react';
import Button from '@/ui/Button';
import HeroGuaranteeItem from './HeroGuaranteeItem';
import styles from './HeroActionGroup.module.css';

export default function HeroActionGroup({
  checkoutUrl,
  buyCtaText,
  demoCtaText,
  guarantees = [],
  onOpenDemo,
  onBuyClick,
}) {
  return (
    <>
      <div className={styles.actions}>
        <Button
          as="a"
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="lg"
          className={styles['buy-btn']}
          onClick={onBuyClick}
          aria-label={`${buyCtaText} (opens in new tab)`}
          rightIcon={<ArrowRight size={18} aria-hidden="true" />}
        >
          {buyCtaText}
        </Button>

        <Button
          onClick={onOpenDemo}
          variant="secondary"
          size="lg"
          className={styles['demo-btn']}
          aria-label={demoCtaText}
          leftIcon={<Play size={18} aria-hidden="true" />}
        >
          {demoCtaText}
        </Button>
      </div>

      <div className={styles.guarantee}>
        {guarantees.map((item, idx) => (
          <Fragment key={item.id || idx}>
            {idx > 0 && <span className={styles['guarantee-divider']} aria-hidden="true" />}
            <HeroGuaranteeItem item={item} />
          </Fragment>
        ))}
      </div>
    </>
  );
}

HeroActionGroup.propTypes = {
  checkoutUrl: PropTypes.string.isRequired,
  buyCtaText: PropTypes.string.isRequired,
  demoCtaText: PropTypes.string.isRequired,
  guarantees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
      iconKey: PropTypes.string,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOpenDemo: PropTypes.func.isRequired,
  onBuyClick: PropTypes.func,
};


