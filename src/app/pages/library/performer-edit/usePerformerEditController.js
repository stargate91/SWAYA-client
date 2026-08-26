import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePersonDetailQuery } from '@/queries/metadataQueries';
import { Link2, GitMerge, Sliders } from '@/ui/icons';

/**
 * Controller hook for PerformerEditPage managing data fetching, tab selection,
 * dirty state checking, shake animations, and keyboard navigation.
 */
export function usePerformerEditController({ id, t, navigate }) {
  const { data: person, isLoading, error } = usePersonDetailQuery(id);
  const isAdult = Boolean(person?.is_adult);

  const [selectedTab, setSelectedTab] = useState(null);
  const [isCustomDirty, setIsCustomDirty] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const activeTab = (!isAdult && selectedTab === 'linking')
    ? 'mixer'
    : (selectedTab ?? (isAdult ? 'linking' : 'mixer'));

  const triggerShake = useCallback(() => {
    setIsShaking(true);
    const timeout = setTimeout(() => setIsShaking(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = useCallback(() => {
    if (isCustomDirty) {
      triggerShake();
    } else {
      navigate(-1);
    }
  }, [navigate, isCustomDirty, triggerShake]);

  const handleTabClick = useCallback((tabId) => {
    if (isCustomDirty) {
      triggerShake();
    } else {
      setSelectedTab(tabId);
    }
  }, [isCustomDirty, triggerShake]);

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

  const tabs = useMemo(() => [
    ...(isAdult ? [{ id: 'linking', label: t('library.performerEdit.linkedProfiles') || 'Linked Profiles', icon: Link2 }] : []),
    { id: 'mixer', label: t('library.performerEdit.dataMixer') || 'Data Mixer', icon: GitMerge },
    { id: 'custom', label: t('library.performerEdit.customValues') || 'Custom Values', icon: Sliders },
  ], [isAdult, t]);

  const sidebarGroups = useMemo(() => tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    icon: tab.icon,
    isActive: activeTab === tab.id,
  })), [tabs, activeTab]);

  return {
    person,
    isAdult,
    isLoading,
    error,
    activeTab,
    isCustomDirty,
    setIsCustomDirty,
    isShaking,
    handleClose,
    handleTabClick,
    tabs,
    sidebarGroups,
  };
}

export default usePerformerEditController;
