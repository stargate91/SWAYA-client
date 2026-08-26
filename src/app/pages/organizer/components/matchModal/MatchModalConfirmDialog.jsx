import PropTypes from 'prop-types';
import Checkbox from '@/ui/Checkbox';

export default function MatchModalConfirmDialog({ onChange, label }) {
  return (
    <Checkbox onChange={onChange}>
      {label}
    </Checkbox>
  );
}

MatchModalConfirmDialog.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.node.isRequired,
};
