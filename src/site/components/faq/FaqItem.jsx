import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';
import styles from './FaqItem.module.css';

export default function FaqItem({ item, isOpen, onToggle }) {
  const { id, question, answer, triggerId, panelId } = item;

  return (
    <div className={`${styles['faq-item']} ${isOpen ? styles['faq-item--open'] : ''}`}>
      <button
        type="button"
        id={triggerId}
        className={styles['faq-trigger']}
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className={styles.question}>{question}</span>
        <ChevronDown size={18} className={styles.chevron} aria-hidden="true" />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={styles['answer-wrapper']}
      >
        <div className={styles['answer-inner']}>
          <p className={styles['answer-text']}>{answer}</p>
        </div>
      </div>
    </div>
  );
}

FaqItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    triggerId: PropTypes.string.isRequired,
    panelId: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

