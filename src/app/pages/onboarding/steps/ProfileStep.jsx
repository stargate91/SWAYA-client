import { User, Upload, Check } from '@/ui/icons';
import Button from '@/ui/Button';
import Badge from '@/ui/Badge';
import OnboardingInfoCard from '../components/OnboardingInfoCard';
import OnboardingOrbitHero from '../components/OnboardingOrbitHero';
import OnboardingPanelCard from '../components/OnboardingPanelCard';
import { useTranslation } from '@/providers/LanguageContext';
import { useAvatarUpload } from '@/hooks/useAvatarUpload';
import { getDicebearAvatarUrl, resolveAvatarUrl } from '@/lib/imageUrls';
import styles from './ProfileStep.module.css';
import formStyles from './FormStep.module.css';

const AVATAR_PRESETS = [
  { style: 'bottts', seed: 'Bender' },
  { style: 'bottts', seed: 'Optimus' },
  { style: 'bottts', seed: 'R2D2' },
  { style: 'bottts', seed: 'WallE' },
  { style: 'shapes', seed: 'Nebula' },
  { style: 'shapes', seed: 'Cosmos' },
  { style: 'shapes', seed: 'Stardust' },
  { style: 'shapes', seed: 'Galaxy' },
  { style: 'identicon', seed: 'Cinema' },
  { style: 'identicon', seed: 'Popcorn' },
  { style: 'lorelei', seed: 'Charlie' },
  { style: 'lorelei', seed: 'Marilyn' },
];

export default function ProfileStep({
  userName,
  setUserName,
  avatarPath,
  setAvatarPath,
}) {
  const { t } = useTranslation();
  const {
    fileInputRef,
    isUploading,
    error,
    clearError,
    handleAvatarUpload,
    triggerUpload,
  } = useAvatarUpload({
    t,
    onAvatarUploaded: (newAvatarPath) => {
      setAvatarPath(newAvatarPath);
    },
  });

  const defaultAvatarUrl = getDicebearAvatarUrl('bottts', 'Bender');
  const currentAvatarUrl = resolveAvatarUrl(avatarPath, defaultAvatarUrl);

  return (
    <div className={formStyles['onboarding-split-layout']}>
      <OnboardingInfoCard
        visual={(
          <OnboardingOrbitHero
            icon={User}
            chips={[
              { label: 'Aka', position: 'top-right' },
              { label: 'Alter Ego', position: 'bottom-left' },
              { label: 'Who Dis?', position: 'top-left' },
            ]}
          />
        )}
        kicker={t('onboarding.profile.kicker') || 'Profile Builder'}
        title={t('onboarding.profile.heroTitle') || 'Create your workspace profile.'}
        description={t('onboarding.profile.heroDesc') || 'Set up your identity. This profile will represent you inside SWAYA.'}
        items={[
          {
            icon: User,
            title: t('onboarding.profile.step3Title') || 'Step 3 of 6',
            description: t('onboarding.profile.step3Desc') || 'Your nickname and avatar customize your experience.',
          },
        ]}
      />

      <OnboardingPanelCard
        eyebrow={t('onboarding.profile.eyebrow') || 'Step 3'}
        title={t('onboarding.profile.title') || 'Personalize your profile'}
        meta={<Badge size="sm" tone="neutral" roundness="full">{t('onboarding.profile.stepMeta', { defaultValue: 'Workspace Account' })}</Badge>}
        description={t('onboarding.profile.description') || 'Set a nickname and choose a profile picture.'}
        footerLabel={t('onboarding.profile.nicknameReq', { defaultValue: 'Nickname' })}
        footerValue={userName.trim() ? t('onboarding.profile.ready', { defaultValue: 'Ready to continue' }) : t('onboarding.profile.required', { defaultValue: 'Nickname is required' })}
      >
        <div className={styles['profile-container']}>
          {/* Nickname input */}
          <div className={formStyles['onboarding-form-group']}>
            <label>{t('onboarding.profile.nicknameLabel', { defaultValue: 'Nickname' })}</label>
            <div className={formStyles['onboarding-input-wrapper']}>
              <input 
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={t('onboarding.profile.nicknamePlaceholder') || 'Enter your nickname'}
              />
            </div>
          </div>

          {/* Avatar Upload */}
          <div className={styles['avatar-upload-row']}>
            <img 
              src={currentAvatarUrl} 
              alt="Avatar Preview" 
              className={styles['avatar-upload-preview']} 
            />
            <div className={styles['avatar-upload-info']}>
              <span className={styles['avatar-upload-title']}>{t('onboarding.profile.avatarUploadTitle', { defaultValue: 'Upload Custom Avatar' })}</span>
              <span className={styles['avatar-upload-hint']}>{t('onboarding.profile.avatarUploadHint', { defaultValue: 'Supports PNG, JPG, WEBP' })}</span>
              {error && <span className={styles['avatar-error']}>{error}</span>}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              className={styles['hidden-file-input']} 
              onChange={handleAvatarUpload}
            />
            <Button 
              variant="secondary" 
              className={styles['upload-btn']} 
              onClick={triggerUpload}
              disabled={isUploading}
            >
              <Upload size={16} />
            </Button>
          </div>

          {/* Preset options */}
          <div>
            <span className={styles['avatar-presets-title']}>
              {t('onboarding.profile.presetsTitle', { defaultValue: 'Or choose a preset character:' })}
            </span>
            <div className={styles['avatar-grid']}>
              {AVATAR_PRESETS.map((preset) => {
                const presetUrl = getDicebearAvatarUrl(preset.style, preset.seed);
                const isSelected = avatarPath === presetUrl || (!avatarPath && preset.seed === 'Bender');
                return (
                  <button
                    key={preset.seed}
                    type="button"
                    className={`${styles['avatar-preset-btn']} ${isSelected ? styles['is-selected'] : ''}`}
                    onClick={() => {
                      setAvatarPath(presetUrl);
                      clearError();
                    }}
                  >
                    <img src={presetUrl} alt={preset.seed} className={styles['avatar-img']} />
                    {isSelected && (
                      <div className={styles.badge}>
                        <Check size={10} className={styles['check-icon']} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </OnboardingPanelCard>
    </div>
  );
}
