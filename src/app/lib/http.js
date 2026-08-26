import { API_BASE } from './backend';

export const buildQueryParams = (paramsObj) => {
  if (!paramsObj || typeof paramsObj !== 'object') return '';
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(paramsObj)) {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  }
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

export const fetchJson = async (path, options = {}) => {
  const { params, ...fetchOptions } = options;
  let adjustedPath = path;
  if (adjustedPath.startsWith('/api/')) {
    adjustedPath = '/api/v1/' + adjustedPath.slice(5);
  }
  if (params) {
    const query = buildQueryParams(params);
    if (query) {
      adjustedPath += adjustedPath.includes('?') ? query.replace('?', '&') : query;
    }
  }
  const response = await fetch(`${API_BASE}${adjustedPath}`, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  });

  const data = await response.json().catch((err) => {
    if (err.name === 'AbortError') {
      throw err;
    }
    console.error(`Failed to parse JSON response from ${adjustedPath}:`, err);
    return {};
  });

  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    if (data?.detail) {
      if (Array.isArray(data.detail)) {
        message = data.detail.map((d) => d.msg || JSON.stringify(d)).join(', ');
      } else if (typeof data.detail === 'object') {
        message = data.detail.message || JSON.stringify(data.detail);
      } else {
        message = String(data.detail);
      }
    } else if (data?.message) {
      message = String(data.message);
    } else if (data?.error) {
      message = String(data.error);
    }
    throw new Error(message);
  }

  return data;
};

export const uploadFile = async (path, fileOrFormData, options = {}) => {
  const { params, fieldName = 'file', extraFields = {}, ...fetchOptions } = options;
  let adjustedPath = path;
  if (adjustedPath.startsWith('/api/')) {
    adjustedPath = '/api/v1/' + adjustedPath.slice(5);
  }
  if (params) {
    const query = buildQueryParams(params);
    if (query) {
      adjustedPath += adjustedPath.includes('?') ? query.replace('?', '&') : query;
    }
  }

  let formData;
  if (fileOrFormData instanceof FormData) {
    formData = fileOrFormData;
  } else {
    formData = new FormData();
    if (fileOrFormData) {
      formData.append(fieldName, fileOrFormData);
    }
    for (const [key, value] of Object.entries(extraFields)) {
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, value);
      }
    }
  }

  const response = await fetch(`${API_BASE}${adjustedPath}`, {
    method: 'POST',
    ...fetchOptions,
    body: formData,
  });

  const data = await response.json().catch((err) => {
    if (err.name === 'AbortError') {
      throw err;
    }
    console.error(`Failed to parse JSON upload response from ${adjustedPath}:`, err);
    return {};
  });

  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    if (data?.detail) {
      if (Array.isArray(data.detail)) {
        message = data.detail.map((d) => d.msg || JSON.stringify(d)).join(', ');
      } else if (typeof data.detail === 'object') {
        message = data.detail.message || JSON.stringify(data.detail);
      } else {
        message = String(data.detail);
      }
    } else if (data?.message) {
      message = String(data.message);
    } else if (data?.error) {
      message = String(data.error);
    }
    throw new Error(message);
  }

  return data;
};

export const fetchAsset = async (path, options = {}) => {
  const { params, signal, ...fetchOptions } = options;
  let adjustedPath = path;
  if (adjustedPath.startsWith('/api/')) {
    adjustedPath = '/api/v1/' + adjustedPath.slice(5);
  }
  if (params) {
    const query = buildQueryParams(params);
    if (query) {
      adjustedPath += adjustedPath.includes('?') ? query.replace('?', '&') : query;
    }
  }
  const fullUrl = (adjustedPath.startsWith('http://') || adjustedPath.startsWith('https://'))
    ? adjustedPath
    : `${API_BASE}${adjustedPath}`;

  return await fetch(fullUrl, {
    signal,
    ...fetchOptions,
  });
};
