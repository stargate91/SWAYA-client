import PropTypes from 'prop-types';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Text from '@/ui/Text';
import Badge from '@/ui/Badge';
import { useStructureTreeRenderer } from '../hooks/useStructureTreeRenderer';
import StructureTreeNode, { PreviewArrow } from './StructureTreeNode';
import styles from './StructurePreview.module.css';

export default function StructurePreviewPanel({ form, t, filterType }) {
  const {
    isTreeMode,
    rootTitle,
    treeNodes,
    previewItems,
    icons,
    arrow,
    resolveToneColor,
  } = useStructureTreeRenderer({ form, t, filterType });

  return (
    <div className={styles['preview-container']}>
      <Stack gap="sm">
        <Text variant="small" weight="bold" color="accent">
          {rootTitle}
        </Text>
        <Stack indent="lg" gap="xs">
          {isTreeMode ? (
            treeNodes.map((node, index) => (
              <div key={`${node.label}-${index}`}>
                <StructureTreeNode
                  node={node}
                  icons={icons}
                  resolveToneColor={resolveToneColor}
                />
              </div>
            ))
          ) : (
            <Stack gap="xs">
              {previewItems.map((item, index) => (
                <Inline
                  key={`${item.before}-${index}`}
                  align="center"
                  wrap={false}
                  gap="none"
                >
                  <Text
                    variant="caption"
                    color="muted"
                    mono
                    strikethrough={!item.noStrikeBefore}
                  >
                    {icons.file} {item.before}
                  </Text>
                  <PreviewArrow arrow={arrow} />
                  <Text
                    variant="caption"
                    color={resolveToneColor(item.afterTone)}
                    mono
                    strikethrough={item.strike}
                  >
                    {icons.file} {item.after}
                  </Text>
                  {item.registered && (
                    <Badge tone="accent" size="xs">
                      {t('settingsPage.sections.organization.previewRegisteredBadge', { defaultValue: 'In Library' })}
                    </Badge>
                  )}
                </Inline>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </div>
  );
}

StructurePreviewPanel.propTypes = {
  form: PropTypes.object,
  t: PropTypes.func.isRequired,
  filterType: PropTypes.string,
};
