import { useMemo } from 'react';
import { formatPreviewDate } from '@/lib/formatters';
import useTemplatePreview from './useTemplatePreview';

export function useSceneTemplatePreview(form) {
  const getPreview = useTemplatePreview(form);

  return useMemo(() => {
    const studioName = form.naming_squeeze_studio_names ? 'BrazzersNetwork' : 'Brazzers Network';
    const parentStudioName = form.naming_squeeze_studio_names ? 'Brazzers' : 'Brazzers';
    const performerSeparator = form.naming_performer_splitchar || ' & ';
    const tagBlacklist = new Set(
      String(form.scene_tag_blacklist || '')
        .split(',')
        .map((tag) => tag.trim().toLocaleLowerCase())
        .filter(Boolean)
    );
    const tagLimit = Math.max(0, Number.parseInt(form.scene_tag_limit, 10) || 0);
    let previewTags = ['Audition', 'Brunette', 'Couples', 'Feature', 'HD', 'Roleplay']
      .filter((tag) => !tagBlacklist.has(tag.toLocaleLowerCase()))
      .sort((left, right) => left.localeCompare(right));
    previewTags = tagLimit > 0 ? previewTags.slice(0, tagLimit) : [];
    const sceneContext = {
      date: formatPreviewDate(form.naming_scene_date_format),
      studio: studioName,
      parent_studio: parentStudioName,
      studio_family: parentStudioName,
      performers: ['Abella Danger', 'Jordi El Nino Polla'].join(performerSeparator),
      performer: ['Abella Danger', 'Jordi El Nino Polla'].join(performerSeparator),
      tags: previewTags.join(form.scene_tag_separator || ' '),
    };
    const scenePreview = getPreview(form.naming_scene_template, 'scene', { contextOverrides: sceneContext });
    const folderPreview = form.folder_scene_template
      ? getPreview(form.folder_scene_template, 'scene', { isFile: false, contextOverrides: sceneContext })
      : '';

    return {
      sceneContext,
      scenePreview,
      folderPreview,
    };
  }, [
    form.naming_squeeze_studio_names,
    form.naming_performer_splitchar,
    form.scene_tag_blacklist,
    form.scene_tag_limit,
    form.naming_scene_date_format,
    form.scene_tag_separator,
    form.naming_scene_template,
    form.folder_scene_template,
    getPreview,
  ]);
}
