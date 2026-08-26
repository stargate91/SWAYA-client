import { fetchJson } from '../http';

export const image = {
  getStatus: () => fetchJson('/api/image-status'),
};

export const hydrate = {
  getStatus: () => fetchJson('/api/hydrate-status'),
};

export const collection = {
  getStatus: () => fetchJson('/api/collection-status'),
};

export const task = {
  stop: () => fetchJson('/api/task/stop', { method: 'POST' }),
};

export default {
  image,
  hydrate,
  collection,
  task,
};
