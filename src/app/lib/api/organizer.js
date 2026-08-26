import { fetchJson } from '../http';

export const organizer = {
  get: ({ scanMode, sessionMode, page, pageSize, tab, subTab, q, sortBy, sortDir } = {}) => fetchJson('/api/organizer', {
    params: {
      scan_mode: scanMode,
      session_mode: sessionMode,
      page,
      page_size: pageSize,
      tab,
      sub_tab: subTab,
      q,
      sort_by: sortBy,
      sort_dir: sortDir,
    },
  }),
  getCount: ({ scanMode, sessionMode } = {}) => fetchJson('/api/organizer/count', {
    params: { scan_mode: scanMode, session_mode: sessionMode },
  }),
  getRenamePreview: ({ scanMode, sessionMode } = {}) => fetchJson('/api/organizer/rename-preview', {
    params: { scan_mode: scanMode, session_mode: sessionMode },
  }),
  delete: (payload) => fetchJson('/api/organizer/delete', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
};

export default organizer;
