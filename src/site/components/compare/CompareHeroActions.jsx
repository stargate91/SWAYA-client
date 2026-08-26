import PropTypes from 'prop-types';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Button from '@/ui/Button';
import styles from './CompareHeroActions.module.css';


export default function CompareHeroActions({
  checkoutUrl,
  buyCtaText,
  demoCtaText,
  onOpenDemo,
  onBuyClick,
}) {
  return (
    <div className={styles['hero-cta']}>
      <Button
        as="a"
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
        size="lg"
        onClick={onBuyClick}
        rightIcon={<ExternalLink size={16} aria-hidden="true" />}
      >
        {buyCtaText}
      </Button>

      <Button
        variant="secondary"
        size="lg"
        onClick={onOpenDemo}
        rightIcon={<ArrowRight size={16} aria-hidden="true" />}
      >
        {demoCtaText}
      </Button>
    </div>
  );
}

CompareHeroActions.propTypes = {
  checkoutUrl: PropTypes.string.isRequired,
  buyCtaText: PropTypes.string.isRequired,
  demoCtaText: PropTypes.string.isRequired,
  onOpenDemo: PropTypes.func.isRequired,
  onBuyClick: PropTypes.func,
};
