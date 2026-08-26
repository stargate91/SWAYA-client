import { useMemo } from 'react';
import { useStructurePreviewModel } from './useStructurePreviewModel';

/**
 * Custom hook to prepare tree data, icons, preview items,
 * and tone colors for StructurePreviewPanel.
 *
 * @param {object} params
 * @param {object} params.form - Settings form data
 * @param {Function} params.t - Translation function
 * @param {string} [params.filterType] - Filter type
 */
export function useStructureTreeRenderer({ form, t, filterType } = {}) {
  const { model, resolveToneColor } = useStructurePreviewModel(form, t, filterType);

  const isTreeMode = model?.mode === 'tree';
  const rootTitle = `${model?.rootIcon || ''} ${model?.rootLabel || ''}`.trim();
  const treeNodes = model?.nodes || [];
  const previewItems = model?.items || [];

  const icons = useMemo(() => ({
    folder: model?.folderIcon,
    file: model?.fileIcon,
  }), [model?.folderIcon, model?.fileIcon]);

  return {
    model,
    isTreeMode,
    rootTitle,
    treeNodes,
    previewItems,
    icons,
    arrow: model?.arrow,
    resolveToneColor,
  };
}

export default useStructureTreeRenderer;
