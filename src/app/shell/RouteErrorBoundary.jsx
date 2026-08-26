/* eslint-disable react/jsx-no-literals, i18next/no-literal-string */
import { useRouteError } from 'react-router-dom';
import { isChunkLoadError } from '@/lib/preloadErrorHandler';
import Button from '@/ui/Button';
import { RefreshCw, AlertTriangle, Home } from '@/ui/icons';
import styles from './RouteErrorBoundary.module.css';

export default function RouteErrorBoundary() {
  const error = useRouteError();
  const isChunkError = isChunkLoadError(error);

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const errorMessage = error instanceof Error
    ? error.message
    : (typeof error === 'string' ? error : JSON.stringify(error, null, 2));

  return (
    <div className={styles['route-error']}>
      <div className={styles['route-error__card']}>
        <div
          className={`${styles['route-error__icon']} ${
            isChunkError ? '' : styles['route-error__icon--danger']
          }`}
        >
          {isChunkError ? <RefreshCw size={24} /> : <AlertTriangle size={24} />}
        </div>

        <h1 className={styles['route-error__title']}>
          {isChunkError ? 'New Version Available' : 'Something Went Wrong'}
        </h1>

        <p className={styles['route-error__description']}>
          {isChunkError
            ? 'The application has been updated on the server. Please reload the page to load the latest version.'
            : 'An unexpected application error occurred while loading this view.'}
        </p>

        <div className={styles['route-error__actions']}>
          <Button
            variant="primary"
            size="md"
            leftIcon={RefreshCw}
            onClick={handleReload}
          >
            Reload Page
          </Button>

          <Button
            variant="secondary"
            size="md"
            leftIcon={Home}
            onClick={handleGoHome}
          >
            Go to Home
          </Button>
        </div>

        {errorMessage && (
          <details className={styles['route-error__details']}>
            <summary className={styles['route-error__summary']}>Technical details</summary>
            <pre className={styles['route-error__stack']}>{errorMessage}</pre>
          </details>
        )}
      </div>
    </div>
  );
}
