import { handleSettingsRequests } from './settingsHandlers';
import { handleLibraryRequests } from './libraryHandlers';
import { handleRecommendationRequests } from './recommendationHandlers';
import { handlePeopleRequests } from './peopleHandlers';
import { handleListsRequests } from './listsHandlers';
import { handleHistoryRequests } from './historyHandlers';
import { handleOrganizerRequests } from './organizerHandlers';
import { handleTorrentRequests } from './torrentHandlers';
import { handleSearchRequests } from './searchHandlers';

const handlerModules = [
  handleSettingsRequests,
  handleLibraryRequests,
  handleRecommendationRequests,
  handlePeopleRequests,
  handleListsRequests,
  handleHistoryRequests,
  handleOrganizerRequests,
  handleTorrentRequests,
  handleSearchRequests
];

/**
 * Dispatches intercepted mock API requests to domain-specific handlers.
 * @param {string} path Clean API path without query params or leading /api/
 * @param {RequestInit} options Fetch options
 * @param {string} urlStr Original URL string
 * @returns {Response}
 */
export function dispatchMockRequest(path, options, urlStr) {
  for (const handler of handlerModules) {
    const res = handler(path, options, urlStr);
    if (res) return res;
  }

  // Default fallback response for unmatched routes
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
