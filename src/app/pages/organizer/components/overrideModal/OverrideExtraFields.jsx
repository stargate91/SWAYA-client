import Dropdown from '@/ui/Dropdown';
import { useParentFieldLabels } from '../../hooks/useParentFieldLabels';

export default function OverrideExtraFields({
  parentId,
  setParentId,
  subcategory,
  setSubcategory,
  language,
  setLanguage,
  parentCandidates,
  category,
  subcategoryList,
  isExtra,
  LANGUAGE_OPTIONS,
  t,
  scanMode,
}) {
  const { label, hint } = useParentFieldLabels({ scanMode, t });

  return (
    <>
      <Dropdown
        label={label}
        value={parentId}
        onChange={(e) => setParentId(e.target.value)}
        options={parentCandidates}
        hint={hint}
        searchable={true}
      />

      {category !== 'metadata' && (
        <Dropdown
          label={t('organizer.overrideModal.labels.extraSubcategory')}
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          options={subcategoryList}
          hint={t('organizer.overrideModal.hints.subcategory')}
        />
      )}

      {isExtra && (category === 'subtitle' || category === 'audio') && (
        <Dropdown
          label={t('organizer.overrideModal.labels.language')}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          options={LANGUAGE_OPTIONS}
          hint={t('organizer.overrideModal.hints.language')}
        />
      )}
    </>
  );
}
