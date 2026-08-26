import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import RootApp from './app/RootApp.jsx';
import ErrorBoundary from '@/shell/ErrorBoundary';
import { setupMockApi } from '@/lib/mockApi';
import { setupFetchInterceptor } from '@/lib/fetchInterceptor';
import { installSafePerformanceMeasure } from '@/lib/perfMeasure';
import { initRendererLogger } from '@/lib/rendererLogger';

setupMockApi();
setupFetchInterceptor();
installSafePerformanceMeasure();
initRendererLogger();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <RootApp />
    </ErrorBoundary>
  </StrictMode>,
);

