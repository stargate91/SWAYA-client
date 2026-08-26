import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './HelpQuickDocCard.module.css';


export default function HelpQuickDocCard({ guide }) {
  const Icon = guide.icon;

  return (
    <Link to={guide.path} className={styles.card}>
      <div className={styles.icon}>
        {Icon && <Icon size={18} aria-hidden="true" />}
      </div>
      <div className={styles.text}>
        <span className={styles['card-title']}>{guide.title}</span>
      </div>
      <ChevronRight size={14} className={styles.arrow} aria-hidden="true" />
    </Link>
  );
}

HelpQuickDocCard.propTypes = {
  guide: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
  }).isRequired,
};
