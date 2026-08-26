import { createContext, useContext } from 'react';

export const LanguageContext = createContext(null);

/**
 * @returns {import('@/types/i18n').LanguageContextValue}
 */
export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
