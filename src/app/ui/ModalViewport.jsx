import Modal from '@/ui/Modal';
import Button from '@/ui/Button';
import Inline from '@/ui/Inline';
import { useModalStore } from '@/stores/useModalStore';
import { useTranslation } from '@/providers/LanguageContext';
import { useConfirmDialogAction } from './useConfirmDialogAction';

function ConfirmFooter({ modal, onClose }) {
  const {
    loading,
    handleConfirm,
    handleCancel,
    confirmVariant,
    cancelLabel,
    confirmLabel,
  } = useConfirmDialogAction({ modal, onClose });

  return (
    <Inline justify="end" gap="md">
      <Button
        variant="secondary-neutral"
        onClick={handleCancel}
        disabled={loading}
      >
        {cancelLabel}
      </Button>
      <Button
        variant={confirmVariant}
        onClick={handleConfirm}
        loading={loading}
      >
        {confirmLabel}
      </Button>
    </Inline>
  );
}

export default function ModalViewport() {
  const modals = useModalStore((state) => state.modals);
  const closeModal = useModalStore((state) => state.closeModal);
  const { t } = useTranslation();

  if (!modals || modals.length === 0) {
    return null;
  }

  return (
    <>
      {modals.map((modal, index) => {
        const handleClose = () => closeModal(modal.id);

        let footerContent = modal.footer;
        if (modal.isConfirmDialog) {
          footerContent = <ConfirmFooter modal={modal} onClose={handleClose} />;
        } else if (footerContent === undefined) {
          footerContent = (
            <Button variant="secondary-neutral" onClick={handleClose}>
              {t('common.close')}
            </Button>
          );
        }

        return (
          <Modal
            key={modal.id}
            open={true}
            title={modal.title}
            description={modal.description}
            variant={modal.variant}
            width={modal.width}
            height={modal.height}
            closeOnBackdropClick={modal.closeOnBackdropClick}
            showCloseButton={modal.showCloseButton}
            showHeader={modal.showHeader}
            className={modal.className}
            bodyClassName={modal.bodyClassName}
            headerClassName={modal.headerClassName}
            headerStyle={modal.headerStyle}
            icon={modal.icon}
            onClose={handleClose}
            footer={footerContent}
            /* eslint-disable-next-line react/forbid-component-props */
            style={{ zIndex: `calc(var(--z-index-modal, 400) + ${index * 10})` }}
          >
            {modal.content || null}
          </Modal>
        );
      })}
    </>
  );
}
