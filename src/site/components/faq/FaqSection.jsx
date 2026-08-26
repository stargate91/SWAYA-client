import PropTypes from 'prop-types';
import FaqHeader from './FaqHeader';
import FaqItem from './FaqItem';
import { useFaqAccordion } from '../../hooks/useFaqAccordion';
import styles from './FaqSection.module.css';

export default function FaqSection({
  tag,
  title,
  titleAccent,
  subtitle,
  items,
  id = 'faq',
}) {
  const {
    openId,
    toggleItem,
    formattedItems,
    displayTag,
    displayTitle,
    displayTitleAccent,
    displaySubtitle,
  } = useFaqAccordion({ items, tag, title, titleAccent, subtitle, id });

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.container}>
        <FaqHeader
          tag={displayTag}
          title={displayTitle}
          titleAccent={displayTitleAccent}
          subtitle={displaySubtitle}
          sectionId={id}
        />


        <div className={styles['faq-list']}>
          {formattedItems.map((item) => (
            <FaqItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={toggleItem}
            />
          ))}

        </div>
      </div>
    </section>
  );
}

FaqSection.propTypes = {
  tag: PropTypes.string,
  title: PropTypes.string,
  titleAccent: PropTypes.string,
  subtitle: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      question: PropTypes.string,
      q: PropTypes.string,
      questionKey: PropTypes.string,
      defaultQuestion: PropTypes.string,
      answer: PropTypes.string,
      a: PropTypes.string,
      answerKey: PropTypes.string,
      defaultAnswer: PropTypes.string,
    })
  ),
  id: PropTypes.string,
};
