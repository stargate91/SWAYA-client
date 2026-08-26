import { Component } from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Button from '@/ui/Button';
import { trackError } from '../../lib/analytics';
import styles from './SiteErrorBoundary.module.css';

/**
 * Site-wide Error Boundary ensuring that runtime render failures
 * show a friendly recovery UI instead of an empty blank screen.
 */
export class SiteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    trackError(error, errorInfo);
    if (typeof console !== 'undefined' && console.error) {
      console.error('[SiteErrorBoundary] Caught rendering error:', error, errorInfo);
    }
  }

  handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const t = this.props.t || ((k, opts) => opts?.defaultValue || k);

      return (
        <div className={styles.container} role="alert">
          <div className={styles.card}>
            <div className={styles['icon-wrapper']}>
              <AlertTriangle size={24} aria-hidden="true" />
            </div>

            <h2 className={styles.title}>
              {t('docs.ui.errorBoundaryTitle', {
                defaultValue: 'Something Went Wrong',
              })}
            </h2>

            <p className={styles.description}>
              {t('docs.ui.errorBoundaryDesc', {
                defaultValue:
                  'An unexpected error occurred while rendering this page. You can try refreshing or returning to the homepage.',
              })}
            </p>

            <div className={styles.actions}>
              <Button
                variant="secondary"
                size="md"
                onClick={this.handleReload}
                leftIcon={<RotateCcw size={16} aria-hidden="true" />}
              >
                {t('docs.ui.reloadPage', {
                  defaultValue: 'Reload Page',
                })}
              </Button>

              <Button
                as="a"
                href="/"
                variant="primary"
                size="md"
                leftIcon={<Home size={16} aria-hidden="true" />}
              >
                {t('docs.ui.returnHome', {
                  defaultValue: 'Return to Home',
                })}
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

SiteErrorBoundary.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.node,
  t: PropTypes.func,
};

export default SiteErrorBoundary;

