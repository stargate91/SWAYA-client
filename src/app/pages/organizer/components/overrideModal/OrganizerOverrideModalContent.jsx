import Dropdown from '@/ui/Dropdown';
import SelectableCard from '@/ui/SelectableCard';
import Radio from '@/ui/Radio';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import SidePanelLayout from '@/ui/SidePanelLayout';
import OverrideMovieFields from './OverrideMovieFields';
import OverrideEpisodeFields from './OverrideEpisodeFields';
import OverrideExtraFields from './OverrideExtraFields';
import { useOverrideModalState } from '../../hooks';

export default function OrganizerOverrideModalContent({ row, onClose, toast, scanMode, sessionMode }) {
  const {
    t,
    isExtra,
    category,
    mainType,
    setMainType,
    hideLanguage,
    subcategoryList,
    targetLanguage,
    setTargetLanguage,
    source,
    setSource,
    edition,
    setEdition,
    audioType,
    setAudioType,
    seasonNum,
    setSeasonNum,
    episodeNum,
    setEpisodeNum,
    subcategory,
    setSubcategory,
    language,
    setLanguage,
    parentCandidates,
    parentId,
    setParentId,
    matchAction,
    setMatchAction,
    showSelector,
    filteredMainTypeOptions,
    translatedLanguageOptions,
    translatedSourceOptions,
    translatedEditionOptions,
    translatedAudioTypeOptions,
    handleSubmit,
  } = useOverrideModalState({ row, onClose, toast, scanMode, sessionMode });

  const renderFormFields = () => (
    <>
      {/* 1. Main Category Choice */}
      {(!isExtra || category === 'video') && (
        <Dropdown
          label={t('organizer.overrideModal.labels.mainCategory')}
          value={mainType}
          onChange={(e) => setMainType(e.target.value)}
          options={filteredMainTypeOptions}
          hint={t('organizer.overrideModal.hints.mainType')}
        />
      )}

      {/* 2. Extra/Bonus Selection */}
      {(mainType === 'bonus' || (isExtra && mainType !== 'movie' && mainType !== 'episode')) && (
        <OverrideExtraFields
          parentId={parentId}
          setParentId={setParentId}
          subcategory={subcategory}
          setSubcategory={setSubcategory}
          language={language}
          setLanguage={setLanguage}
          parentCandidates={parentCandidates}
          category={category}
          subcategoryList={subcategoryList}
          isExtra={isExtra}
          LANGUAGE_OPTIONS={translatedLanguageOptions}
          t={t}
          isScenesMode={hideLanguage}
          scanMode={scanMode}
        />
      )}

      {/* 3. Movie/Scene settings */}
      {(mainType === 'movie' || mainType === 'scene') && (
        <OverrideMovieFields
          targetLanguage={targetLanguage}
          setTargetLanguage={setTargetLanguage}
          source={source}
          setSource={setSource}
          edition={edition}
          setEdition={setEdition}
          audioType={audioType}
          setAudioType={setAudioType}
          LANGUAGE_OPTIONS={translatedLanguageOptions}
          SOURCE_OPTIONS={translatedSourceOptions}
          EDITION_OPTIONS={translatedEditionOptions}
          AUDIO_TYPE_OPTIONS={translatedAudioTypeOptions}
          t={t}
          hideLanguage={hideLanguage}
        />
      )}

      {/* 4. Episode settings */}
      {mainType === 'episode' && (
        <OverrideEpisodeFields
          targetLanguage={targetLanguage}
          setTargetLanguage={setTargetLanguage}
          audioType={audioType}
          setAudioType={setAudioType}
          seasonNum={seasonNum}
          setSeasonNum={setSeasonNum}
          episodeNum={episodeNum}
          setEpisodeNum={setEpisodeNum}
          LANGUAGE_OPTIONS={translatedLanguageOptions}
          AUDIO_TYPE_OPTIONS={translatedAudioTypeOptions}
          t={t}
          hideLanguage={hideLanguage}
        />
      )}
    </>
  );

  return (
    <form id="organizer-override-form" onSubmit={handleSubmit}>
      {showSelector ? (
        <SidePanelLayout
          side="left"
          panelWidth="20rem"
          panelClassName="has-single-override-side-panel"
          panelContent={
            <Stack gap="lg">
              <Stack gap="2xs">
                <Text variant="small" weight="bold">
                  {t('organizer.overrideModal.matchAction.title') || 'Match Action'}
                </Text>
                <Text variant="small" color="muted">
                  {t('organizer.overrideModal.matchAction.description') || 'Choose what to do with the current tv match since season or episode changed:'}
                </Text>
              </Stack>

              <Stack gap="sm">
                <SelectableCard
                  selected={matchAction === 'keep'}
                  onClick={() => setMatchAction('keep')}
                >
                  <Inline align="start" gap="md" fullWidth>
                    <Radio
                      name="matchAction"
                      checked={matchAction === 'keep'}
                      onChange={() => setMatchAction('keep')}
                    />
                    <Stack gap="2xs">
                      <Text variant="small" weight="semibold">
                        {t('organizer.overrideModal.matchAction.keep') || 'Keep current tv match'}
                      </Text>
                      <Text variant="xsmall" color="muted">
                        {t('organizer.overrideModal.matchAction.keepDesc') || 'Update season/episode under the tv.'}
                      </Text>
                    </Stack>
                  </Inline>
                </SelectableCard>

                <SelectableCard
                  selected={matchAction === 'reset'}
                  onClick={() => setMatchAction('reset')}
                >
                  <Inline align="start" gap="md" fullWidth>
                    <Radio
                      name="matchAction"
                      checked={matchAction === 'reset'}
                      onChange={() => setMatchAction('reset')}
                    />
                    <Stack gap="2xs">
                      <Text variant="small" weight="semibold">
                        {t('organizer.overrideModal.matchAction.reset') || 'Reset match (Pending)'}
                      </Text>
                      <Text variant="xsmall" color="muted">
                        {t('organizer.overrideModal.matchAction.resetDesc') || 'Remove match and return to Review Needed.'}
                      </Text>
                    </Stack>
                  </Inline>
                </SelectableCard>
              </Stack>
            </Stack>
          }
        >
          <Stack gap="lg">
            {renderFormFields()}
          </Stack>
        </SidePanelLayout>
      ) : (
        <Stack gap="lg">
          {renderFormFields()}
        </Stack>
      )}
    </form>
  );
}
