/**
 * A Description List component to render key-value grids or lists cleanly.
 *
 * @param {Object} props
 * @param {Array<Object>} props.items - The list of objects containing { label, value, fullWidth, className }.
 * @param {string} [props.className='ui-description-list'] - Wrapper container class name.
 * @param {string} [props.itemClassName='ui-description-list__item'] - Individual key-value container class name.
 * @param {string} [props.labelClassName='ui-description-list__label'] - Label element class name.
 * @param {string} [props.valueClassName='ui-description-list__value'] - Value element class name.
 * @param {string} [props.fullWidthClassName='ui-description-list__item--full'] - Class name appended when item is full-width.
 * @returns {React.ReactElement|null}
 */
import PropTypes from 'prop-types';
import { Copy, Check } from '@/ui/icons';
import { useDescriptionListCopy } from './useDescriptionListCopy';
import IconButton from './IconButton';
import styles from './DescriptionList.module.css';
import Text from './Text';

export default function DescriptionList({
  items,
  variant = 'default',
  copyable = false,
  gap,
  spaced = false,
  className = '',
}) {
  const { activeItems, getItemMeta } = useDescriptionListCopy({
    items,
    copyable,
    resetDelay: 1500,
  });

  if (activeItems.length === 0) return null;

  const containerClassName = [
    styles.list,
    variant !== 'default' && styles[`list--${variant}`],
    spaced && styles['list--spaced'],
    gap && styles[`gap-${gap}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassName}>
      {activeItems.map((item, idx) => {
        const { isSpan2, isItemCopyable, isCopied, copyTitle, handleCopy } = getItemMeta(item, idx);

        const itemClassName = [
          styles.item,
          variant !== 'default' && styles[`item--${variant}`],
          isSpan2 && styles['item--full'],
          item.className,
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div key={idx} className={itemClassName}>
            <div className={styles['text-container']}>
              <span className={styles.label}>{item.label}</span>
              <Text
                as="span"
                className={styles.value}
                truncate={!isSpan2}
                clamp={isSpan2 ? 3 : undefined}
              >
                {item.value}
              </Text>
            </div>
            {isItemCopyable && (
              <IconButton
                size="sm"
                variant={isCopied ? 'success' : 'secondary-neutral'}
                className={styles['copy-btn']}
                title={copyTitle}
                onClick={handleCopy}
              >
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
              </IconButton>
            )}
          </div>
        );
      })}
    </div>
  );
}

DescriptionList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.node,
      fullWidth: PropTypes.bool,
      span: PropTypes.number,
      noCopy: PropTypes.bool,
      copyable: PropTypes.bool,
      className: PropTypes.string,
    })
  ).isRequired,
  variant: PropTypes.oneOf(['default', 'card', 'surface']),
  copyable: PropTypes.bool,
  gap: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  spaced: PropTypes.bool,
  className: PropTypes.string,
};

export { DescriptionList };
