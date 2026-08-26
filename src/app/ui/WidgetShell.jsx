import PropTypes from 'prop-types';
import Skeleton from '@/ui/Skeleton';
import ScrollRow from '@/ui/ScrollRow';
import styles from './WidgetShell.module.css';

const WidgetShell = ({ children, loading, size, transparent, aspect }) => {
  const shellClass = `${styles.shell} ${styles[`shell--${size || 'md'}`] || ''} ${transparent ? styles['shell--transparent'] : ''}`.trim();

  return (
    <div className={shellClass}>
      {loading ? (
        <div className={styles['loading-skeleton']}>
          <div className={styles['loading-title']}>
            <Skeleton.Title className={styles['loading-title-skeleton']} />
          </div>
          {size === 'sm' ? (
            <div className={styles['loading-stats-grid']}>
              {Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className={styles['loading-stats-card']} variant="rect" />
              ))}
            </div>
          ) : (
            <ScrollRow showArrows={false}>
              {Array.from({ length: size === 'lg' ? 4 : 3 }).map((_, idx) => (
                <Skeleton.Card
                  key={idx}
                  aspect={aspect}
                  className={`${styles['loading-card']} ${aspect ? styles[`loading-card--aspect-${aspect}`] : ''}`.trim()}
                />
              ))}
            </ScrollRow>
          )}
        </div>
      ) : (
        <div className={styles.content}>{children}</div>
      )}
    </div>
  );
};

WidgetShell.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  transparent: PropTypes.bool,
  aspect: PropTypes.oneOf(['scene', 'poster']),
};

export default WidgetShell;
