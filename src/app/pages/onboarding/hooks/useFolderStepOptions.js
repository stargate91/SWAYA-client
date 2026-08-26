import { useMemo } from 'react';
import { Library, FolderOpen, FolderTree } from '@/ui/icons';

export function useFolderStepOptions({ t, orgMode }) {
  const options = useMemo(() => [
    {
      id: 'register',
      icon: Library,
      title: t('onboarding.folder.registerTitle', { defaultValue: 'Register Only' }),
      desc: t('onboarding.folder.registerDesc', { defaultValue: 'Imports metadata to the database, leaving files completely untouched.' }),
    },
    {
      id: 'rename_inplace',
      icon: FolderOpen,
      title: t('onboarding.folder.renameTitle', { defaultValue: 'Rename In-Place' }),
      desc: t('onboarding.folder.renameDesc', { defaultValue: 'Renames and formats files directly in their current directories.' }),
    },
    {
      id: 'move_organize',
      icon: FolderTree,
      title: t('onboarding.folder.moveTitle', { defaultValue: 'Move & Organize' }),
      desc: t('onboarding.folder.moveDesc', { defaultValue: 'Renames, structures, and moves files into a dedicated target folder.' }),
    },
  ], [t]);

  const activeOption = useMemo(
    () => options.find((opt) => opt.id === orgMode) || options[0],
    [options, orgMode]
  );

  return {
    options,
    activeOption,
  };
}
