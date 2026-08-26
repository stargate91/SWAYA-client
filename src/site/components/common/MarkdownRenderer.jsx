import styles from './MarkdownRenderer.module.css';
import { useMarkdownDoc } from '../../hooks/useMarkdownDoc';

export default function MarkdownRenderer({ content, onHeadingsExtracted }) {
  const { html } = useMarkdownDoc({ content, onHeadingsExtracted });

  return (
    <div
      className={styles['markdown-root']}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
