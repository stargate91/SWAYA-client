import Input from '@/ui/Input';
import Radio from '@/ui/Radio';
import Tooltip from '@/ui/Tooltip';
import Field from '@/ui/Field';
import ColorSwatch from '@/ui/ColorSwatch';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import { useCreateListForm } from '../hooks/useCreateListForm';

export default function CreateListModalContent({
  onSave,
  t,
  initialList = null,
  mode = 'create',
  existingLists = [],
  existingNames = [],
  defaultIsAdult = false,
}) {
  const {
    name,
    setName,
    description,
    setDescription,
    color,
    setColor,
    listType,
    setListType,
    isAdult,
    error,
    handleSubmit,
    presetColors,
  } = useCreateListForm({
    onSave,
    t,
    initialList,
    mode,
    existingLists,
    existingNames,
    defaultIsAdult,
  });

  return (
    <Stack as="form" id="create-list-form" onSubmit={handleSubmit} gap="md" padding="xs">
      <Input
        id="list-name"
        type="text"
        label={t('lists.name_label') || 'Name'}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t('lists.name_placeholder') || 'List name...'}
        autoFocus
        required
        error={error}
      />

      <Input
        id="list-desc"
        label={t('lists.description_label') || 'Description'}
        multiline={true}
        resizable="vertical"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={t('lists.desc_placeholder') || 'Description...'}
        rows={3}
      />

      <Field label={t('lists.type_label') || 'List Type'}>
        <Inline gap="lg" align="center">
          <Radio
            name="listType"
            value="movie_tv"
            checked={listType === 'movie_tv'}
            onChange={() => setListType('movie_tv')}
            disabled={mode === 'edit'}
          >
            {t('lists.type_movie_tv') || 'Movies & TV'}
          </Radio>
          <Radio
            name="listType"
            value="video_scene"
            checked={listType === 'video_scene'}
            onChange={() => setListType('video_scene')}
            disabled={mode === 'edit'}
          >
            {isAdult ? (t('lists.type_video_scene') || 'Videos & Scenes') : (t('lists.type_videos') || 'Videos')}
          </Radio>
          <Radio
            name="listType"
            value="person"
            checked={listType === 'person'}
            onChange={() => setListType('person')}
            disabled={mode === 'edit'}
          >
            {t('lists.type_person') || 'People'}
          </Radio>
        </Inline>
      </Field>

      <Field label={t('lists.theme_color_label') || 'Theme Color'}>
        <Inline gap="md" align="center" wrap>
          {presetColors.map((c) => {
            const isSelected = color === c;
            return (
              <Tooltip key={c} content={c} side="top">
                <ColorSwatch
                  color={c}
                  selected={isSelected}
                  onClick={() => setColor(c)}
                  shape="square"
                />
              </Tooltip>
            );
          })}
        </Inline>
      </Field>
    </Stack>
  );
}
