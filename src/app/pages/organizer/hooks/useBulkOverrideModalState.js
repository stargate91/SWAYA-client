import { useState, useMemo, useEffect } from 'react';
import { useBulkUpdateMediaMutation } from '@/queries';
import { useBulkOverrideForm } from './useBulkOverrideForm';

/**
 * Orchestrator hook for the Bulk Override modal dialog.
 * Handles drag-and-drop item ordering, submission payload building,
 * side-panel class syncing, and delegates form state to useBulkOverrideForm.
 */
export function useBulkOverrideModalState({ rows, onClose, toast, scanMode, sessionMode }) {
  const form = useBulkOverrideForm({ rows, scanMode, sessionMode });
  const {
    t,
    isExtra,
    category,
    initialMainType,
    mainType,
    applyMainType,
    targetLanguage,
    applyTargetLanguage,
    source,
    applySource,
    edition,
    applyEdition,
    audioType,
    applyAudioType,
    seasonNum,
    applySeasonNum,
    parentId,
    applyParentId,
    subcategory,
    applySubcategory,
    language,
    applyLanguage,
    applyAutoNumbering,
    isEpisode,
  } = form;

  // Auto-numbering and ordering states (for episodes)
  const [orderedItems, setOrderedItems] = useState(() => [...rows]);
  const [startEpisodeNum, setStartEpisodeNum] = useState('1');
  const [matchAction, setMatchAction] = useState('keep');

  const hasMatched = useMemo(() => rows.some((row) => row.rawStatus === 'matched'), [rows]);
  const isModifyingSeasonOrEpisode = applySeasonNum || applyAutoNumbering;
  const showMatchActionSelector = hasMatched && initialMainType === 'episode' && isEpisode && isModifyingSeasonOrEpisode;

  const bulkUpdateMutation = useBulkUpdateMediaMutation();

  useEffect(() => {
    const modalElement = document.querySelector('.ui-modal');
    if (modalElement) {
      if (mainType === 'episode' && applyAutoNumbering) {
        modalElement.classList.add('has-side-panel');
      } else {
        modalElement.classList.remove('has-side-panel');
      }
    }
  }, [mainType, applyAutoNumbering]);

  // Drag and Drop handlers
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const newList = [...orderedItems];
    const draggedItem = newList[draggedIndex];
    newList.splice(draggedIndex, 1);
    newList.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    setOrderedItems(newList);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newList = [...orderedItems];
    const item = newList[index];
    newList.splice(index, 1);
    newList.splice(index - 1, 0, item);
    setOrderedItems(newList);
  };

  const handleMoveDown = (index) => {
    if (index === orderedItems.length - 1) return;
    const newList = [...orderedItems];
    const item = newList[index];
    newList.splice(index, 1);
    newList.splice(index + 1, 0, item);
    setOrderedItems(newList);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (initialMainType !== 'episode' && mainType === 'episode') {
      if (!applySeasonNum || !String(seasonNum ?? '').trim()) {
        toast(t('organizer.toasts.bulkOverrideSeasonRequired'), 'danger');
        return;
      }
      if (!applyAutoNumbering || !String(startEpisodeNum ?? '').trim()) {
        toast(t('organizer.toasts.bulkOverrideAutoNumberRequired'), 'danger');
        return;
      }
    }

    if (applyMainType && mainType === 'bonus') {
      if (!applyParentId || !parentId) {
        toast(t('organizer.toasts.bulkOverrideParentRequired') || 'A parent item must be selected when converting to bonus videos.', 'danger');
        return;
      }
    }

    if (applyParentId && (mainType === 'bonus' || mainType === 'extra') && rows.some((r) => String(r.itemId) === String(parentId))) {
      toast(t('organizer.toasts.selfParentError') || 'An item cannot be its own parent.', 'danger');
      return;
    }

    const payload = {
      ids: rows.map((r) => r.itemId),
      type: isExtra ? 'extra' : 'media',
    };

    if (showMatchActionSelector && matchAction === 'reset') {
      payload.reset_match = true;
    }

    if (applyMainType) {
      payload.main_type = mainType;
    }

    if (mainType === 'bonus' || mainType === 'extra') {
      if (applyParentId) payload.parent_id = parentId;
      if (category !== 'metadata') {
        if (applySubcategory) payload.subtype = subcategory;
      }
      if (mainType === 'extra') {
        if (category === 'subtitle' || category === 'audio') {
          if (applyLanguage) payload.language = language;
        }
      }
    } else {
      if (applyTargetLanguage) payload.custom_language = targetLanguage;
      if (applyAudioType) payload.custom_audio_type = audioType;
      if (mainType === 'movie' || mainType === 'scene') {
        if (applySource) payload.custom_source = source;
        if (applyEdition) payload.custom_edition = edition;
      } else if (mainType === 'episode') {
        if (applySeasonNum) payload.season = seasonNum;
      }
    }

    // Prepare item-specific updates (e.g. calculated episode numbers)
    const itemUpdates = [];
    if (mainType === 'episode' && applyAutoNumbering) {
      const startNum = parseInt(startEpisodeNum, 10);
      if (Number.isNaN(startNum)) {
        toast(t('organizer.toasts.bulkOverrideStartEpisodeInvalid'), 'danger');
        return;
      }
      orderedItems.forEach((item, index) => {
        itemUpdates.push({
          id: item.itemId,
          updates: {
            episode: String(startNum + index),
          },
        });
      });
    }

    if (itemUpdates.length > 0) {
      payload.item_updates = itemUpdates;
    }

    try {
      await bulkUpdateMutation.mutateAsync({
        ...payload,
        scanMode,
        sessionMode,
      });
      toast(t('organizer.toasts.bulkOverrideSuccess'), 'success');
      onClose();
    } catch (err) {
      toast(err.message || t('organizer.toasts.bulkOverrideSaveFailed'), 'danger');
    }
  };

  const isSidebarActive = mainType === 'episode' && applyAutoNumbering;

  return {
    ...form,
    form,
    orderedItems,
    startEpisodeNum,
    setStartEpisodeNum,
    matchAction,
    setMatchAction,
    showMatchActionSelector,
    isSidebarActive,
    draggedIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleMoveUp,
    handleMoveDown,
    handleSubmit,
    isSaving: bulkUpdateMutation.isPending,
  };
}
