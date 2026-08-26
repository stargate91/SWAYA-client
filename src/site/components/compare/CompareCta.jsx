import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import Button from '@/ui/Button';
import { useCompareCta } from '../../hooks/useCompareCta';
import styles from './CompareCta.module.css';

export default function CompareCta({ onOpenDemo }) {
  const {
    title,
    subtitle,
    buyCtaText,
    demoCtaText,
    checkoutUrl,
    handleBuyClick,
    guarantees,
  } = useCompareCta();

  return (
    <section className={styles.card} aria-label="Get Started with SWAYA">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{subtitle}</p>

      <div className={styles.actions}>
        <Button
          as="a"
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="lg"
          onClick={handleBuyClick}
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

      <div className={styles.guarantees}>
        {guarantees.map((item, idx) => (
          <Fragment key={item.id}>
            {idx > 0 && (
              <span className={styles['guarantee-divider']} aria-hidden="true" />
            )}
            <span>
              {item.hasIcon && (
                <>
                  <ShieldCheck size={14} className={styles['guarantee-icon']} />{' '}
                </>
              )}
              {item.label}
            </span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

CompareCta.propTypes = {
  onOpenDemo: PropTypes.func.isRequired,
};

