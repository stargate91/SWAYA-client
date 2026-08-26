import PropTypes from 'prop-types';
import DocsBreadcrumb from './DocsBreadcrumb';
import DocsArticleMeta from './DocsArticleMeta';
import { useDocsArticleHeader } from '../../hooks/useDocsArticleHeader';
import styles from './DocsArticleHeader.module.css';


export default function DocsArticleHeader({
  activeDoc,
  activeCategory,
  readingTimeMinutes,
  homeUrl,
  docsUrl,
  t,
  locale,
}) {
  const {
    title,
    description,
    activeCategory: category,
    readingTimeMinutes: minutes,
    homeUrl: home,
    docsUrl: docs,
    t: translate,
  } = useDocsArticleHeader({
    activeDoc,
    activeCategory,
    readingTimeMinutes,
    homeUrl,
    docsUrl,
    t,
    locale,
  });

  return (
    <header className={styles.header}>
      <DocsBreadcrumb
        homeUrl={home}
        docsUrl={docs}
        category={category}
        t={translate}
      />

      <h1 className={styles.title}>{title}</h1>

      <DocsArticleMeta
        activeCategory={category}
        readingTimeMinutes={minutes}
        t={translate}
      />

      {description && (
        <p className={styles.description}>
          {description}
        </p>
      )}
    </header>
  );
}

DocsArticleHeader.propTypes = {
  activeDoc: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
  activeCategory: PropTypes.string,
  readingTimeMinutes: PropTypes.number.isRequired,
  homeUrl: PropTypes.string.isRequired,
  docsUrl: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  locale: PropTypes.string,
};

