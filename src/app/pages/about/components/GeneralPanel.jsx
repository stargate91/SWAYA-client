import { Mail, Globe } from '@/ui/icons';
import Button from '@/ui/Button';
import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Grid from '@/ui/Grid';
import Text from '@/ui/Text';
import Avatar from '@/ui/Avatar';
import { useDeveloperContactActions } from '../hooks/useDeveloperContactActions';
import styles from './GeneralPanel.module.css';
import {
  LOGO_LETTER,
  APP_TITLE_TEXT,
  VERSION_CHAR,
  DEV_AVATAR_LETTER,
  GitHubIcon,
  DiscordIcon,
} from '../utils/aboutHelpers';

export default function GeneralPanel({ t, appInfo }) {
  const {
    developerEmail,
    handleEmailClick,
    handleOpenExternalLink,
  } = useDeveloperContactActions(appInfo, t);

  return (
    <Stack gap="lg" fullWidth>
      <Card variant="brand" padding="lg">
        <Inline align="center" gap="lg">
          <Avatar
            size="xl"
            shape="rounded"
            variant="accent"
            fallbackIcon={<Text variant="display" weight="extrabold" color="accent">{LOGO_LETTER}</Text>}
          />
          <Stack gap="xs" flex={1}>
            <Inline align="center" gap="md">
              <Text variant="title" weight="extrabold" tracking="wider">
                {APP_TITLE_TEXT}
              </Text>
              <span className={styles['version-badge']}>
                {VERSION_CHAR}{appInfo.version}
              </span>
            </Inline>
            <Text variant="small" color="secondary">
              {t('about.subtitle') || 'Organize, enrich, and keep your media library clean.'}
            </Text>
          </Stack>
        </Inline>
      </Card>

      <Stack gap="lg" fullWidth>
        <Stack gap="2xs">
          <Text weight="bold" variant="body">
            {t('about.app_info.developer') || 'Developer'}
          </Text>
          <Text variant="small" color="secondary">
            {t('about.app_info.developer_intro') || 'Reach out directly if you want to report bugs, collaborate, or share feedback.'}
          </Text>
        </Stack>

        <Card variant="soft-accent" padding="md">
          <Inline align="center" gap="md">
            <Avatar
              size="md"
              shape="rounded"
              variant="soft"
              fallbackIcon={<Text weight="bold" color="secondary">{DEV_AVATAR_LETTER}</Text>}
            />
            <Stack gap="2xs">
              <Text weight="bold" variant="body">
                {t('about.app_info.developer_name') || 'Levi'}
              </Text>
              <Text variant="small" color="secondary">
                {developerEmail}
              </Text>
            </Stack>
          </Inline>
        </Card>

        <Grid variant="two-cols" gap="md">
          <Button
            as="a"
            href={`mailto:${developerEmail}`}
            variant="secondary"
            onClick={handleEmailClick}
            leftIcon={<Mail size={16} />}
          >
            {t('about.links.email') || 'Email'}
          </Button>
          <Button
            as="a"
            href={appInfo.developer.website}
            variant="secondary"
            onClick={handleOpenExternalLink(appInfo.developer.website)}
            leftIcon={<Globe size={16} />}
          >
            {t('about.links.website') || 'Website'}
          </Button>
          <Button
            as="a"
            href={appInfo.developer.github}
            variant="secondary"
            onClick={handleOpenExternalLink(appInfo.developer.github)}
            leftIcon={<GitHubIcon size={16} />}
          >
            {t('about.links.github') || 'GitHub'}
          </Button>
          <Button
            as="a"
            href={appInfo.developer.discordServer}
            variant="secondary"
            onClick={handleOpenExternalLink(appInfo.developer.discordServer)}
            leftIcon={<DiscordIcon size={16} />}
          >
            {t('about.links.discord_server') || 'Discord Server'}
          </Button>
        </Grid>
      </Stack>
    </Stack>
  );
}
