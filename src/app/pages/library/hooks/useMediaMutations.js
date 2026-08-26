import {
  useUpdateMediaStatusMutation, usePlayMediaMutation,
  useBulkUpdateWatchedMutation, useOverrideBackdropMutation, useToggleTrackedMutation,
  useAddPeakMutation, useDeletePeakMutation, useDeleteLibraryItemMutation
} from '@/queries';

export function useMediaMutations() {
  const updateStatusMutation = useUpdateMediaStatusMutation();
  const overrideBackdropMutation = useOverrideBackdropMutation();
  const toggleTrackedMutation = useToggleTrackedMutation();
  const addPeakMutation = useAddPeakMutation();
  const deletePeakMutation = useDeletePeakMutation();
  const playMutation = usePlayMediaMutation();
  const bulkUpdateWatchedMutation = useBulkUpdateWatchedMutation();
  const deleteLibraryItemMutation = useDeleteLibraryItemMutation();

  return {
    updateStatusMutation,
    overrideBackdropMutation,
    toggleTrackedMutation,
    playMutation,
    bulkUpdateWatchedMutation,
    addPeakMutation,
    deletePeakMutation,
    deleteLibraryItemMutation
  };
}
