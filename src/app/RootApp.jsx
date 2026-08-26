import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { queryClient } from './queryClient';
import { router } from './router';
import { UiProvider } from '@/providers/UiProvider';
import { LanguageProvider } from '@/providers/LanguageProvider';
import { useQueryCacheIpcSync } from './hooks/useQueryCacheIpcSync';

export default function RootApp() {
  useQueryCacheIpcSync(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <UiProvider>
          <RouterProvider router={router} />
        </UiProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
