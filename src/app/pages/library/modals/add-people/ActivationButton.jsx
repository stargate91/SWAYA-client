import PropTypes from 'prop-types';
import IconButton from '@/ui/IconButton';
import { Check, Minus, Plus } from '@/ui/icons';
import { useHover } from '@/hooks/useHover';

export default function ActivationButton({ isActive, onClick, disabled }) {
  const { isHovered, hoverProps } = useHover();

  if (isActive) {
    return (
      <IconButton
        variant={isHovered ? 'danger' : 'success'}
        size="sm"
        onClick={() => onClick(false)}
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
      onClick={() => onClick(true)}
      disabled={disabled}
    >
      <Plus size={16} />
    </IconButton>
  );
}

ActivationButton.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
