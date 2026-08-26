import { useParams, useNavigate } from 'react-router-dom';
import PerformerLinkingTab from './tabs/PerformerLinkingTab';
import PerformerMixerTab from './tabs/PerformerMixerTab';
import PerformerCustomValuesTab from './tabs/PerformerCustomValuesTab';
import { useTranslation } from '@/providers/LanguageContext';
import NavMenu from '@/ui/NavMenu';
import Overlay from '@/ui/Overlay';
import PageHeader from '@/ui/PageHeader';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import { usePerformerEditController } from './usePerformerEditController';
import styles from './PerformerEditPage.module.css';

export default function PerformerEditPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    person,
    isAdult,
    isLoading,
    error,
    activeTab,
    setIsCustomDirty,
    isShaking,
    handleClose,
    handleTabClick,
    sidebarGroups,
  } = usePerformerEditController({ id, t, navigate });

  if (isLoading) {
    return (
      <div className="settings-overlay settings-overlay--centered">
        <div className="settings-loading-state">
          <span className="settings-loading-text">{t('library.performerEdit.loadingPerformer') || 'Loading Performer...'}</span>
        </div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="settings-overlay settings-overlay--centered">
        <div className="settings-error-card">
          <div className="settings-error-content">
            <h3>{t('library.performerEdit.failedToLoadPerformer') || 'Failed to load performer'}</h3>
            <button className="btn btn--primary" onClick={handleClose}>{t('common.back') || 'Back'}</button>
          </div>
        </div>
      </div>
    );
  }

  const sidebarHeader = (
    <>
      <Text as="h1" variant="body" color="primary" className="ui-sidebar-header">
        {person.is_adult ? (t('library.performerEdit.editPerformer') || 'Edit Star') : (t('library.performerEdit.editArtist') || 'Edit Artist')}
      </Text>
      <div className={styles['sidebar-header-container']}>
        <Text as="h2" variant="display" weight="semibold">
          {person.name}
        </Text>
      </div>
    </>
  );

  return (
    <Overlay width="fluid" padding="compact" onClose={handleClose} escHint={t('library.performerEdit.esc')}>
      <NavMenu
        header={sidebarHeader}
        groups={sidebarGroups}
        onTabSelect={handleTabClick}
      />

      <Overlay.ContentWrapper>
        <Overlay.Content>
          {isAdult && activeTab === 'linking' && (
            <Stack gap="lg">
              <PageHeader
                title={t('library.performerEdit.linkedProfiles') || 'Linked Profiles'}
                description={t('library.performerEdit.linkedProfilesSubtitle') || 'Link profiles from online databases to automatically import their details.'}
              />
              <PerformerLinkingTab
                personId={person.id}
                defaultQuery={person.name}
                person={person}
                onClose={handleClose}
              />
            </Stack>
          )}

          {activeTab === 'mixer' && (
            <Stack gap="lg">
              <PageHeader
                title={t('library.performerEdit.dataMixerGrid') || 'Info Sources Grid'}
                description={t('library.performerEdit.dataMixerGridSubtitle') || 'Pick which website we should get each detail from (like their birthday or height).'}
              />
              <PerformerMixerTab
                person={person}
                onBack={handleClose}
              />
            </Stack>
          )}

          {activeTab === 'custom' && (
            <Stack gap="md">
              <PerformerCustomValuesTab
                personId={person.id}
                person={person}
                onDirtyChange={setIsCustomDirty}
                isShaking={isShaking}
              />
            </Stack>
          )}
        </Overlay.Content>
      </Overlay.ContentWrapper>
    </Overlay>
  );
}


