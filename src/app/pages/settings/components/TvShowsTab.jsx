import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import Switch from '@/ui/Switch';
import Hint from '@/ui/Hint';
import { FOLDER_SHOW_TAGS, FOLDER_SEASON_TAGS, FOLDER_EPISODE_TAGS, EPISODE_TAGS } from '../config';
import { useTvTemplatePreview } from '../hooks';
import TemplateFieldSection from './TemplateFieldSection.jsx';
import SettingsLiveImpact from './SettingsLiveImpact.jsx';
import { useSettingsFormContext, useSettingsViewContext } from '../SettingsFormContext.jsx';

export default function TvShowsTab({ isAdult = false }) {
  const { form, actions, formInputs } = useSettingsFormContext();
  const { t, realBackgroundActive } = useSettingsViewContext();
  const isScanActive = Boolean(realBackgroundActive);

  const {
    folderTvField,
    folderSeasonField,
    namingEpisodeField,
    folderTvPreview,
    folderSeasonPreview,
    folderEpisodePreview,
    namingEpisodePreview,
  } = useTvTemplatePreview(form, isAdult);

  return (
    <Stack gap="xl">
      <Card
        title={isAdult ? t('settingsPage.sections.folderStructure.adultTvFoldersTitle') : t('settingsPage.sections.folderStructure.tvFoldersTitle')}
        eyebrow={t('settingsPage.sections.folderStructure.structureEyebrow')}
      >
        <Stack gap="xl">
          <h3 className="settings-section-heading">
            {t('settingsPage.sections.folderStructure.showFoldersTitle')}
          </h3>

          <Stack gap="md">
            <Stack gap="2xs">
              <Switch
                id="folder_create_show_dir"
                checked={form.folder_create_show_dir}
                disabled={isScanActive}
                onChange={actions.handleCheckboxChange('folder_create_show_dir')}
              >
                {t('settingsPage.sections.folderStructure.createShowDir')}
              </Switch>
              <Hint>
                {t('settingsPage.sections.folderStructure.createShowDirHint')}
              </Hint>
            </Stack>

            {form.folder_create_show_dir && (
              <Stack indent="2xl">
                <TemplateFieldSection
                  t={t}
                  inputRef={formInputs.folderTv}
                  label={t('settingsPage.sections.folderStructure.showTemplate')}
                  value={form[folderTvField]}
                  disabled={isScanActive}
                  onChange={actions.handleChange(folderTvField)}
                  placeholder={isAdult ? "Leave empty to use standard TV folder pattern" : "{tv_title} ({year_range})"}
                  tags={FOLDER_SHOW_TAGS}
                  fieldKey={folderTvField}
                  insertTag={actions.insertTag}
                  previewText={folderTvPreview}
                />
              </Stack>
            )}
          </Stack>

          <Stack gap="2xs">
            <Switch
              id="folder_create_video_subdir"
              checked={form.folder_create_video_subdir}
              disabled={isScanActive}
              onChange={actions.handleCheckboxChange('folder_create_video_subdir')}
            >
              {t('settingsPage.sections.folderStructure.createVideoSubdir')}
            </Switch>
            <Hint>
              {t('settingsPage.sections.folderStructure.createVideoSubdirHint')}
            </Hint>
          </Stack>

          <h3 className="settings-section-heading">
            {t('settingsPage.sections.folderStructure.seasonEpisodeFoldersTitle')}
          </h3>

          <Stack gap="md">
            <Stack gap="2xs">
              <Switch
                id="folder_create_season_dir"
                checked={form.folder_create_season_dir}
                disabled={isScanActive}
                onChange={actions.handleCheckboxChange('folder_create_season_dir')}
              >
                {t('settingsPage.sections.folderStructure.createSeasonDir')}
              </Switch>
              <Hint>
                {t('settingsPage.sections.folderStructure.createSeasonDirHint')}
              </Hint>
            </Stack>

            {form.folder_create_season_dir && (
              <Stack indent="2xl">
                <TemplateFieldSection
                  t={t}
                  inputRef={formInputs.folderSeason}
                  label={t('settingsPage.sections.folderStructure.seasonTemplate')}
                  value={form[folderSeasonField]}
                  disabled={isScanActive}
                  onChange={actions.handleChange(folderSeasonField)}
                  placeholder={isAdult ? "Leave empty to use standard season folder pattern" : t('settingsPage.sections.folderStructure.seasonTemplatePlaceholder')}
                  tags={FOLDER_SEASON_TAGS}
                  fieldKey={folderSeasonField}
                  insertTag={actions.insertTag}
                  previewText={folderSeasonPreview}
                />
              </Stack>
            )}
          </Stack>

          <Stack gap="md">
            <Stack gap="2xs">
              <Switch
                id="folder_create_episode_dir"
                checked={form.folder_create_episode_dir}
                disabled={isScanActive}
                onChange={actions.handleCheckboxChange('folder_create_episode_dir')}
              >
                {t('settingsPage.sections.folderStructure.createEpisodeDir')}
              </Switch>
              <Hint>
                {t('settingsPage.sections.folderStructure.createEpisodeDirHint')}
              </Hint>
            </Stack>

            {form.folder_create_episode_dir && (
              <Stack indent="2xl">
                <TemplateFieldSection
                  t={t}
                  inputRef={formInputs.folderEpisode}
                  label={t('settingsPage.sections.folderStructure.episodeTemplate')}
                  value={form.folder_episode_template}
                  disabled={isScanActive}
                  onChange={actions.handleChange('folder_episode_template')}
                  placeholder="Episode {episode}"
                  tags={FOLDER_EPISODE_TAGS}
                  fieldKey="folder_episode_template"
                  insertTag={actions.insertTag}
                  previewText={folderEpisodePreview}
                />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Card>

      <Card
        title={isAdult ? t('settingsPage.sections.folderStructure.adultEpisodeTemplateLabel') : t('settingsPage.sections.fileNaming.episodeTemplateLabel')}
        eyebrow={t('settingsPage.sections.fileNaming.eyebrow')}
      >
        <Stack gap="lg">
          <TemplateFieldSection
            t={t}
            inputRef={formInputs.namingEpisode}
            label={isAdult ? t('settingsPage.sections.folderStructure.adultEpisodeTemplateLabel') : t('settingsPage.sections.fileNaming.episodeTemplateLabel')}
            hint={isAdult ? "Configure a separate template for adult TV episodes, or leave empty to inherit standard TV naming style." : t('settingsPage.sections.fileNaming.episodeTemplateHint')}
            value={form[namingEpisodeField]}
            disabled={isScanActive}
            onChange={actions.handleChange(namingEpisodeField)}
            placeholder={isAdult ? "Leave empty to use standard TV episode pattern" : "S{season}E{episode} - {title}"}
            tags={EPISODE_TAGS}
            fieldKey={namingEpisodeField}
            insertTag={actions.insertTag}
            previewText={namingEpisodePreview}
          />
        </Stack>
      </Card>

      <SettingsLiveImpact
        form={form}
        t={t}
        title={t('settingsPage.sections.folderStructure.impactTitle')}
        eyebrow={t('settingsPage.sections.folderStructure.impactEyebrow')}
        hint={t('settingsPage.sections.folderStructure.impactHint')}
      />
    </Stack>
  );
}
