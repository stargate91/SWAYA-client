import PropTypes from 'prop-types';
import { useVideoTranscript } from '../../hooks/useVideoTranscript';
import styles from './VideoTranscript.module.css';

export default function VideoTranscript({ transcript }) {
  const { data, handleToggle } = useVideoTranscript(transcript);

  if (!data || !data.hasContent) return null;

  const { title, description, items } = data;

  return (
    <div className={styles.transcript}>
      <details className={styles['transcript-details']} onToggle={handleToggle}>
        <summary className={styles['transcript-summary']}>
          {title}
        </summary>
        <div className={styles['transcript-content']}>
          {description && (
            <p className={styles['transcript-desc']}>
              {description}
            </p>
          )}
          {items.length > 0 && (
            <ul className={styles['transcript-list']}>
              {items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </details>
    </div>
  );
}

VideoTranscript.propTypes = {
  transcript: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};


