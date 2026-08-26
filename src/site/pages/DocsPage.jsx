import { useParams } from 'react-router-dom';
import {
  DocsSidebar,
  DocsHubView,
  DocsArticleView,
} from '../components/docs';
import NotFoundPage from './NotFoundPage';
import styles from './DocsPage.module.css';
import { useDocsPage } from '../hooks/useDocsPage';

export default function DocsPage() {
  const { slug } = useParams();
  const pageData = useDocsPage(slug);

  if (!pageData.isHub && !pageData.activeDoc) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles['page-container']}>
      <DocsSidebar activeSlug={pageData.activeDoc?.slug} />

      {pageData.isHub ? (
        <DocsHubView {...pageData} />
      ) : (
        <DocsArticleView {...pageData} />
      )}
    </div>
  );
}
