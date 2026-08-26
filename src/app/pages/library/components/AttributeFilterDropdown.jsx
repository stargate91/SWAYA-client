import Dropdown from '@/ui/Dropdown';
import { useTranslation } from '@/providers/LanguageContext';
import { formatPhysicalAttributeLabel } from '@/lib/formatters';

export default function AttributeFilterDropdown({
  label,
  value,
  onChange,
  items = [],
  allLabel,
  setCurrentPage,
  ...props
}) {
  const { t } = useTranslation();
  const isDisabled = (!items || items.length === 0) && !value;

  const options = [
    { value: '', label: allLabel },
    ...(items || []).map(item => ({
      value: typeof item === 'object' ? item.value : item,
      label: typeof item === 'object' ? item.label : formatPhysicalAttributeLabel(item, t)
    }))
  ];

  return (
    <Dropdown
      layout="inline"
      label={label}
      value={value}
      onFilterChange={onChange}
      setCurrentPage={setCurrentPage}
      options={options}
      disabled={isDisabled}
      {...props}
    />
  );
}
