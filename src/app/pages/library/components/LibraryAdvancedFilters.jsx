import AttributeFilterDropdown from './AttributeFilterDropdown';
import PanelHeader from '@/ui/PanelHeader';
import Inline from '@/ui/Inline';
import { useLibraryAdvancedFilters } from '../hooks/useLibraryAdvancedFilters';

export default function LibraryAdvancedFilters({
  t,
  breastTypeFilter,
  setBreastTypeFilter,
  breastSizeFilter,
  setBreastSizeFilter,
  buttShapeFilter,
  setButtShapeFilter,
  buttSizeFilter,
  setButtSizeFilter,
  tattoosFilter,
  setTattoosFilter,
  piercingsFilter,
  setPiercingsFilter,
  eyeColorFilter,
  setEyeColorFilter,
  filterData,
  setCurrentPage,
  settings,
}) {
  const {
    isAdultAllowed,
    breastSizeItems,
    buttShapeItems,
    buttSizeItems,
    tattooItems,
    piercingItems,
  } = useLibraryAdvancedFilters({ filterData, settings, t });

  return (
    <PanelHeader.Row variant="advanced-filters">
      <Inline gap="2xl" align="center" flex={1}>
        {isAdultAllowed && (
          <AttributeFilterDropdown
            label={t('library.filter.breastTypeLabel') || 'Breast Type:'}
            value={breastTypeFilter}
            onChange={setBreastTypeFilter}
            items={filterData?.breast_types}
            allLabel={t('library.filter.allBreastTypes') || 'All'}
            setCurrentPage={setCurrentPage}
          />
        )}
        {isAdultAllowed && (
          <AttributeFilterDropdown
            label={t('library.filter.breastSizeLabel') || 'Breast Size:'}
            value={breastSizeFilter}
            onChange={setBreastSizeFilter}
            items={breastSizeItems}
            allLabel={t('library.filter.allBreastSizes') || 'All'}
            setCurrentPage={setCurrentPage}
          />
        )}

        {isAdultAllowed && (
          <AttributeFilterDropdown
            label={t('library.filter.buttShapeLabel') || 'Butt Shape:'}
            value={buttShapeFilter}
            onChange={setButtShapeFilter}
            items={buttShapeItems}
            allLabel={t('library.filter.allButtShapes') || 'All'}
            setCurrentPage={setCurrentPage}
          />
        )}

        {isAdultAllowed && (
          <AttributeFilterDropdown
            label={t('library.filter.buttSizeLabel') || 'Butt Size:'}
            value={buttSizeFilter}
            onChange={setButtSizeFilter}
            items={buttSizeItems}
            allLabel={t('library.filter.allButtSizes') || 'All'}
            setCurrentPage={setCurrentPage}
          />
        )}

        <AttributeFilterDropdown
          label={t('library.filter.tattoosLabel') || 'Tattoos:'}
          value={tattoosFilter}
          onChange={setTattoosFilter}
          items={tattooItems}
          allLabel={t('library.filter.allTattoos') || 'All Options'}
          setCurrentPage={setCurrentPage}
        />

        <AttributeFilterDropdown
          label={t('library.filter.piercingsLabel') || 'Piercings:'}
          value={piercingsFilter}
          onChange={setPiercingsFilter}
          items={piercingItems}
          allLabel={t('library.filter.allPiercings') || 'All Options'}
          setCurrentPage={setCurrentPage}
        />

        <AttributeFilterDropdown
          label={t('library.filter.eyeColorLabel') || 'Eye Color:'}
          value={eyeColorFilter}
          onChange={setEyeColorFilter}
          items={filterData?.eye_colors}
          allLabel={t('library.filter.allEyeColors') || 'All'}
          setCurrentPage={setCurrentPage}
        />
      </Inline>
    </PanelHeader.Row>
  );
}


