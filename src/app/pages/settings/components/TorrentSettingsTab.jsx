import Stack from '@/ui/Stack';
import Grid from '@/ui/Grid';
import Text from '@/ui/Text';
import InfoBox from '@/ui/InfoBox';
import Card from '@/ui/Card';
import Button from '@/ui/Button';
import { useSettingsField, useSettingsViewContext } from '../SettingsFormContext.jsx';
import SettingsSwitchField from './fields/SettingsSwitchField.jsx';
import SettingsPathField from './fields/SettingsPathField.jsx';
import SettingsTextField from './fields/SettingsTextField.jsx';
import { ExternalLink } from '@/ui/icons';
import { openExternalLink } from '@/lib/ipc';

export default function TorrentSettingsTab() {
  const { t } = useSettingsViewContext();
  const torrentEnabledField = useSettingsField('torrent_enabled');

  return (
    <Stack gap="xl">
      <Card title={t?.('settingsPage.sections.torrent.title') || 'Torrent Integration'}>
        <Stack gap="md">
          <SettingsSwitchField field="torrent_enabled" id="torrent_enabled">
            {t?.('settingsPage.sections.torrent.enable') || 'Enable Download Automation'}
          </SettingsSwitchField>
          <Text variant="small" color="secondary">
            {t?.('settingsPage.sections.torrent.hint') || 
             'Automatically downloads, runs, and integrates Jackett and qBittorrent-nox in the background to search and download movies.'}
          </Text>
        </Stack>
      </Card>

      {torrentEnabledField.checked && (
        <>
          <Card title={t?.('settingsPage.sections.torrent.qbittorrent') || 'Storage Settings'}>
            <Stack gap="md">
              <SettingsPathField
                field="torrent_download_dir"
                label={t?.('settingsPage.sections.torrent.qbUrl') || 'Download Directory'}
                placeholder={t?.('settingsPage.sections.torrent.qbUrlPlaceholder') || 'Choose folder where completed torrent downloads will save...'}
                picker="folder"
                buttonLabel={t?.('common.browse') || 'Browse'}
                t={t}
              />
            </Stack>
          </Card>

          <Card title={t?.('settingsPage.sections.torrent.qbSettings') || 'qBittorrent WebUI Connection'}>
            <Stack gap="md">
              <Grid variant="three-cols">
                <SettingsTextField
                  field="torrent_qbittorrent_port"
                  label={t?.('settingsPage.sections.torrent.qbPort') || 'WebUI Port'}
                  placeholder={t?.('settingsPage.sections.torrent.qbPortPlaceholder') || 'Default: 8080'}
                />
                <SettingsTextField
                  field="torrent_qbittorrent_user"
                  label={t?.('settingsPage.sections.torrent.qbUser') || 'WebUI Username'}
                  placeholder={t?.('settingsPage.sections.torrent.qbUserPlaceholder') || 'Default: admin'}
                />
                <SettingsTextField
                  field="torrent_qbittorrent_pass"
                  label={t?.('settingsPage.sections.torrent.qbPass') || 'WebUI Password'}
                  placeholder={t?.('settingsPage.sections.torrent.qbPassPlaceholder') || 'WebUI password...'}
                  type="password"
                />
              </Grid>
              {/* eslint-disable-next-line react/forbid-component-props */}
              <InfoBox style={{ whiteSpace: 'pre-line' }}>
                <Text variant="small" color="secondary">
                  {t?.('settingsPage.sections.torrent.qbHelpText') || 
                   'To integrate qBittorrent with SWAYA:\n1. Open your qBittorrent client.\n2. Go to Tools -> Options -> Web UI.\n3. Enable the Web User Interface (Remote control).\n4. Set a port (default: 8080), username, and password.\n5. Paste the port, username, and password in the fields above.'}
                </Text>
              </InfoBox>
            </Stack>
          </Card>

          <Card title={t?.('settingsPage.sections.torrent.jackett') || 'Jackett Trackers Configuration'}>
            <Stack gap="md">
              <Text variant="small" color="secondary">
                {t?.('settingsPage.sections.torrent.jackettInfo') || 
                 'Jackett runs automatically in the background. Use the dashboard link below to add indexers (e.g. nCore, 1337x) with your credentials.'}
              </Text>
              <Text variant="small" color="muted" italic>
                {t?.('settingsPage.sections.torrent.jackettDisclaimer') || 
                 'DISCLAIMER: I do not support, condone, or encourage copyright infringement or any form of digital piracy. Users are entirely responsible for their own actions and ensuring they possess the legal rights to any content they access or download. The developer assumes no responsibility or liability for how users utilize this integration.'}
              </Text>
              <div>
                <Button 
                  onClick={() => openExternalLink('http://127.0.0.1:9117')}
                  variant="primary"
                >
                  <ExternalLink size={16} />
                  {t?.('settingsPage.sections.torrent.openJackett') || 'Open Jackett Dashboard'}
                </Button>
              </div>
            </Stack>
          </Card>
        </>
      )}
    </Stack>
  );
}
