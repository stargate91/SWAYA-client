import { settings } from './api/settings';
import { library } from './api/library';
import { media } from './api/media';
import { metadata } from './api/metadata';
import { people } from './api/people';
import { lists } from './api/lists';
import { organizer } from './api/organizer';
import { scan } from './api/scan';
import { history } from './api/history';
import { tags } from './api/tags';
import { rename } from './api/rename';
import { recommendations } from './api/recommendations';
import { torrent } from './api/torrent';
import { tv } from './api/tv';
import { image, hydrate, collection, task } from './api/status';

export const api = {
  settings,
  library,
  scan,
  image,
  hydrate,
  collection,
  organizer,
  media,
  task,
  history,
  metadata,
  tv,
  people,
  tags,
  rename,
  recommendations,
  lists,
  torrent,
};

export {
  settings,
  library,
  scan,
  image,
  hydrate,
  collection,
  organizer,
  media,
  task,
  history,
  metadata,
  tv,
  people,
  tags,
  rename,
  recommendations,
  lists,
  torrent,
};

export default api;
