import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '@/providers/LanguageContext';
import {
  Info,
  ScrollText,
  Lock,
  Library,
  CircleHelp,
} from '@/ui/icons';
import { useSettingsQuery, useUpdateSettingsMutation, useChangelogQuery } from '@/queries';
import { useQueryParams } from '@/hooks/useQueryParams';

export const APP_INFO = {
  name: 'Swaya',
  version: '1.0.0',
  developer: {
    name: 'Levi',
    email: 'levicore@proton.me',
    website: 'https://swaya.xyz',
    github: 'https://github.com/zsakfoso',
    discordServer: 'https://discord.gg/pEFY4ZFGKy',
  },
};

export function useAboutPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { getString, setParam } = useQueryParams();

  const tabParam = getString('tab', 'info');
  const initialTab = location.state?.activeTab || tabParam || 'info';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [isDocsExpanded, setIsDocsExpanded] = useState(() => initialTab.startsWith('docs_'));
  const [wizardStep, setWizardStep] = useState(0);

  const { data: settings = {} } = useSettingsQuery();
  const updateSettingsMutation = useUpdateSettingsMutation();
  const [activeLightboxUrl, setActiveLightboxUrl] = useState(null);

  const {
    data: changelogContent = '',
    isLoading: isLoadingChangelog,
    error: changelogErrorObj,
  } = useChangelogQuery({
    enabled: activeTab === 'changelog',
  });
  const changelogError = changelogErrorObj ? changelogErrorObj.message || 'Failed to load changelog' : null;

  const handleSetActiveTab = useCallback((tabId) => {
    setActiveTab(tabId);
    setParam('tab', tabId);
    setWizardStep(0);
    if (!tabId.startsWith('docs_')) {
      setIsDocsExpanded(false);
    }
  }, [setParam]);

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        const target = e.target;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && target.tagName !== 'SELECT') {
          handleClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  const docSubItems = useMemo(() => [
    { id: 'docs_tmdb', label: t('dynamic.docsItems.tmdb') || 'TMDb API Key' },
    { id: 'docs_omdb', label: t('dynamic.docsItems.omdb') || 'OMDb API Key' },
    { id: 'docs_stashdb', label: t('dynamic.docsItems.stashdb') || 'StashDB' },
    { id: 'docs_fansdb', label: t('dynamic.docsItems.fansdb') || 'FansDB' },
    { id: 'docs_theporndb', label: t('dynamic.docsItems.theporndb') || 'ThePornDB' },
    { id: 'docs_offline', label: t('dynamic.docsItems.offline') || 'Offline Scan' },
  ], [t]);

  const tabs = useMemo(() => [
    { id: 'info', label: t('about.general'), icon: Info },
    { id: 'docs', label: t('about.resources.docs') || 'Setup Guides', icon: CircleHelp, subItems: docSubItems },
    { id: 'changelog', label: t('about.resources.changelog'), icon: ScrollText },
    { id: 'privacy', label: t('about.notices.privacy'), icon: Lock },
    { id: 'license', label: t('about.notices.license'), icon: ScrollText },
    { id: 'third_party', label: t('about.notices.third_party'), icon: Library },
  ], [docSubItems, t]);

  return {
    t,
    activeTab,
    isDocsExpanded,
    setIsDocsExpanded,
    handleSetActiveTab,
    wizardStep,
    setWizardStep,
    settings,
    updateSettingsMutation,
    activeLightboxUrl,
    setActiveLightboxUrl,
    changelogContent,
    isLoadingChangelog,
    changelogError,
    handleClose,
    tabs,
    appInfo: APP_INFO,
  };
}

export default useAboutPage;
