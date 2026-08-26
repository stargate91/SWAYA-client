import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './DocsHubCard.module.css';


export default function DocsHubCard({ item }) {
  return (
    <Link
      to={item.path}
      className={styles['hub-card']}
    >
      <div className={styles['hub-card-header']}>
        <h3 className={styles['hub-card-title']}>
          {item.title}
        </h3>
        <ArrowRight size={14} className={styles['hub-card-arrow']} aria-hidden="true" />
      </div>
      <p className={styles['hub-card-desc']}>{item.description}</p>
    </Link>
  );
}

DocsHubCard.propTypes = {
  item: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

