import { Upload } from '@/ui/icons';
import Button from '@/ui/Button';
import SettingsSectionRenderer from './SettingsSectionRenderer.jsx';
import { useSettingsFormContext } from '../SettingsFormContext.jsx';
import { createGeneralProfileSection } from '../config';
import { resolveAvatarUrl } from '@/lib/imageUrls';
import { useAvatarUpload } from '@/hooks/useAvatarUpload';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import Avatar from '@/ui/Avatar';

export default function GeneralProfileSection({ t }) {
  const { form, actions } = useSettingsFormContext();
  const avatarUrl = resolveAvatarUrl(form.avatar_path, '');

  const {
    fileInputRef,
    isUploading,
    error,
    handleAvatarUpload,
    triggerUpload,
  } = useAvatarUpload({
    t,
    onAvatarUploaded: (avatarPath) => {
      actions.handleChange('avatar_path')({ target: { value: avatarPath } });
    },
  });

  const section = createGeneralProfileSection(t);
  section.items.unshift({
    type: 'custom',
    key: 'avatar',
    render: () => (
      <Inline gap="md" align="center">
        <Avatar src={avatarUrl} alt={t('settingsPage.sections.profile.avatarAlt')} />
        <Stack gap="xs" flex={1}>
          <Text variant="body" color="primary" weight="bold">
            {t('settingsPage.sections.profile.avatar')}
          </Text>
          <Text variant="small" color="secondary">
            {t('settingsPage.sections.profile.avatarHint')}
          </Text>
          {error ? (
            <Text variant="small" color="danger">
              {error}
            </Text>
          ) : null}
        </Stack>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          hidden
          onChange={handleAvatarUpload}
        />
        <Button
          type="button"
          variant="secondary-neutral"
          disabled={isUploading}
          onClick={triggerUpload}
        >
          <Upload size={16} />
          {isUploading ? t('settingsPage.sections.profile.uploading') : t('settingsPage.sections.profile.uploadAvatar')}
        </Button>
      </Inline>
    ),
  });

  return <SettingsSectionRenderer section={section} t={t} />;
}
