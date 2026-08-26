const PHASE_RANGES = {
  collecting: [0, 50],
  resolving: [50, 100],
  organizing: [0, 100],
  undoing: [0, 100],
};

const RETRY_RANGES = {
  starting: [0, 0],
  resolving: [0, 100],
  organizing: [0, 100],
  undoing: [0, 100],
};

const OFFLINE_RANGES = {
  collecting: [0, 90],
  resolving: [90, 100],
  organizing: [0, 100],
  undoing: [0, 100],
};

export const clampPercent = (value) => Math.max(0, Math.min(100, value));

export const getPhaseProgress = (status) => {
  if (!status?.active) {
    return 0;
  }

  const total = Number(status.total) || 0;
  const current = Number(status.current) || 0;
  const currentFileProgress = Math.max(0, Math.min(1, Number(status.current_file_progress) || 0));
  if (total <= 0) {
    return 0;
  }

  const safeCurrent = Math.max(0, Math.min(total, current));
  const fractionalCurrent = safeCurrent >= total
    ? safeCurrent
    : Math.min(total, safeCurrent + currentFileProgress);

  return Math.max(0, Math.min(1, fractionalCurrent / total));
};

export const getScanProgress = (status) => {
  if (!status?.active) {
    return 0;
  }

  const phaseProgress = getPhaseProgress(status);
  
  let ranges = PHASE_RANGES;
  if (status.scan_mode === 'offline') {
    ranges = OFFLINE_RANGES;
  } else if (status.scan_type === 'retry') {
    ranges = RETRY_RANGES;
  }

  const range = ranges[status.phase];

  let progress;
  if (!range) {
    progress = clampPercent(Math.round(phaseProgress * 100));
  } else {
    const [start, end] = range;
    progress = clampPercent(Math.round(start + ((end - start) * phaseProgress)));
  }

  return status.active && progress >= 100 ? 99 : progress;
};

export { formatScanRemaining, formatImageRemaining } from '@/lib/formatters';

export const getScanTaskName = (status, t) => {
  if (!status?.active) {
    return t('progress.ready');
  }

  if (status.message) {
    return status.message;
  }

  const phaseLabelKey = `dynamic.scanPhases.${status.phase}`;
  const phaseLabel = t(phaseLabelKey);
  return phaseLabel === phaseLabelKey ? t('progress.working') : phaseLabel;
};

export const getImageProgress = (status) => {
  if (!status?.active) {
    return 0;
  }

  const progress = Number(status.progress);
  if (Number.isFinite(progress)) {
    return clampPercent(Math.round(progress));
  }

  const total = Number(status.total) || 0;
  const completed = Number(status.completed) || 0;
  if (total <= 0) {
    return 0;
  }

  return clampPercent(Math.round((completed / total) * 100));
};
