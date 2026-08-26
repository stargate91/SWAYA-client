import { ChevronLeft } from '@/ui/icons';
import Button from '@/ui/Button';
import UniversalImageGrid from './UniversalImageGrid';
import Inline from '@/ui/Inline';
import Text from '@/ui/Text';

export default function PersonBackdropBrowser({
  selectedCredit,
  selectedBackdropMetadataQuery,
  selectedBackdrops,
  selectedBackdropPath,
  item,
  handleSelectDetailedBackdrop,
  isUploadPending,
  t,
  handleBackToCredits
}) {
  return (
    <>
      <Inline gap="md" align="center">
        <Button variant="secondary-neutral" size="sm" leftIcon={<ChevronLeft size={14} />} animateIcon onClick={handleBackToCredits}>
          {t('common.back') || 'Back'}
        </Button>
        <Text truncate variant="title" as="h4" className="details-panel__section-title">
          {selectedBackdropMetadataQuery.data?.title || selectedCredit?.title}
        </Text>
      </Inline>

      <div>
        <UniversalImageGrid
          customImages={selectedBackdrops}
          imageType="backdrop"
          currentPath={selectedBackdropPath || item?.backdrop_path}
          onSelect={handleSelectDetailedBackdrop}
          isPending={isUploadPending}
          t={t}
        />
      </div>
    </>
  );
}
