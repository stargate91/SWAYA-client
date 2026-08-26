import { Image as ImageIcon, Settings } from '@/ui/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import PeopleTagPopover from './PeopleTagPopover';
import ListsPopover from '../detail/sections/ListsPopover';
import Inline from '@/ui/Inline';
import Tooltip from '@/ui/Tooltip';

export default function EntityDetailTopControls({
  isPeople,
  item,
  t,
  canChoosePeopleBackdrop,
  canChooseCollectionBackdrop,
  updatePersonStatusMutation,
  handleOpenPeopleBackdropModal,
  handleOpenCollectionBackdropModal,
}) {
  const navigate = useNavigate();

  if (!item) return null;

  if (isPeople) {
    return (
      <Inline gap="sm" align="center">
        <ListsPopover
          item={item}
          type="person"
          t={t}
        />
        <PeopleTagPopover
          item={item}
          t={t}
          updatePersonStatusMutation={updatePersonStatusMutation}
        />
        <button
          type="button"
          onClick={() => navigate(ROUTES.PEOPLE_EDIT(item.id))}
          className="media-detail-page__side-nav-toggle"
        >
          <Tooltip content={item.is_adult ? (t('library.details.editPerformer') || 'Edit Star') : (t('library.details.editArtist') || 'Edit Artist')}>
            <Settings size={18} />
          </Tooltip>
        </button>
        {canChoosePeopleBackdrop ? (
          <button
            type="button"
            onClick={handleOpenPeopleBackdropModal}
            className="media-detail-page__side-nav-toggle"
          >
            <Tooltip content={t('library.details.backdrops') || 'Choose Backdrop'}>
              <ImageIcon size={18} />
            </Tooltip>
          </button>
        ) : null}
      </Inline>
    );
  }

  if (!canChooseCollectionBackdrop) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleOpenCollectionBackdropModal}
      className="media-detail-page__side-nav-toggle"
    >
      <Tooltip content={t('library.details.backdrops') || 'Choose Backdrop'}>
        <ImageIcon size={18} />
      </Tooltip>
    </button>
  );
}
