import { memo } from 'react';
import Card from '@/ui/Card';
import { useMediaDetailContext } from '../MediaDetailContext';
import BespokeTagManager from './BespokeTagManager';
import { useBespokeTagger } from '@/pages/library/hooks/useBespokeTagger';
import styles from './BespokeTagger.module.css';

function BespokeTagger() {
  const { state, mutations, type, t } = useMediaDetailContext();
  const { customTags, suggestedTags, isAdult, handleUpdateTags } = useBespokeTagger({
    state,
    mutations,
    type,
  });

  return (
    <Card
      variant="glass-shaded"
      headerVariant="shaded"
      padding="md"
      title={t('library.details.tagger') || 'Tags & Keywords'}
      className={styles.tagger}
    >
      <BespokeTagManager
        customTags={customTags}
        suggestedTags={suggestedTags}
        isAdult={isAdult}
        onUpdateTags={handleUpdateTags}
        t={t}
      />
    </Card>
  );
}

export default memo(BespokeTagger);
