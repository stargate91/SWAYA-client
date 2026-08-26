import PropTypes from 'prop-types';
import modalStyles from '@/ui/Modal.module.css';

export default function TorrentDeleteModalContent({
  onRemoveClientOnly,
  onRemoveTorrentAndFiles,
  t,
}) {
  return (
    <div className={modalStyles['actions-list']}>
      <button
        type="button"
        className={modalStyles['action-card']}
        onClick={onRemoveClientOnly}
      >
        <div className={modalStyles['action-copy']}>
          <strong className={modalStyles['action-title']}>
            {t('torrent.deleteOptions.torrentOnly.label') || 'Remove from client only'}
          </strong>
          <span className={modalStyles['action-description']}>
            {t('torrent.deleteOptions.torrentOnly.description') ||
              'Remove the torrent task. Downloaded files are kept on your disk.'}
          </span>
        </div>
      </button>
      <button
        type="button"
        className={`${modalStyles['action-card']} ${modalStyles['action-card--danger']}`}
        onClick={onRemoveTorrentAndFiles}
      >
        <div className={modalStyles['action-copy']}>
          <strong className={modalStyles['action-title']}>
            {t('torrent.deleteOptions.torrentAndFiles.label') || 'Remove torrent and delete files'}
          </strong>
          <span className={modalStyles['action-description']}>
            {t('torrent.deleteOptions.torrentAndFiles.description') ||
              'Permanently delete the downloaded files and remove the torrent task.'}
          </span>
        </div>
      </button>
    </div>
  );
}

TorrentDeleteModalContent.propTypes = {
  onRemoveClientOnly: PropTypes.func.isRequired,
  onRemoveTorrentAndFiles: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

