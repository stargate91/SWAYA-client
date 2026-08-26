import PropTypes from 'prop-types';
import Badge from '@/ui/Badge';
import ShowcaseBenefitsList from './ShowcaseBenefitsList';
import ShowcaseMediaPreview from './ShowcaseMediaPreview';
import { useShowcaseSection } from '../../hooks/useShowcaseSection';
import styles from './ShowcaseSection.module.css';

export default function ShowcaseSection({ section, t, onOpenLightbox }) {
  const {
    id,
    tagText,
    Icon,
    titleText,
    titleAccentText,
    descriptionText,
    benefits,
    integrationsLabel,
    integrations,
    image,
    altText,
    isAlt,
    reversed,
  } = useShowcaseSection(section, t);

  return (
    <section id={id} className={`${styles.section} ${isAlt ? styles['section--alt'] : ''}`}>
      <div className={styles.container}>
        <div className={`${styles.row} ${reversed ? styles['row--reversed'] : ''}`}>
          {/* Text Content */}
          <div className={styles['text-content']}>
            <Badge
              tone="accent"
              size="md"
              leftIcon={Icon ? <Icon size={14} aria-hidden="true" /> : null}
            >
              {tagText}
            </Badge>

            <h2 className={styles.title}>
              {titleText}{' '}
              <span className={styles['title-accent']}>
                {titleAccentText}
              </span>
            </h2>

            <p className={styles.description}>
              {descriptionText}
            </p>

            <ShowcaseBenefitsList
              benefits={benefits}
              integrationsLabel={integrationsLabel}
              integrations={integrations}
            />
          </div>

          {/* Visual Content */}
          <ShowcaseMediaPreview
            image={image}
            srcSet={section.srcSet}
            altText={altText}
            onOpenLightbox={onOpenLightbox}
          />
        </div>
      </div>
    </section>
  );
}

ShowcaseSection.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tagKey: PropTypes.string,
    icon: PropTypes.elementType,
    titleKey: PropTypes.string,
    titleAccentKey: PropTypes.string,
    descriptionKey: PropTypes.string,
    benefits: PropTypes.arrayOf(PropTypes.string),
    integrationsLabel: PropTypes.string,
    integrations: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    imageAltKey: PropTypes.string,
    reversed: PropTypes.bool,
    isAlt: PropTypes.bool,
  }).isRequired,
  t: PropTypes.func,
  onOpenLightbox: PropTypes.func.isRequired,
};

