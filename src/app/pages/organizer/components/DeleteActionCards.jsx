import modalStyles from '@/ui/Modal.module.css';

export default function DeleteActionCards({ actionCards, onSelectAction, toast, defaultErrorText }) {
  return (
    <div className={modalStyles['actions-list']}>
      {actionCards.map((action) => (
        <button
          key={action.key}
          type="button"
          className={`${modalStyles['action-card']} ${action.className || ''}`.trim()}
          onClick={() => {
            onSelectAction(action.key).catch((error) => {
              toast(error.message || defaultErrorText, 'danger');
            });
          }}
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
