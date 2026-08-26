import PropTypes from 'prop-types';
import { Plus, Minus, Check } from '@/ui/icons';
import IconButton from '@/ui/IconButton';
import { useHover } from '@/hooks/useHover';

export default function ResultAddButton({ added, onAdd, onRemove, disabled }) {
  const { isHovered, hoverProps } = useHover();

  if (added) {
    return (
      <IconButton
        variant={isHovered ? 'danger' : 'success'}
        size="sm"
        onClick={onRemove}
        disabled={disabled}
        {...hoverProps}
      >
        {isHovered ? <Minus size={16} /> : <Check size={16} />}
      </IconButton>
    );
  }

  return (
    <IconButton
      variant="secondary"
      size="sm"
      onClick={onAdd}
      disabled={disabled}
    >
      <Plus size={16} />
    </IconButton>
  );
}

ResultAddButton.propTypes = {
  added: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
