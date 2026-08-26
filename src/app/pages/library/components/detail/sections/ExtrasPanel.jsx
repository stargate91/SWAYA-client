import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import { useMediaDetailContext } from '../MediaDetailContext';
import FileCard from '@/ui/data/FileCard';
import Tooltip from '@/ui/Tooltip';
import Button from '@/ui/Button';
import { FolderOpen } from '@/ui/icons';
import { useExtrasPanel } from '../../../hooks/useExtrasPanel';

export default function ExtrasPanel() {
  const { state, t, toast } = useMediaDetailContext();
  const { item, isMovie } = state;

  const {
    extraGroups,
    hasExtras,
    getExtraMeta,
    handleBrowseFolder,
    headingTitle,
    browseTooltip,
    noExtrasText,
  } = useExtrasPanel({ item, isMovie, t, toast });

  return (
    <Stack gap="xl">
      <Text as="h4" variant="caption" uppercase color="muted">
        {headingTitle}
      </Text>
      <Stack scrollable gap="md">
        {extraGroups.map((group, groupIndex) => (
          <Stack
            key={group.label || `extras-group-${groupIndex}`}
            gap="md"
          >
            {group.label ? (
              <Text variant="caption" color="muted">
                {group.label}
              </Text>
            ) : null}
            {group.items.map((extra) => {
              const metaText = getExtraMeta(extra);
              const onBrowse = extra.path ? () => handleBrowseFolder(extra.path) : undefined;

              return (
                <FileCard key={extra.id} fullWidth>
                  <Stack gap="xs" flex={1} className="u-min-w-0">
                    <Tooltip content={extra.name} side="top">
                      <Text variant="body" weight="semibold" truncate>
                        {extra.name}
                      </Text>
                    </Tooltip>
                    {extra.path ? (
                      <Tooltip content={extra.path} side="top">
                        <Text variant="small" color="secondary" truncate>
                          {extra.path}
                        </Text>
                      </Tooltip>
                    ) : null}
                    {metaText ? (
                      <Tooltip content={metaText} side="top">
                        <Text variant="caption" color="muted" uppercase truncate>
                          {metaText}
                        </Text>
                      </Tooltip>
                    ) : null}
                  </Stack>
                  {extra.path && onBrowse ? (
                    <Tooltip content={browseTooltip} side="top">
                      <Button
                        variant="secondary-neutral"
                        size="sm"
                        onClick={onBrowse}
                        title={null}
                      >
                        <FolderOpen size={14} />
                      </Button>
                    </Tooltip>
                  ) : null}
                </FileCard>
              );
            })}
          </Stack>
        ))}

        {!hasExtras && (
          <Text variant="small" color="secondary">
            {noExtrasText}
          </Text>
        )}
      </Stack>
    </Stack>
  );
}



