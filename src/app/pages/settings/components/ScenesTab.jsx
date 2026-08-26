import Card from '@/ui/Card';
import Dropdown from '@/ui/Dropdown';
import Input from '@/ui/Input';
import Stack from '@/ui/Stack';
import Switch from '@/ui/Switch';
import Hint from '@/ui/Hint';
import { FOLDER_SCENE_TAGS, SCENE_TAGS } from '../config';
import { useSceneTemplatePreview } from '../hooks';
import { useSettingsFormContext, useSettingsViewContext } from '../SettingsFormContext.jsx';
import TemplateFieldSection from './TemplateFieldSection.jsx';
import SettingsLiveImpact from './SettingsLiveImpact.jsx';

export default function ScenesTab({
  form: propForm,
  t: propT,
  handleChange: propHandleChange,
  handleCheckboxChange: propHandleCheckboxChange,
  insertTag: propInsertTag,
  formInputs: propFormInputs,
} = {}) {
  const { form: ctxForm, actions, formInputs: ctxFormInputs } = useSettingsFormContext();
  const {
    t: ctxT,
    realBackgroundActive,
    sceneDateFormatOptions,
    sceneTagSeparatorOptions,
    sceneGroupingOptions,
    scenePerformerSortOptions,
    scenePerformerGenderOptions,
  } = useSettingsViewContext();

  const form = propForm || ctxForm;
  const t = propT || ctxT;
  const handleChange = propHandleChange || actions.handleChange;
  const handleCheckboxChange = propHandleCheckboxChange || actions.handleCheckboxChange;
  const insertTag = propInsertTag || actions.insertTag;
  const formInputs = propFormInputs || ctxFormInputs;
  const isScanActive = Boolean(realBackgroundActive);

  const { scenePreview, folderPreview } = useSceneTemplatePreview(form);

  return (
    <Stack gap="xl">
      <Card title={t('settingsPage.sections.scenes.namingTitle')} eyebrow={t('settingsPage.sections.scenes.eyebrow')}>
        <Stack gap="lg">
          <TemplateFieldSection
            t={t}
            inputRef={formInputs.namingScene}
            label={t('settingsPage.sections.scenes.filenameTemplate')}
            hint={t('settingsPage.sections.scenes.filenameTemplateHint')}
            value={form.naming_scene_template}
            disabled={isScanActive}
            onChange={handleChange('naming_scene_template')}
            placeholder="{studio} {performers} {date} {title} [{resolution}]"
            tags={SCENE_TAGS}
            fieldKey="naming_scene_template"
            insertTag={insertTag}
            previewText={scenePreview}
          />
          <Dropdown
            label={t('settingsPage.sections.scenes.dateFormat')}
            hint={t('settingsPage.sections.scenes.dateFormatHint')}
            value={form.naming_scene_date_format}
            options={sceneDateFormatOptions}
            disabled={isScanActive}
            onChange={handleChange('naming_scene_date_format')}
          />
          <Stack gap="2xs">
            <Switch
              id="naming_scene_prevent_title_performer"
              checked={form.naming_scene_prevent_title_performer}
              disabled={isScanActive}
              onChange={handleCheckboxChange('naming_scene_prevent_title_performer')}
            >
              {t('settingsPage.sections.scenes.preventTitlePerformer')}
            </Switch>
            <Hint>
              {t('settingsPage.sections.scenes.preventTitlePerformerHint')}
            </Hint>
          </Stack>
        </Stack>
      </Card>

      <Card title={t('settingsPage.sections.scenes.groupingTitle')} eyebrow={t('settingsPage.sections.scenes.eyebrow')}>
        <Stack gap="lg">
          <Dropdown
            label={t('settingsPage.sections.scenes.groupingMode')}
            hint={t('settingsPage.sections.scenes.groupingModeHint')}
            value={form.scene_grouping_mode}
            options={sceneGroupingOptions}
            disabled={isScanActive}
            onChange={handleChange('scene_grouping_mode')}
          />
          <Stack gap="md">
            <Stack gap="2xs">
              <Switch
                id="folder_create_scene_subdir"
                checked={form.folder_create_scene_subdir}
                disabled={isScanActive}
                onChange={handleCheckboxChange('folder_create_scene_subdir')}
              >
                {t('settingsPage.sections.scenes.createSceneSubdir') || 'Create separate folder for each scene'}
              </Switch>
              <Hint>
                {t('settingsPage.sections.scenes.createSceneSubdirHint') || 'Organize each scene into its own directory.'}
              </Hint>
            </Stack>

            {form.folder_create_scene_subdir && (
              <Stack indent="2xl">
                <TemplateFieldSection
                  t={t}
                  inputRef={formInputs.folderScene}
                  label={t('settingsPage.sections.scenes.folderTemplate')}
                  value={form.folder_scene_template}
                  disabled={isScanActive}
                  onChange={handleChange('folder_scene_template')}
                  placeholder="{year} - {title}"
                  tags={FOLDER_SCENE_TAGS}
                  fieldKey="folder_scene_template"
                  insertTag={insertTag}
                  previewText={folderPreview}
                />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Card>

      <Card title={t('settingsPage.sections.scenes.tagsTitle')} eyebrow={t('settingsPage.sections.scenes.eyebrow')}>
        <Stack gap="lg">
          <Input
            label={t('settingsPage.sections.scenes.tagLimit')}
            hint={t('settingsPage.sections.scenes.tagLimitHint')}
            type="number"
            min="0"
            value={form.scene_tag_limit}
            disabled={isScanActive}
            onChange={handleChange('scene_tag_limit')}
          />
          <Dropdown
            label={t('settingsPage.sections.scenes.tagSeparator')}
            hint={t('settingsPage.sections.scenes.tagSeparatorHint')}
            value={form.scene_tag_separator}
            options={sceneTagSeparatorOptions}
            disabled={isScanActive}
            onChange={handleChange('scene_tag_separator')}
          />
          <Input
            label={t('settingsPage.sections.scenes.tagBlacklist')}
            hint={t('settingsPage.sections.scenes.tagBlacklistHint')}
            value={form.scene_tag_blacklist}
            disabled={isScanActive}
            onChange={handleChange('scene_tag_blacklist')}
            placeholder="Compilation, Trailer, VR"
          />
        </Stack>
      </Card>

      <Card title={t('settingsPage.sections.scenes.performersTitle')} eyebrow={t('settingsPage.sections.scenes.eyebrow')}>
        <Stack gap="lg">
          <Input
            label={t('settingsPage.sections.scenes.performerLimit')}
            hint={t('settingsPage.sections.scenes.performerLimitHint')}
            type="number"
            min="1"
            value={form.naming_performer_limit}
            disabled={isScanActive}
            onChange={handleChange('naming_performer_limit')}
          />
          <Switch
            id="naming_performer_limit_keep"
            checked={form.naming_performer_limit_keep}
            disabled={isScanActive}
            onChange={handleCheckboxChange('naming_performer_limit_keep')}
          >
            {t('settingsPage.sections.scenes.keepPerformersAtLimit')}
          </Switch>
          <Input
            label={t('settingsPage.sections.scenes.performerSeparator')}
            value={form.naming_performer_splitchar}
            disabled={isScanActive}
            onChange={handleChange('naming_performer_splitchar')}
            placeholder=" & "
          />
          <Dropdown
            label={t('settingsPage.sections.scenes.performerSort')}
            hint={t('settingsPage.sections.scenes.performerSortHint')}
            value={form.naming_performer_sort}
            options={scenePerformerSortOptions}
            disabled={isScanActive}
            onChange={handleChange('naming_performer_sort')}
          />
          <Dropdown
            label={t('settingsPage.sections.scenes.performerGender')}
            value={form.naming_performer_gender_filter}
            options={scenePerformerGenderOptions}
            disabled={isScanActive}
            onChange={handleChange('naming_performer_gender_filter')}
          />
          <Stack gap="2xs">
            <Switch
              id="naming_squeeze_studio_names"
              checked={form.naming_squeeze_studio_names}
              disabled={isScanActive}
              onChange={handleCheckboxChange('naming_squeeze_studio_names')}
            >
              {t('settingsPage.sections.scenes.squeezeStudioNames')}
            </Switch>
            <Hint>
              {t('settingsPage.sections.scenes.squeezeStudioNamesHint')}
            </Hint>
          </Stack>
        </Stack>
      </Card>

      <SettingsLiveImpact
        form={form}
        t={t}
        title={t('settingsPage.sections.liveImpact.title')}
        eyebrow={t('settingsPage.sections.liveImpact.eyebrow')}
        hint={t('settingsPage.sections.liveImpact.folderStructureHint')}
        filterType="scenes"
      />
    </Stack>
  );
}

