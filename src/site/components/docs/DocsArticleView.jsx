import PropTypes from 'prop-types';
import MarkdownRenderer from '../common/MarkdownRenderer';
import DocsArticleHeader from './DocsArticleHeader';
import DocsToc from './DocsToc';
import DocsPagination from './DocsPagination';
import DocsRelatedGuides from './DocsRelatedGuides';
import styles from './DocsArticleView.module.css';

export default function DocsArticleView({
  activeDoc,
  activeCategory,
  readingTimeMinutes,
  headings,
  setHeadings,
  relatedDocs,
  prevDoc,
  nextDoc,
  homeUrl,
  docsUrl,
  t,
}) {
  return (
    <>
      <article className={styles['content-column']}>
        <DocsArticleHeader
          activeDoc={activeDoc}
          activeCategory={activeCategory}
          readingTimeMinutes={readingTimeMinutes}
          homeUrl={homeUrl}
          docsUrl={docsUrl}
          t={t}
        />

        <div className={styles['article-body']}>
          <MarkdownRenderer
            content={activeDoc.content}
            onHeadingsExtracted={setHeadings}
          />
        </div>

        {/* Related Guides Cross-linking */}
        <DocsRelatedGuides
          relatedDocs={relatedDocs}
          t={t}
        />

        {/* Previous & Next Navigation */}
        <DocsPagination
          prevDoc={prevDoc}
          nextDoc={nextDoc}
          t={t}
        />
      </article>

      <DocsToc headings={headings} />
    </>
  );
}

DocsArticleView.propTypes = {
  activeDoc: PropTypes.object.isRequired,
  activeCategory: PropTypes.string,
  readingTimeMinutes: PropTypes.number.isRequired,
  headings: PropTypes.array,
  setHeadings: PropTypes.func,
  relatedDocs: PropTypes.array,
  prevDoc: PropTypes.object,
  nextDoc: PropTypes.object,
  homeUrl: PropTypes.string.isRequired,
  docsUrl: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

