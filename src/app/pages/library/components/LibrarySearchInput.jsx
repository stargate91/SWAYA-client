import React from 'react';
import PropTypes from 'prop-types';
import Input from '@/ui/Input';
import { Search } from '@/ui/icons';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';

export const LibrarySearchInput = React.memo(function LibrarySearchInput({
  placeholder,
  onSearchChange,
  initialValue = '',
}) {
  const { value, setValue } = useDebouncedSearch({
    initialValue,
    onSearchChange,
    delay: 300,
  });

  return (
    <Input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      leftElement={<Search size={14} />}
      size="sm"
      expandOnFocus
    />
  );
});

LibrarySearchInput.displayName = 'LibrarySearchInput';

LibrarySearchInput.propTypes = {
  placeholder: PropTypes.string,
  onSearchChange: PropTypes.func,
  initialValue: PropTypes.string,
};

export default LibrarySearchInput;

