import Text from '@/ui/Text';

export default function DeleteListModalContent({ t }) {
  return (
    <Text color="secondary" size="sm">
      {t('lists.delete_confirm') || 'Are you sure you want to delete this list?'}
    </Text>
  );
}
