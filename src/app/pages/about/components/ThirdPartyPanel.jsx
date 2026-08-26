import Card from '@/ui/Card';
import Text from '@/ui/Text';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Grid from '@/ui/Grid';
import Divider from '@/ui/Divider';
import {
  SILUR_NAME,
  KERRIGAN_NAME,
  YASHOCK_NAME,
  DATA_NAME,
  GITHUB_LABEL,
  GITHUB_1_LABEL,
  GITHUB_2_LABEL,
  BULLET_SEP,
  GitHubIcon,
  tmdbAttributionLogoSrc,
  openExternalLink
} from '../utils/aboutHelpers';
import styles from './ThirdPartyPanel.module.css';

export default function ThirdPartyPanel({ t }) {
  return (
    <Card
      title={t('about.notices.third_party')}
      eyebrow={t('about.notices.thirdPartyEyebrow', { defaultValue: 'CREDITS & ATTRIBUTIONS' })}
    >
      <Stack gap="lg">
        <Text variant="body" color="secondary">
          {t('about.notices.third_party_intro')}
        </Text>

        <Stack as="ul" gap="md" indent="md">
          <Text as="li" variant="body" color="secondary">{t('about.notices.third_party_points.ui')}</Text>
          <Text as="li" variant="body" color="secondary">{t('about.notices.third_party_points.backend')}</Text>
          <Text as="li" variant="body" color="secondary">{t('about.notices.third_party_points.media')}</Text>
          <Text as="li" variant="body" color="secondary">{t('about.notices.third_party_points.metadata')}</Text>
        </Stack>

        <Card variant="tmdb" padding="md">
          <Inline align="center" gap="lg">
            <img
              src={tmdbAttributionLogoSrc}
              alt="TMDb Logo"
              className={styles['tmdb-logo']}
            />
            <Stack gap="2xs" flex={1}>
              <Text variant="small" weight="bold" color="tmdb">
                {t('about.notices.third_party_highlight.tmdb_title')}
              </Text>
              <Text variant="xsmall" color="secondary">
                {t('about.notices.third_party_highlight.tmdb_body')}
              </Text>
            </Stack>
          </Inline>
        </Card>

        <Divider />

        <Stack gap="md">
          <Stack gap="2xs">
            <Text weight="bold" variant="body">
              {t('about.notices.special_thanks_title')}
            </Text>
            <Text variant="xsmall" color="muted">
              {t('about.notices.special_thanks_intro')}
            </Text>
          </Stack>

          <Grid variant="two-cols" gap="md">
            <Card variant="soft" padding="sm">
              <Stack gap="2xs">
                <Text weight="bold" variant="small">
                  {SILUR_NAME}
                </Text>
                <Inline gap="sm" align="center">
                  <Text
                    as="a"
                    href="https://github.com/Silur"
                    interactive
                    color="accent"
                    weight="semibold"
                    variant="xsmall"
                    onClick={(e) => {
                      e.preventDefault();
                      openExternalLink('https://github.com/Silur');
                    }}
                  >
                    <Inline gap="xs" align="center">
                      <GitHubIcon size={12} />
                      <span>{GITHUB_LABEL}</span>
                    </Inline>
                  </Text>
                </Inline>
              </Stack>
            </Card>

            <Card variant="soft" padding="sm">
              <Stack gap="2xs">
                <Text weight="bold" variant="small">
                  {KERRIGAN_NAME}
                </Text>
                <Inline gap="sm" align="center">
                  <Text
                    as="a"
                    href="https://github.com/rasztasd"
                    interactive
                    color="accent"
                    weight="semibold"
                    variant="xsmall"
                    onClick={(e) => {
                      e.preventDefault();
                      openExternalLink('https://github.com/rasztasd');
                    }}
                  >
                    <Inline gap="xs" align="center">
                      <GitHubIcon size={12} />
                      <span>{GITHUB_1_LABEL}</span>
                    </Inline>
                  </Text>
                  <Text variant="xsmall" color="muted">
                    {BULLET_SEP}
                  </Text>
                  <Text
                    as="a"
                    href="https://github.com/danielmcallisterSG"
                    interactive
                    color="accent"
                    weight="semibold"
                    variant="xsmall"
                    onClick={(e) => {
                      e.preventDefault();
                      openExternalLink('https://github.com/danielmcallisterSG');
                    }}
                  >
                    <Inline gap="xs" align="center">
                      <GitHubIcon size={12} />
                      <span>{GITHUB_2_LABEL}</span>
                    </Inline>
                  </Text>
                </Inline>
              </Stack>
            </Card>

            <Card variant="soft" padding="sm">
              <Stack gap="2xs">
                <Text weight="bold" variant="small">
                  {YASHOCK_NAME}
                </Text>
                <Inline gap="sm" align="center">
                  <Text
                    as="a"
                    href="https://github.com/YaShock"
                    interactive
                    color="accent"
                    weight="semibold"
                    variant="xsmall"
                    onClick={(e) => {
                      e.preventDefault();
                      openExternalLink('https://github.com/YaShock');
                    }}
                  >
                    <Inline gap="xs" align="center">
                      <GitHubIcon size={12} />
                      <span>{GITHUB_LABEL}</span>
                    </Inline>
                  </Text>
                </Inline>
              </Stack>
            </Card>

            <Card variant="soft" padding="sm">
              <Stack gap="2xs">
                <Text weight="bold" variant="small">
                  {DATA_NAME}
                </Text>
                <Inline gap="sm" align="center">
                  <Text
                    as="a"
                    href="https://github.com/adamgyongyosi"
                    interactive
                    color="accent"
                    weight="semibold"
                    variant="xsmall"
                    onClick={(e) => {
                      e.preventDefault();
                      openExternalLink('https://github.com/adamgyongyosi');
                    }}
                  >
                    <Inline gap="xs" align="center">
                      <GitHubIcon size={12} />
                      <span>{GITHUB_LABEL}</span>
                    </Inline>
                  </Text>
                </Inline>
              </Stack>
            </Card>
          </Grid>
        </Stack>

        <Text variant="caption" color="muted" italic align="center">
          {t('about.notices.third_party_thanks')}
        </Text>
      </Stack>
    </Card>
  );
}
