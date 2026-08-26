import { useMemo } from 'react';
import { ShieldCheck, HardDrive, CreditCard, Lock, EyeOff, Mail } from 'lucide-react';
import Badge from '@/ui/Badge';
import { Breadcrumb } from '../components/common';
import { useTranslation } from '@/providers/LanguageContext';
import { useLocalizedUrls } from '../hooks/useLocalizedUrls';
import { usePageMeta } from '../hooks/usePageMeta';
import { getPrivacyJsonLd } from '../schema/legalSchema';
import { DEV_EMAIL } from '../data/siteConfig';
import styles from './PrivacyPage.module.css';

export default function PrivacyPage() {
  const { t, locale } = useTranslation();
  const { homeUrl, prefix, privacyUrl: privacyPath } = useLocalizedUrls();
  const privacyUrl = `https://swaya.xyz${privacyPath}`;

  const title = `${t('landing.privacy.title', { defaultValue: 'Privacy Policy' })} - SWAYA`;
  const description = t('landing.privacy.subtitle', {
    defaultValue:
      'SWAYA is engineered as an offline-first desktop application. We prioritize your privacy with zero telemetry, complete local data storage, and strict cryptographic protections.',
  });

  const jsonLd = useMemo(
    () =>
      getPrivacyJsonLd({
        locale,
        prefix,
        privacyUrl,
        title: t('landing.privacy.title', { defaultValue: 'Privacy Policy' }),
        description,
        breadcrumbHome: t('landing.footer.links.home', { defaultValue: 'Home' }),
        breadcrumbPrivacy: t('landing.privacy.title', { defaultValue: 'Privacy Policy' }),
      }),
    [locale, prefix, privacyUrl, description, t]
  );

  usePageMeta({
    title,
    description,
    url: privacyUrl,
    canonicalUrl: privacyUrl,
    pathname: privacyPath,
    locale: locale || 'en',
    ogType: 'website',
    ogImage: 'https://swaya.xyz/og/privacy.jpg',
    jsonLd,
  });

  const breadcrumbItems = [
    { label: t('landing.footer.links.home', { defaultValue: 'Home' }), to: homeUrl },
    { label: t('landing.footer.links.privacy', { defaultValue: 'Privacy Policy' }) },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Breadcrumb items={breadcrumbItems} />

        <div className={styles['badge-row']}>
          <Badge tone="accent" size="sm" leftIcon={<ShieldCheck size={12} aria-hidden="true" />}>
            {t('landing.privacy.badge', { defaultValue: 'Privacy & Security' })}
          </Badge>
        </div>

        <h1 className={styles.title}>
          {t('landing.privacy.title', { defaultValue: 'Privacy Policy' })}
        </h1>

        <p className={styles.description}>
          {t('landing.privacy.subtitle', {
            defaultValue:
              'SWAYA is engineered as an offline-first desktop application. We prioritize your privacy with zero telemetry, complete local data storage, and strict cryptographic protections.',
          })}
        </p>

        <div className={styles['meta-row']}>
          <span>{t('landing.privacy.lastUpdated', { defaultValue: 'Last updated: August 20, 2026' })}</span>
          <span>•</span>
          <span>{t('landing.privacy.scope', { defaultValue: 'Applies to SWAYA Desktop & swaya.xyz' })}</span>
        </div>
      </header>

      <div className={styles.content}>
        {/* 1. Offline & Zero Telemetry */}
        <section className={styles.section} aria-labelledby="offline-first">
          <h2 id="offline-first" className={styles['section-title']}>
            <HardDrive size={18} color="var(--color-accent-primary)" />
            {t('landing.privacy.section1Title', { defaultValue: '1. Zero-Telemetry & Local Media Storage' })}
          </h2>
          <p className={styles['section-text']}>
            {t('landing.privacy.section1Text', {
              defaultValue:
                'SWAYA is an offline-first desktop media center and video player. Your media files, filenames, folder structures, playback history, ratings, tags, and personal notes are stored strictly on your local computer in a local SQLite database (data/swaya.db).',
            })}
          </p>
          <ul className={styles.list}>
            <li>{t('landing.privacy.section1Point1', { defaultValue: 'We do not transmit, index, or inspect your video files, downloads, or disk contents.' })}</li>
            <li>{t('landing.privacy.section1Point2', { defaultValue: 'We do not record playback time, viewing sessions, or application usage habits.' })}</li>
            <li>{t('landing.privacy.section1Point3', { defaultValue: 'All metadata scraping queries (TMDb, OMDb, StashDB, etc.) are executed directly from your local machine to the chosen API provider without proxying through our servers.' })}</li>
          </ul>
        </section>

        {/* 2. Billing & Purchase */}
        <section className={styles.section} aria-labelledby="billing">
          <h2 id="billing" className={styles['section-title']}>
            <CreditCard size={18} color="var(--color-accent-primary)" />
            {t('landing.privacy.section2Title', { defaultValue: '2. Purchase Information & License Delivery' })}
          </h2>
          <p className={styles['section-text']}>
            {t('landing.privacy.section2Text', {
              defaultValue:
                'When you purchase a SWAYA license, your payment is securely processed by Stripe Inc. We never receive or store your raw payment details (such as credit card numbers, CVV, or banking credentials).',
            })}
          </p>
          <ul className={styles.list}>
            <li>{t('landing.privacy.section2Point1', { defaultValue: 'Data Collected: Customer email address, customer name (optional), Stripe transaction ID, and timestamp.' })}</li>
            <li>{t('landing.privacy.section2Point2', { defaultValue: 'Purpose: Solely to generate your cryptographically signed license key, dispatch your confirmation email, and provide customer support.' })}</li>
            <li>{t('landing.privacy.section2Point3', { defaultValue: 'Retention: Billing records are maintained for licensing verification and accounting compliance as required by applicable tax law.' })}</li>
          </ul>
        </section>

        {/* 3. Offline Cryptographic Verification */}
        <section className={styles.section} aria-labelledby="licensing">
          <h2 id="licensing" className={styles['section-title']}>
            <Lock size={18} color="var(--color-accent-primary)" />
            {t('landing.privacy.section3Title', { defaultValue: '3. Device Activation & Offline Validation' })}
          </h2>
          <p className={styles['section-text']}>
            {t('landing.privacy.section3Text', {
              defaultValue:
                'When you activate a license key on a desktop device, a one-time cryptographic request is sent to our activation server to issue an HMAC-SHA256 offline license token:',
            })}
          </p>
          <ul className={styles.list}>
            <li>{t('landing.privacy.section3Point1', { defaultValue: 'The activation request contains an irreversible, hashed hardware identifier to ensure compliance with the 3-device seat limit.' })}</li>
            <li>{t('landing.privacy.section3Point2', { defaultValue: 'Once activated, the license token is stored locally on your machine. SWAYA functions 100% offline without requiring a persistent internet connection.' })}</li>
            <li>{t('landing.privacy.section3Point3', { defaultValue: 'You may deactivate a device at any time directly from the Settings panel to release the seat.' })}</li>
          </ul>
        </section>

        {/* 4. Website Analytics & Cookies */}
        <section className={styles.section} aria-labelledby="cookies">
          <h2 id="cookies" className={styles['section-title']}>
            <EyeOff size={18} color="var(--color-accent-primary)" />
            {t('landing.privacy.section4Title', { defaultValue: '4. Website Analytics & Cookie Consent' })}
          </h2>
          <p className={styles['section-text']}>
            {t('landing.privacy.section4Text', {
              defaultValue:
                'On our marketing website (swaya.xyz), we utilize privacy-focused, zero-PII analytics to measure page load performance, Core Web Vitals, and aggregate traffic:',
            })}
          </p>
          <ul className={styles.list}>
            <li>{t('landing.privacy.section4Point1', { defaultValue: 'We do not track cross-site browsing, fingerprint your device, or sell marketing data to third-party advertising networks.' })}</li>
            <li>{t('landing.privacy.section4Point2', { defaultValue: 'Performance analytics are strictly opt-in via our GDPR cookie consent banner.' })}</li>
          </ul>
        </section>

        {/* 5. User Rights & Contact */}
        <section className={styles.section} aria-labelledby="contact">
          <h2 id="contact" className={styles['section-title']}>
            <Mail size={18} color="var(--color-accent-primary)" />
            {t('landing.privacy.section5Title', { defaultValue: '5. Your Rights & Contact Information' })}
          </h2>
          <p className={styles['section-text']}>
            {t('landing.privacy.section5Text', {
              defaultValue:
                'Under GDPR, CCPA, and applicable global data privacy regulations, you have the right to request access to, rectification of, or deletion of your billing email and licensing records from our activation server.',
            })}
          </p>
          <p className={styles['section-text']}>
            {t('landing.privacy.section5Contact', { defaultValue: 'For any inquiries, data deletion requests, or licensing support, contact us directly at' })}{' '}
            <a href={`mailto:${DEV_EMAIL}`} style={{ color: 'var(--color-accent-primary)', textDecoration: 'underline' }}>
              {DEV_EMAIL}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
