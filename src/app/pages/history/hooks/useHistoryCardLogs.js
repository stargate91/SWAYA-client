import { useState, useMemo, useCallback } from 'react';
import { useBatchLogsQuery } from '@/queries';
import { formatDateTime, parsePathAndFilename } from '@/lib/formatters';
import { getHistoryCardStatusConfig } from '../utils/historyHelpers';

export function useHistoryCardLogs({
  batch,
  isAnyTaskActive = false,
  isReverting = false,
  onConfirmUndo,
  t = (k) => k,
} = {}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isUndone = batch?.status === 'undone';
  const isRevertDisabled = isUndone || Boolean(isAnyTaskActive) || Boolean(isReverting);

  const statusConfig = useMemo(() => {
    return getHistoryCardStatusConfig(batch?.status);
  }, [batch?.status]);

  const totalFiles = (batch?.success_count || 0) + (batch?.failed_count || 0);
  const canShowDetails = totalFiles > 0 || (Array.isArray(batch?.logs) && batch.logs.length > 0);

  const {
    data: batchLogsData,
    isLoading: isLoadingLogs,
    isError: isLogsError,
  } = useBatchLogsQuery(batch?.id, { enabled: isExpanded });

  const logs = useMemo(() => {
    return batchLogsData?.logs || batch?.logs || [];
  }, [batchLogsData?.logs, batch?.logs]);

  const hasLogs = logs.length > 0;
  const totalLogs = batchLogsData?.total;

  const formattedLogs = useMemo(() => {
    return logs.map((log) => {
      const { dir: oldDir, filename: oldFile } = parsePathAndFilename(log.old_value);
      const { dir: newDir, filename: newFile } = parsePathAndFilename(log.new_value);
      return {
        ...log,
        oldDir,
        oldFile,
        newDir,
        newFile,
      };
    });
  }, [logs]);

  const formattedCreatedAt = useMemo(() => {
    return batch?.created_at ? formatDateTime(batch.created_at) : '';
  }, [batch]);

  const batchIdLabel = useMemo(() => {
    return t('historyPage.batchIdLabel', { defaultValue: `ID: #${batch?.id}`, id: batch?.id });
  }, [t, batch]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleUndo = useCallback(() => {
    onConfirmUndo?.(batch);
  }, [batch, onConfirmUndo]);

  return {
    isExpanded,
    setIsExpanded,
    toggleExpanded,
    isUndone,
    isRevertDisabled,
    icon: statusConfig.icon,
    accentColor: statusConfig.accentColor,
    totalFiles,
    canShowDetails,
    logs,
    formattedLogs,
    totalLogs,
    hasLogs,
    isLoadingLogs,
    isLogsError,
    formattedCreatedAt,
    batchIdLabel,
    handleUndo,
  };
}

export default useHistoryCardLogs;
