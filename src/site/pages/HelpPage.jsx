import FaqSection from '../components/faq';
import {
  HelpHeader,
  HelpChannelsGrid,
  HelpQuickDocs,
} from '../components/help';
import { useHelpPage } from '../hooks/useHelpPage';
import styles from './HelpPage.module.css';

export default function HelpPage() {
  const {
    homeUrl,
    docsUrl,
    quickDocLinks,
    quickDocsTitle,
    quickDocsSubtitle,
    allGuidesLabel,
    helpFaqItems,
    helpChannels,
    t,
  } = useHelpPage();

  return (
    <div className={styles.container}>
      <HelpHeader homeUrl={homeUrl} t={t} />

      <HelpChannelsGrid channels={helpChannels} />

      <HelpQuickDocs
        quickDocLinks={quickDocLinks}
        docsUrl={docsUrl}
        title={quickDocsTitle}
        subtitle={quickDocsSubtitle}
        allGuidesLabel={allGuidesLabel}
      />

      <div className={styles['faq-wrapper']}>
        <FaqSection
          id="help-faq"
          tag={t('landing.help.badge', { defaultValue: 'Help & Community' })}
          title={t('landing.help.faq.title', {
            defaultValue: 'Frequently Asked Support Questions',
          })}
          subtitle={t('landing.help.faq.subtitle', {
            defaultValue:
              'Quick answers to common questions about licensing, privacy, and support.',
          })}
          items={helpFaqItems}
        />
      </div>
    </div>
  );
}
