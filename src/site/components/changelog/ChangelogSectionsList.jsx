import PropTypes from 'prop-types';
import styles from './ChangelogReleaseCard.module.css';

export default function ChangelogSectionsList({ sections = [] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className={styles['sections-list']}>
      {sections.map((section) => (
        <div key={section.type} className={styles['section-block']}>
          <h3 className={styles['section-title']}>
            <span>{section.title}</span>
          </h3>
          <ul className={styles['items-list']}>
            {section.items.map((item, idx) => (
              <li key={idx} className={styles['change-item']}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

ChangelogSectionsList.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
};
