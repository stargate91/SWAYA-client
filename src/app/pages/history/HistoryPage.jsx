import Page from '@/ui/Page';
import PageHeader from '@/ui/PageHeader';
import SegmentedControl from '@/ui/SegmentedControl';
import Lightbox from '@/ui/Lightbox';
import Stack from '@/ui/Stack';
import UtilityBarPortal from '@/ui/UtilityBarPortal';
import RenameHistoryList from './components/RenameHistoryList';
import WatchedHistoryList from './components/WatchedHistoryList';
import PeaksHistoryList from './components/PeaksHistoryList';
import useHistoryPage from './hooks/useHistoryPage';

export default function HistoryPage() {
  const {
    t,
    activeTab,
    setActiveTab,
    lightboxImage,
    setLightboxImage,
    tabOptions,
    pageTitle,
    pageDesc,
    history,
    isHistoryLoading,
    hasNextHistoryPage,
    isFetchingNextHistoryPage,
    historySentinelRef,
    isAnyTaskActive,
    isUndoing,
    revertingBatchIds,
    watchedHistory,
    isWatchedLoading,
    hasNextWatchedPage,
    isFetchingNextWatchedPage,
    watchedSentinelRef,
    playMutation,
    peaksData,
    isPeaksLoading,
    handlePlayMoment,
    handlePlay,
    handleNavigateMedia,
    handleConfirmUndo,
  } = useHistoryPage();

  const renderActiveContent = () => {
    if (activeTab === 'rename') {
      return (
        <RenameHistoryList
          isLoading={isHistoryLoading}
          history={history}
          hasNextPage={hasNextHistoryPage}
          isFetchingNextPage={isFetchingNextHistoryPage}
          sentinelRef={historySentinelRef}
          isAnyTaskActive={isAnyTaskActive}
          isUndoing={isUndoing}
          revertingBatchIds={revertingBatchIds}
          onConfirmUndo={handleConfirmUndo}
          t={t}
        />
      );
    }
    if (activeTab === 'watched') {
      return (
        <WatchedHistoryList
          isLoading={isWatchedLoading}
          watchedHistory={watchedHistory}
          hasNextPage={hasNextWatchedPage}
          isFetchingNextPage={isFetchingNextWatchedPage}
          sentinelRef={watchedSentinelRef}
          playMutation={playMutation}
          handlePlay={handlePlay}
          onTitleClick={handleNavigateMedia}
          t={t}
        />
      );
    }
    if (activeTab === 'peaks') {
      return (
        <PeaksHistoryList
          isLoading={isPeaksLoading}
          peaksData={peaksData}
          playMutation={playMutation}
          handlePlayMoment={handlePlayMoment}
          setLightboxImage={setLightboxImage}
          onTitleClick={handleNavigateMedia}
          t={t}
        />
      );
    }
    return null;
  };

  return (
    <Page>
      <UtilityBarPortal align="center">
        <SegmentedControl
          value={activeTab}
          onChange={setActiveTab}
          options={tabOptions}
          size="sm"
          animated={true}
        />
      </UtilityBarPortal>
      <Stack gap="2xl">
        <PageHeader
          title={pageTitle}
          description={pageDesc}
        />

        {renderActiveContent()}
      </Stack>
      {lightboxImage && (
        <Lightbox
          imageUrl={lightboxImage}
          onClose={() => setLightboxImage(null)}
          t={t}
        />
      )}
    </Page>
  );
}
