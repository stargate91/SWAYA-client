import { useEffect } from 'react';

export function useSettingsKeyboardShortcuts({ isDirty, isSaving, handleSave }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && (event.key === 's' || event.key === 'S')) {
        event.preventDefault();
        if (isDirty && !isSaving) {
          handleSave();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDirty, isSaving, handleSave]);
}

export default useSettingsKeyboardShortcuts;
