import { Search } from '@/ui/icons';
import Input from '@/ui/Input';
import IconButton from '@/ui/IconButton';

export default function SearchInput({ localQuery, setLocalQuery, handleSearchSubmit, disabled = false, t }) {
  return (
    <form onSubmit={handleSearchSubmit}>
      <Input
        type="text"
        className="search-page-input"
        placeholder={disabled ? (t('search.noProvidersConfigured') || 'Configure API keys in Settings to search...') : t('search.inputPlaceholder', { defaultValue: 'Type query and press Enter...' })}
        value={localQuery}
        disabled={disabled}
        onChange={(e) => setLocalQuery(e.target.value)}
        leftElement={
          <IconButton type="submit" variant="ghost" size="xs" label="Search" disabled={disabled}>
            <Search size={18} />
          </IconButton>
        }
      />
    </form>
  );
}
