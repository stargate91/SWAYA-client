import { useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/providers/LanguageContext';
import { useQueryParams } from '@/hooks/useQueryParams';
import { AlertTriangle } from '@/ui/icons';
import {
  useListsQuery,
  useListDetailsQuery,
  useCreateListMutation,
  useImportListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
  useAddListItemMutation,
  useUploadListImageMutation,
  useOverrideListImageMutation,
  useSettingsQuery,
  useRemoveListItemMutation,
} from '@/queries';
import api from '@/lib/api';
import { useLibraryModeStore, isNsfwMode } from '@/stores/useLibraryModeStore';
import { useUi } from '@/providers/UiProvider';
import { translateListName, translateListDescription } from '@/lib/listTranslations';
import { formatDateIso } from '@/lib/formatters';
import { resolveSearchResultPath } from '@/lib/urlHelpers';
import { getCreditDetailPath, resolveLibraryItemPath } from '@/lib/routes';
import { useListFilters } from './useListFilters';

export default function useListsPageState() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast, openModal } = useUi();
  const { getString, setParam } = useQueryParams();
  const sessionMode = useLibraryModeStore((state) => state.sessionMode);
  const { data: settings } = useSettingsQuery();
  const isAdultSettingEnabled = settings?.include_adult === true || settings?.include_adult === 'true';
  const { data: rawLists = [], isLoading } = useListsQuery(isAdultSettingEnabled);

  const lists = useMemo(() => {
    return rawLists
      .filter((l) => {
        const isAdultList = !!l.is_adult;
        return isNsfwMode(sessionMode) ? isAdultList : !isAdultList;
      })
      .map((l) => ({
        ...l,
        name: translateListName(l, t),
        description: translateListDescription(l, l.description, t),
      }));
  }, [rawLists, sessionMode, t]);

  const createMutation = useCreateListMutation();
  const importListMutation = useImportListMutation();
  const updateMutation = useUpdateListMutation();
  const deleteMutation = useDeleteListMutation();
  const addListItemMutation = useAddListItemMutation();
  const uploadImageMutation = useUploadListImageMutation();
  const overrideImageMutation = useOverrideListImageMutation();
  const removeListItemMutation = useRemoveListItemMutation();

  const fileInputRef = useRef(null);

  const urlListId = getString('id');
  const activeList = useMemo(() => {
    if (lists.length === 0) return null;
    if (urlListId) {
      const found = lists.find((l) => String(l.id) === String(urlListId));
      if (found) return found;
    }
    return lists.find((l) => l.is_watchlist) || lists[0] || null;
  }, [lists, urlListId]);

  const activeListId = activeList?.id || null;

  const setActiveListId = useCallback(
    (id) => {
      setParam('id', id ? String(id) : null);
    },
    [setParam]
  );

  const filters = useListFilters({ activeList, t });

  const { data: activeListDetails, isLoading: isDetailsLoading } = useListDetailsQuery(
    activeListId,
    filters.queryParams,
    { enabled: !!activeListId }
  );

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      toast(t('lists.importing') || 'Importing list package...', 'info');
      const importedList = await importListMutation.mutateAsync(file);
      if (importedList && importedList.id) {
        setActiveListId(importedList.id);
      }
      toast(t('lists.import_success') || 'List imported successfully', 'success');
    } catch (err) {
      openModal({
        title: t('common.error') || 'Error',
        icon: AlertTriangle,
        variant: 'danger',
        content: (t('lists.import_failed') || 'Failed to import list: ') + (err.message || err),
      });
    } finally {
      e.target.value = '';
    }
  };

  const handleTriggerImport = () => {
    fileInputRef.current?.click();
  };

  const handleExportList = async (listId) => {
    if (!listId) return;
    try {
      toast(t('lists.exporting') || 'Preparing export package...', 'info');
      const { blob, filename } = await api.lists.exportList(listId);
      const url = window.URL.createObjectURL(blob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', url);
      downloadAnchor.setAttribute('download', filename);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      window.URL.revokeObjectURL(url);
      toast(t('lists.export_success') || 'List exported successfully', 'success');
    } catch (err) {
      console.error(err);
      toast(t('lists.export_failed') || 'Failed to export list', 'danger');
    }
  };

  const handleRemoveListItem = async (itemId) => {
    try {
      await removeListItemMutation.mutateAsync({
        listId: activeListId,
        itemId,
      });
      toast(t('lists.item_removed_success') || 'Item removed from list', 'success');
    } catch (err) {
      toast(err.message || t('lists.remove_item_failed') || 'Failed to remove item', 'danger');
    }
  };

  const handleCardClick = (item) => {
    if (item.target_path) {
      navigate(item.target_path, { state: { allowAdult: true } });
      return;
    }
    const resolvedPath =
      resolveSearchResultPath(item, item.provider) ||
      getCreditDetailPath(item, item.media_type, item.provider) ||
      resolveLibraryItemPath(item);
    if (resolvedPath) {
      navigate(resolvedPath, { state: { allowAdult: true } });
      return;
    }
  };

  const createdLabel = activeList?.created_at
    ? (t('lists.created_prefix') || 'CREATED') + ': ' + formatDateIso(activeList.created_at)
    : '';

  const availableGenres = useMemo(() => {
    return ['all', ...(activeListDetails?.genres || [])];
  }, [activeListDetails]);

  const filteredListItems = useMemo(() => {
    return activeListDetails?.items || [];
  }, [activeListDetails]);

  return {
    t,
    isLoading,
    lists,
    settings,
    sessionMode,
    activeListId,
    setActiveListId,
    activeList,
    activeListDetails,
    isDetailsLoading,
    fileInputRef,
    handleFileChange,
    handleTriggerImport,
    handleExportList,
    handleCardClick,
    handleRemoveListItem,
    createdLabel,
    filteredListItems,
    addListItemMutation,
    createMutation,
    updateMutation,
    deleteMutation,
    uploadImageMutation,
    overrideImageMutation,
    filters,
    ...filters,
    availableGenres: availableGenres.length > 1 ? availableGenres : filters.availableGenres,
  };
}
