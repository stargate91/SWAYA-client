import Dropdown from '@/ui/Dropdown';
import AttributeFilterDropdown from '../AttributeFilterDropdown';

export default function PeopleFilterControls({
  state,
  layout,
}) {
  const {
    t,
    isPeople,
    peopleRoleFilter,
    setPeopleRoleFilter,
    genderFilter,
    setGenderFilter,
    ethnicityFilter,
    setEthnicityFilter,
    hairColorFilter,
    setHairColorFilter,
    filterData,
    setCurrentPage,
  } = state;

  const {
    roleOptions,
    shouldShowGenderFilter,
    genderOptions,
  } = layout;

  if (!isPeople) return null;

  return (
    <>
      <Dropdown
        layout="inline"
        label={t('library.filter.roleLabel') || 'Role:'}
        value={peopleRoleFilter}
        onChange={(e) => {
          setPeopleRoleFilter(e.target.value);
          setCurrentPage(1);
        }}
        options={roleOptions}
      />

      {shouldShowGenderFilter && (
        <Dropdown
          layout="inline"
          label={t('library.filter.genderLabel') || 'Gender:'}
          value={genderFilter}
          onChange={(e) => {
            setGenderFilter(e.target.value);
            setCurrentPage(1);
          }}
          options={genderOptions}
        />
      )}

      <AttributeFilterDropdown
        label={t('library.filter.ethnicityLabel') || 'Ethnicity:'}
        value={ethnicityFilter}
        onChange={setEthnicityFilter}
        items={filterData?.ethnicities}
        allLabel={t('library.filter.allEthnicities') || 'All Ethnicities'}
        setCurrentPage={setCurrentPage}
      />

      <AttributeFilterDropdown
        label={t('library.filter.hairColorLabel') || 'Hair Color:'}
        value={hairColorFilter}
        onChange={setHairColorFilter}
        items={filterData?.hair_colors}
        allLabel={t('library.filter.allHairColors') || 'All'}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
