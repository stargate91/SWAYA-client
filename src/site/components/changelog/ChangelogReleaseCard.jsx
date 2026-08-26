import PropTypes from 'prop-types';
import { useChangelogCard } from '../../hooks/useChangelogCard';
import ChangelogHeader from './ChangelogHeader';
import ChangelogHighlights from './ChangelogHighlights';
import ChangelogSectionsList from './ChangelogSectionsList';
import styles from './ChangelogReleaseCard.module.css';

export default function ChangelogReleaseCard({ release, t }) {
  const {
    version,
    isLatest,
    date,
    title,
    description,
    highlights,
    sections,
    latestBadgeLabel,
    highlightsTitle,
  } = useChangelogCard(release, t);

  return (
    <article className={styles['release-card']}>
      <ChangelogHeader
        version={version}
        isLatest={isLatest}
        latestBadgeLabel={latestBadgeLabel}
        date={date}
        title={title}
        description={description}
      />

      <ChangelogHighlights
        highlights={highlights}
        title={highlightsTitle}
      />

      <ChangelogSectionsList sections={sections} />
    </article>
  );
}

ChangelogReleaseCard.propTypes = {
  release: PropTypes.shape({
    version: PropTypes.string.isRequired,
    isLatest: PropTypes.bool,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    highlights: PropTypes.arrayOf(PropTypes.string),
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ).isRequired,
  }).isRequired,
  t: PropTypes.func,
};
