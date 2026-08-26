import { ArrowUp, ArrowDown, GripVertical } from '@/ui/icons';
import Input from '@/ui/Input';
import IconButton from '@/ui/IconButton';
import Tooltip from '@/ui/Tooltip';
import Inline from '@/ui/Inline';
import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import styles from './OrganizerBulkOverrideModalContent.module.css';

const DOT = '.';

export default function BulkOverrideReorderPanel({
  t,
  startEpisodeNum = '1',
  setStartEpisodeNum,
  orderedItems = [],
  draggedIndex = null,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleMoveUp,
  handleMoveDown,
}) {
  return (
    <Stack gap="md" fullHeight>
      <Inline align="center" justify="between" fullWidth wrap={false}>
        <Text weight="medium">
          {t('organizer.overrideModal.labels.startNumbering')}
        </Text>
        <Input
          type="number"
          min="1"
          value={startEpisodeNum}
          onChange={(e) => setStartEpisodeNum?.(e.target.value)}
          width="6rem"
        />
      </Inline>

      <Text variant="xsmall" color="muted">
        {t('organizer.overrideModal.labels.dragAndDropHint')}
      </Text>

      <Stack gap="sm" flex={1} className={styles['side-panel-list']}>
        {orderedItems.map((item, index) => {
          const epNum =
            index + (parseInt(startEpisodeNum, 10) || 1);
          return (
            <Card
              key={item.id}
              variant="soft"
              padding="xs"
              draggable
              onDragStart={(e) => handleDragStart?.(e, index)}
              onDragOver={(e) => handleDragOver?.(e, index)}
              onDragEnd={handleDragEnd}
              data-dragging={draggedIndex === index ? 'true' : undefined}
            >
              <Inline
                align="center"
                justify="between"
                fullWidth
                wrap={false}
                gap="sm"
              >
                <Inline
                  gap="sm"
                  align="center"
                  flex={1}
                  className="u-min-w-0"
                  wrap={false}
                >
                  <GripVertical size={14} color="var(--color-muted)" />
                  <Text
                    variant="xs"
                    weight="bold"
                    color="accent"
                    className="u-flex-shrink-0"
                  >
                    {epNum}
                    {DOT}
                  </Text>
                  <Tooltip
                    content={item.source}
                    side="top"
                    triggerClassName={styles['source-tooltip']}
                  >
                    <Text variant="xs" truncate>
                      {item.source}
                    </Text>
                  </Tooltip>
                </Inline>
                <Inline gap="2xs" shrink={0}>
                  <IconButton
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => handleMoveUp?.(index)}
                    disabled={index === 0}
                  >
                    <ArrowUp size={14} />
                  </IconButton>
                  <IconButton
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => handleMoveDown?.(index)}
                    disabled={index === orderedItems.length - 1}
                  >
                    <ArrowDown size={14} />
                  </IconButton>
                </Inline>
              </Inline>
            </Card>
          );
        })}
      </Stack>
    </Stack>
  );
}
