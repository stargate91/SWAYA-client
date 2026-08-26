import styles from './FeatureShowcase.module.css';
import Lightbox from '@/ui/Lightbox';
import { useShowcase } from '../../hooks/useShowcase';
import ShowcaseSection from './ShowcaseSection';

export default function FeatureShowcase() {
  const {
    t,
    sections,
    activeLightboxImage,
    openLightbox,
    closeLightbox,
  } = useShowcase();

  return (
    <div id="features" className={styles['showcase-wrapper']}>
      {sections.map((section) => (
        <ShowcaseSection
          key={section.id}
          section={section}
          t={t}
          onOpenLightbox={openLightbox}
        />
      ))}

      {activeLightboxImage && (
        <Lightbox
          imageUrl={activeLightboxImage}
          onClose={closeLightbox}
          t={t}
        />
      )}
    </div>
  );
}
