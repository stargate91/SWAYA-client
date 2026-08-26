import PropTypes from 'prop-types';
import Button from '@/ui/Button';
import Checkbox from '@/ui/Checkbox';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import { useClosePromptModalState } from './useClosePromptModalState';

export default function ClosePromptModalContent({ onAction, t }) {
  const {
    remember,
    setRemember,
    handleCancel,
    handleMinimizeToTray,
    handleQuit,
  } = useClosePromptModalState({ onAction });

  return (
    <Stack gap="lg">
      <Text as="p" variant="body" color="secondary">
        {t('closePrompt.info')}
      </Text>
      <Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)}>
        {t('closePrompt.dontAskAgain')}
      </Checkbox>
      <Inline gap="md" justify="end" align="center">
        <Button variant="secondary-neutral" onClick={handleCancel}>
          {t('common.cancel')}
        </Button>
        <Button variant="secondary-neutral" onClick={handleMinimizeToTray}>
          {t('closePrompt.action.tray')}
        </Button>
        <Button variant="danger" onClick={handleQuit}>
          {t('closePrompt.action.quit')}
        </Button>
      </Inline>
    </Stack>
  );
}

ClosePromptModalContent.propTypes = {
  onAction: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};
