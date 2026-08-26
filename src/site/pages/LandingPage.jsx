import Hero from '../components/hero';
import VideoSection from '../components/video';
import FeatureShowcase from '../components/showcase';
import ComparePreviewSection from '../components/compare/ComparePreviewSection';
import FaqSection from '../components/faq';
import DownloadSection from '../components/download';
import { useLandingPage } from '../hooks/useLandingPage';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const { onOpenDemo } = useLandingPage();

  return (
    <>
      <Hero onOpenDemo={onOpenDemo} />
      
      <div className={styles.divider} />

      <VideoSection posterUrl="/video-poster.webp" />

      <div className={styles.divider} />

      <FeatureShowcase />

      <div className={styles.divider} />

      <ComparePreviewSection />

      <div className={styles.divider} />

      <FaqSection />

      <div className={styles.divider} />

      <DownloadSection />
    </>
  );
}
