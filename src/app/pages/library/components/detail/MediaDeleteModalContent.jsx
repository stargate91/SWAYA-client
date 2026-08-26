import modalStyles from '@/ui/Modal.module.css';

export default function MediaDeleteModalContent({ actionCards, onSelectAction, isPending }) {
  return (
    <div className={modalStyles['actions-list']}>
      {actionCards.map((action) => (
        <button
          key={action.key}
          type="button"
          className={`${modalStyles['action-card']} ${action.className || ''}`.trim()}
          onClick={() => onSelectAction(action.key)}
          disabled={isPending}
        >
          <div className={modalStyles['action-copy']}>
            <strong className={modalStyles['action-title']}>{action.label}</strong>
            <span className={modalStyles['action-description']}>{action.description}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
