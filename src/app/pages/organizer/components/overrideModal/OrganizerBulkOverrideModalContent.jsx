import SidePanelLayout from '@/ui/SidePanelLayout';
import Stack from '@/ui/Stack';
import { useBulkOverrideModalState } from '../../hooks';
import BulkOverrideReorderPanel from './BulkOverrideReorderPanel';
import BulkOverrideFields from './BulkOverrideFields';
import BulkOverrideMatchActionSelector from './BulkOverrideMatchActionSelector';

export default function OrganizerBulkOverrideModalContent({
  rows,
  onClose,
  toast,
  scanMode,
  sessionMode,
}) {
  const modalState = useBulkOverrideModalState({
    rows,
    onClose,
    toast,
    scanMode,
    sessionMode,
  });

  const {
    t,
    isSidebarActive,
    handleSubmit,
    showMatchActionSelector,
    matchAction,
    setMatchAction,
    startEpisodeNum,
    setStartEpisodeNum,
    orderedItems,
    draggedIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleMoveUp,
    handleMoveDown,
  } = modalState;

  return (
    <form id="organizer-bulk-override-form" onSubmit={handleSubmit}>
      <SidePanelLayout
        side="right"
        panelWidth="26rem"
        showPanel={isSidebarActive}
        panelClassName="has-bulk-override-side-panel"
        panelContent={
          <BulkOverrideReorderPanel
            t={t}
            startEpisodeNum={startEpisodeNum}
            setStartEpisodeNum={setStartEpisodeNum}
            orderedItems={orderedItems}
            draggedIndex={draggedIndex}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragEnd={handleDragEnd}
            handleMoveUp={handleMoveUp}
            handleMoveDown={handleMoveDown}
          />
        }
      >
        <Stack gap="lg" fullWidth>
          <BulkOverrideFields form={modalState.form} />

          {showMatchActionSelector && (
            <BulkOverrideMatchActionSelector
              t={t}
              matchAction={matchAction}
              setMatchAction={setMatchAction}
            />
          )}
        </Stack>
      </SidePanelLayout>
    </form>
  );
}
