import { useMemo } from 'react';
import { FileText, KeyRound, Undo2, Laptop, RefreshCw, AlertTriangle, Mail } from 'lucide-react';
import Badge from '@/ui/Badge';
import { Breadcrumb } from '../components/common';
import { useTranslation } from '@/providers/LanguageContext';
import { useLocalizedUrls } from '../hooks/useLocalizedUrls';
import { usePageMeta } from '../hooks/usePageMeta';
import { getTermsJsonLd } from '../schema/legalSchema';
import { DEV_EMAIL } from '../data/siteConfig';
import styles from './TermsPage.module.css';

export default function TermsPage() {
  const { t, locale } = useTranslation();
  const { homeUrl, prefix, termsUrl: termsPath } = useLocalizedUrls();
  const termsUrl = `https://swaya.xyz${termsPath}`;

  const title = `${t('landing.terms.title', { defaultValue: 'Terms of Service & Refund Policy' })} - SWAYA`;
  const description = t('landing.terms.subtitle', {
    defaultValue:
      'Please read these terms carefully before purchasing or using SWAYA. By downloading, installing, or purchasing a license, you agree to be bound by this agreement.',
  });

  const jsonLd = useMemo(
    () =>
      getTermsJsonLd({
        locale,
        prefix,
        termsUrl,
        title: t('landing.terms.title', { defaultValue: 'Terms of Service & Refund Policy' }),
        description,
        breadcrumbHome: t('landing.footer.links.home', { defaultValue: 'Home' }),
        breadcrumbTerms: t('landing.terms.title', { defaultValue: 'Terms of Service & Refund Policy' }),
      }),
    [locale, prefix, termsUrl, description, t]
  );

  usePageMeta({
    title,
    description,
    url: termsUrl,
    canonicalUrl: termsUrl,
    pathname: termsPath,
    locale: locale || 'en',
    ogType: 'website',
    ogImage: 'https://swaya.xyz/og/terms.jpg',
    jsonLd,
  });

  const breadcrumbItems = [
    { label: t('landing.footer.links.home', { defaultValue: 'Home' }), to: homeUrl },
    { label: t('landing.footer.links.terms', { defaultValue: 'Terms & Refund Policy' }) },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Breadcrumb items={breadcrumbItems} />

        <div className={styles['badge-row']}>
          <Badge tone="accent" size="sm" leftIcon={<FileText size={12} aria-hidden="true" />}>
            {t('landing.terms.badge', { defaultValue: 'License Agreement' })}
          </Badge>
        </div>

        <h1 className={styles.title}>
          {t('landing.terms.title', { defaultValue: 'Terms of Service & Refund Policy' })}
        </h1>

        <p className={styles.description}>
          {t('landing.terms.subtitle', {
            defaultValue:
              'Please read these terms carefully before purchasing or using SWAYA. By downloading, installing, or purchasing a license, you agree to be bound by this agreement.',
          })}
        </p>

        <div className={styles['meta-row']}>
          <span>{t('landing.terms.lastUpdated', { defaultValue: 'Last updated: August 20, 2026' })}</span>
          <span>•</span>
          <span>{t('landing.terms.scope', { defaultValue: 'SWAYA v1.x Desktop Software' })}</span>
        </div>
      </header>

      <div className={styles.content}>
        {/* 1. License Grant */}
        <section className={styles.section} aria-labelledby="license-grant">
          <h2 id="license-grant" className={styles['section-title']}>
            <KeyRound size={18} color="var(--color-accent-primary)" />
            {t('landing.terms.section1Title', { defaultValue: '1. Software License Grant & Usage' })}
          </h2>
          <p className={styles['section-text']}>
            {t('landing.terms.section1Text', {
              defaultValue:
                'Subject to payment of the applicable one-time license fee (introductory €39, regular €79), SWAYA grants you a non-exclusive, perpetual, non-transferable personal license to install and execute the SWAYA desktop software on up to 3 personal devices owned or controlled by you.',
            })}
          </p>
          <ul className={styles.list}>
            <li>{t('landing.terms.section1Point1', { defaultValue: 'You may deactivate a device at any time directly in the application to transfer your license seat to a new machine.' })}</li>
            <li>{t('landing.terms.section1Point2', { defaultValue: 'You may not resell, rent, lease, sub-license, distribute, or publicly share your license key or cryptographic activation tokens.' })}</li>
            <li>{t('landing.terms.section1Point3', { defaultValue: 'Commercial redistribution, bundling into third-party commercial software, or reverse-engineering the licensing validation algorithms is strictly prohibited.' })}</li>
          </ul>
        </section>

        {/* 2. Refund & Cancellation Policy */}
        <section className={`${styles.section} ${styles['section-danger']}`} aria-labelledby="refund-policy">
          <h2 id="refund-policy" className={styles['section-title']}>
            <Undo2 size={18} color="var(--color-state-danger)" />
            {t('landing.terms.section2Title', { defaultValue: '2. Refund & Cancellation Policy' })}
          </h2>
          <p className={styles['section-text']}>
            {t('landing.terms.section2Text', {
              defaultValue:
                'We want you to be completely satisfied with SWAYA. Because SWAYA is digital software delivered immediately upon payment, the following refund terms apply:',
            })}
          </p>
          <ul className={styles.list}>
            <li>{t('landing.terms.section2Point1', { defaultValue: 'Unactivated Licenses (14-Day Money-Back Guarantee): If you have not activated your license key in the SWAYA software, you are eligible for a 100% unconditional refund within 14 days of purchase upon email request.' })}</li>
            <li>{t('landing.terms.section2Point2', { defaultValue: 'Activated Licenses (7-Day Technical Support Guarantee): Under EU Consumer Rights Directive regulations, downloading and activating digital software with immediate performance constitutes execution of the digital delivery. However, if you experience an unresolved technical incompatibility or defect on your supported Windows system that our support team cannot rectify, we will grant a 100% refund within 7 days of purchase.' })}</li>
            <li>{t('landing.terms.section2Point3', { defaultValue: 'Automatic Key Revocation: When a refund or payment reversal is issued, the associated license key and its cryptographic tokens are permanently revoked on our activation server. The software on your devices will return to setup mode.' })}</li>
          </ul>
        </section>

        {/* 3. Permitted Use & Local Storage */}
        <section className={styles.section} aria-labelledby="permitted-use">
          <h2 id="permitted-use" className={styles['section-title']}>
            <Laptop size={18} color="var(--color-accent-primary)" />
            {t('landing.terms.section3Title', { defaultValue: '3. Permitted Use & User Content Responsibility' })}
          </h2>
          <p className={styles['section-text']}>
            {t('landing.terms.section3Text', {
              defaultValue:
                'SWAYA is a local media organization and video playback tool. You are solely responsible for all video files, audio tracks, images, and text imported or processed through the application.',
            })}
          </p>
          <ul className={styles.list}>
            <li>{t('landing.terms.section3Point1', { defaultValue: 'You retain 100% ownership and copyright over your media files. SWAYA never transmits your media or claims ownership over any content in your library.' })}</li>
            <li>{t('landing.terms.section3Point2', { defaultValue: 'You agree to use SWAYA in compliance with all applicable local, national, and international laws, including copyright and intellectual property rights.' })}</li>
          </ul>
        </section>

        {/* 4. Updates & Lifetime Access */}
        <section className={styles.section} aria-labelledby="updates">
          <h2 id="updates" className={styles['section-title']}>
            <RefreshCw size={18} color="var(--color-accent-primary)" />
            {t('landing.terms.section4Title', { defaultValue: '4. Lifetime Updates & Maintenance' })}
          </h2>
          <p className={styles['section-text']}>
            {t('landing.terms.section4Text', {
              defaultValue:
                'Your lifetime license entitles you to download and apply all version 1.x software updates, feature enhancements, metadata scraping provider fixes, and security patches free of charge for the lifecycle of the product.',
            })}
          </p>
        </section>

        {/* 5. Disclaimer & Limitation of Liability */}
        <section className={styles.section} aria-labelledby="disclaimer">
          <h2 id="disclaimer" className={styles['section-title']}>
            <AlertTriangle size={18} color="var(--color-accent-primary)" />
            {t('landing.terms.section5Title', { defaultValue: '5. Disclaimer of Warranties & Limitation of Liability' })}
          </h2>
          <p className={styles['section-text']}>
            {t('landing.terms.section5Text1', {
              defaultValue:
                'SWAYA is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. SWAYA provides simulated preview capabilities for file organization and renaming operations; you are responsible for reviewing file move previews prior to applying destructive disk operations.',
            })}
          </p>
          <p className={styles['section-text']}>
            {t('landing.terms.section5Text2', {
              defaultValue:
                'To the maximum extent permitted by applicable law, SWAYA and its developers shall not be liable for any indirect, incidental, or consequential damages, including loss of data or storage media failure.',
            })}
          </p>
        </section>

        {/* 6. Support & Contact */}
        <section className={styles.section} aria-labelledby="contact">
          <h2 id="contact" className={styles['section-title']}>
            <Mail size={18} color="var(--color-accent-primary)" />
            {t('landing.terms.section6Title', { defaultValue: '6. Customer Support & Refund Requests' })}
          </h2>
          <p className={styles['section-text']}>
            {t('landing.terms.section6Text', {
              defaultValue:
                'To request a refund, report a technical issue, or ask questions regarding these terms, please contact us directly at levicore@proton.me. Please include your Stripe purchase email and license key for expedited assistance.',
            })}
          </p>
        </section>
      </div>
    </div>
  );
}
