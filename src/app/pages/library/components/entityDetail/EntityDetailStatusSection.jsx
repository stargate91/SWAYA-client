import EmptyState from '@/ui/EmptyState';

export default function EntityDetailStatusSection({ title, message }) {
  return (
    <EmptyState
      layout="left"
      title={title}
      description={message}
      size="lg"
    />
  );
}

