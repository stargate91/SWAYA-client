import { memo } from 'react';
import PropTypes from 'prop-types';
import FloatingActionBar from '@/ui/FloatingActionBar';
import { useTranslation } from '@/providers/LanguageContext';
import { useOrganizerBulkActions } from '../hooks/useOrganizerBulkActions';

export const OrganizerBulkActionBar = memo(function OrganizerBulkActionBar({
  selectedRows = [],
  dismissRows,
  clearSelectedRows,
  openBulkDeleteModal,
  openMatchModal,
  openBulkOverrideModal,
  scanMode,
  provider,
  t: translateProp,
}) {
  const { t: contextTranslate } = useTranslation();
  const t = translateProp || contextTranslate;

  const { actions, isVisible, title } = useOrganizerBulkActions({
    selectedRows,
    dismissRows,
    clearSelectedRows,
    openBulkDeleteModal,
    openMatchModal,
    openBulkOverrideModal,
    scanMode,
    provider,
    t,
  });

  if (!isVisible) {
    return null;
  }

  return (
    <FloatingActionBar
      visible={isVisible}
      title={title}
      actions={actions}
    />
  );
});

OrganizerBulkActionBar.displayName = 'OrganizerBulkActionBar';

OrganizerBulkActionBar.propTypes = {
  selectedRows: PropTypes.array,
  dismissRows: PropTypes.func,
  clearSelectedRows: PropTypes.func,
  openBulkDeleteModal: PropTypes.func,
  openMatchModal: PropTypes.func,
  openBulkOverrideModal: PropTypes.func,
  scanMode: PropTypes.string,
  sessionMode: PropTypes.string,
  provider: PropTypes.string,
  t: PropTypes.func,
};

export default OrganizerBulkActionBar;

