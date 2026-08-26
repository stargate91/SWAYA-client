import PropTypes from 'prop-types';
import { HelpCircle } from 'lucide-react';
import Badge from '@/ui/Badge';
import { Breadcrumb } from '../common';
import { useHelpHeader } from '../../hooks/useHelpHeader';
import styles from './HelpHeader.module.css';

export default function HelpHeader({ homeUrl, t }) {
  const { breadcrumbItems, badgeText, titleText, descriptionText } = useHelpHeader({
    homeUrl,
    t,
  });

  return (
    <header className={styles.header}>
      <Breadcrumb items={breadcrumbItems} />

      <div className={styles['badge-row']}>
        <Badge tone="accent" size="sm" leftIcon={<HelpCircle size={12} aria-hidden="true" />}>
          {badgeText}
        </Badge>
      </div>

      <h1 className={styles.title}>{titleText}</h1>

      <p className={styles.description}>{descriptionText}</p>
    </header>
  );
}

HelpHeader.propTypes = {
  homeUrl: PropTypes.string.isRequired,
  t: PropTypes.func,
};

