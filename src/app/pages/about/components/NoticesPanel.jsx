import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';

export default function NoticesPanel({ t, activeTab }) {
  if (activeTab === 'privacy') {
    return (
      <Card
        title={t('about.notices.privacy')}
        eyebrow={t('about.notices.privacyEyebrow', { defaultValue: 'PRIVACY & SECURITY' })}
      >
        <Stack gap="lg">
          <Text variant="body" color="secondary">
            {t('about.notices.privacy_intro')}
          </Text>
          <Stack as="ul" gap="md" indent="md">
            <Text as="li" variant="body" color="secondary">{t('about.notices.points.local_only')}</Text>
            <Text as="li" variant="body" color="secondary">{t('about.notices.points.api_keys')}</Text>
            <Text as="li" variant="body" color="secondary">{t('about.notices.points.network')}</Text>
            <Text as="li" variant="body" color="secondary">{t('about.notices.points.logs')}</Text>
            <Text as="li" variant="body" color="secondary">{t('about.notices.points.no_telemetry')}</Text>
            <Text as="li" variant="body" color="secondary">{t('about.notices.points.no_sharing')}</Text>
          </Stack>
        </Stack>
      </Card>
    );
  }

  if (activeTab === 'license') {
    return (
      <Card
        title={t('about.notices.license')}
        eyebrow={t('about.notices.licenseEyebrow', { defaultValue: 'LEGAL & LICENSE' })}
      >
        <Stack gap="lg">
          <Text variant="body" color="secondary">
            {t('about.notices.license_intro')}
          </Text>
          <Card variant="soft" padding="md" scrollable maxHeight="22rem">
            <Stack gap="md">
              <Text as="p" variant="xsmall" mono color="secondary">{t('about.notices.license_body.p1')}</Text>
              <Text as="p" variant="xsmall" mono color="secondary">{t('about.notices.license_body.p2')}</Text>
              <Text as="p" variant="xsmall" mono color="secondary">{t('about.notices.license_body.p3')}</Text>
              <Text as="p" variant="xsmall" mono color="secondary">{t('about.notices.license_body.p4')}</Text>
            </Stack>
          </Card>
        </Stack>
      </Card>
    );
  }

  return null;
}
