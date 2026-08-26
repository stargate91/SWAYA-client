import Drawer from '@/ui/Drawer';
import ParsedParagraphs from '@/ui/ParsedParagraphs';
import DescriptionList from '@/ui/DescriptionList';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import SectionHeader from '@/ui/SectionHeader';
import { useEntityDetailSpecs } from '../../hooks/useEntityDetailSpecs';

export default function EntityDetailDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  item,
  overviewTitle,
  drawerAliases = [],
  overviewText,
  t,
  settings,
}) {
  const {
    hasAnySpecs,
    specItems,
    drawerTitle,
    sectionTitle,
  } = useEntityDetailSpecs({
    item,
    overviewTitle,
    t,
    settings,
  });

  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      title={drawerTitle}
      size="md"
      padded
    >
      <Stack gap="xl" padding="md" scrollable>
        {/* Section 1: Alternate Names */}
        {drawerAliases.length > 0 && (
          <Stack gap="md">
            <SectionHeader
              title={t('library.details.alsoKnownAs') || 'Also known as'}
              as="h4"
            />
            <Text variant="small" color="secondary" className="u-leading-normal">
              {drawerAliases.join(', ')}
            </Text>
          </Stack>
        )}

        {/* Section 2: Physical Specs */}
        {hasAnySpecs && (
          <Stack gap="md">
            <SectionHeader
              title={t('library.details.specsTitle') || 'Physical Specs'}
              as="h4"
            />
            <DescriptionList items={specItems} spaced />
          </Stack>
        )}

        {/* Section 3: Biography / Overview */}
        {overviewText && (
          <Stack gap="md">
            <SectionHeader
              title={sectionTitle}
              as="h4"
            />
            <ParsedParagraphs
              text={overviewText}
              paragraphClassName="u-mb-md u-leading-relaxed"
            />
          </Stack>
        )}
      </Stack>
    </Drawer>
  );
}
