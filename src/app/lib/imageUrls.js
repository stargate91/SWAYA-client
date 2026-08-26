import { API_BASE } from '@/lib/backend';

export const TMDB_IMAGE_SIZES = {
  poster: 'w500',
  backdrop: 'w1280',
  logo: 'w500',
  still: 'w400',
  person: 'w185',
  thumbnail: 'w300',
  backdropThumb: 'w300',
  posterThumb: 'w154',
  personThumb: 'w185',
  originalPoster: 'w780',
  originalStill: 'w780',
  originalPerson: 'h632',
  scene_stills: 'w500',
  originalSceneStill: 'w1280',
};

export const buildTmdbImageUrl = (path, size = TMDB_IMAGE_SIZES.poster) => {
  if (!path) return '';
  const pathStr = String(path);
  if (pathStr.startsWith('http://') || pathStr.startsWith('https://') || pathStr.startsWith('//') || pathStr.startsWith('/api/') || pathStr.startsWith('/media/')) {
    return pathStr;
  }
  return `https://image.tmdb.org/t/p/${size}${pathStr}`;
};

export const pickFirstImagePath = (...paths) => {
  for (const path of paths) {
    if (typeof path === 'string' && path.trim()) {
      return path.trim();
    }
  }
  return '';
};

export const getPosterImagePath = (item) => pickFirstImagePath(
  item?.displayPoster,
  item?.poster_path,
  item?.local_poster_path,
);

export const getTvPosterImagePath = (item) => pickFirstImagePath(
  item?.displayPoster,
  item?.tv_poster_path,
  item?.poster_path,
  item?.local_poster_path,
);

export const getProfileImagePath = (item) => pickFirstImagePath(
  item?.profile_path,
  item?.poster_path,
  item?.displayPoster,
  item?.image,
  item?.image_url,
  item?.profile_image,
  item?.avatar,
  item?.photo,
  Array.isArray(item?.images) ? item.images[0] : null,
);

export const getBackdropImagePath = (item) => pickFirstImagePath(
  item?.local_backdrop_path,
  item?.backdrop_path,
);

export const buildImageProxyUrl = (rawUrl, options = {}) => {
  if (!rawUrl) return '';
  const { blur, width, apiBase = API_BASE } = options;

  let targetUrl = rawUrl;
  if (rawUrl.includes('/media/image-proxy')) {
    try {
      // Use a mock base URL to handle relative paths safely
      const parsed = new URL(rawUrl, 'http://localhost');
      const innerUrl = parsed.searchParams.get('url');
      if (innerUrl) {
        targetUrl = innerUrl;
      }
    } catch (e) {
      console.warn('Failed to parse existing image-proxy URL:', e);
    }
  }

  if (targetUrl.startsWith('/media/') || targetUrl.startsWith('/avatars/') || targetUrl.startsWith('/images/') || targetUrl.startsWith('/favicons/')) {
    return targetUrl;
  }

  if (!blur && (targetUrl.startsWith('https://image.tmdb.org/') || targetUrl.startsWith('http://') || targetUrl.startsWith('https://'))) {
    return targetUrl;
  }

  if (targetUrl.startsWith('https://image.tmdb.org/')) {
    return targetUrl;
  }

  const params = new URLSearchParams();
  params.append('url', targetUrl);
  if (blur) params.append('blur', 'true');
  if (width) params.append('width', String(width));
  return `${apiBase}/api/v1/media/image-proxy?${params.toString()}`;
};

export const resolveMediaImageUrl = (path, imageType = 'poster', apiBaseOrOpts = API_BASE) => {
  if (!path) return '';

  const opts = typeof apiBaseOrOpts === 'object' && apiBaseOrOpts !== null
    ? apiBaseOrOpts
    : { apiBase: apiBaseOrOpts };
  const { blur, width, apiBase = API_BASE } = opts;

  const resolveBaseUrl = () => {
    let pathStr = String(path);
    if (pathStr.startsWith('//')) {
      pathStr = `https:${pathStr}`;
    }
    if (pathStr.startsWith('/media/') || pathStr.startsWith('/avatars/') || pathStr.startsWith('/images/')) {
      return pathStr;
    }
    if (pathStr.startsWith(apiBase) || pathStr.startsWith('http://localhost') || pathStr.startsWith('http://127.0.0.1')) {
      return pathStr;
    }

    const isOriginalType = ['backdrop', 'logo', 'originalPoster', 'originalStill', 'originalPerson', 'originalSceneStill'].includes(imageType);

    if (pathStr.startsWith('/api/') || pathStr.startsWith('media/')) {
      const relPath = pathStr.startsWith('media/') ? `/${pathStr}` : pathStr;
      if (isOriginalType && relPath.includes('/thumbnails/')) {
        return `${apiBase}${relPath.replace('/thumbnails/', '/original/')}`;
      }
      return `${apiBase}${relPath}`;
    }

    if (pathStr.startsWith('http://') || pathStr.startsWith('https://')) {
      if (pathStr.includes('image.tmdb.org/t/p/')) {
        const parts = pathStr.split('/t/p/');
        if (parts.length === 2) {
          const subparts = parts[1].split('/');
          if (subparts.length >= 2) {
            const size = TMDB_IMAGE_SIZES[imageType] || TMDB_IMAGE_SIZES.poster;
            const rest = subparts.slice(1).join('/');
            return `${parts[0]}/t/p/${size}/${rest}`;
          }
        }
        return pathStr;
      }
      return pathStr;
    }

    if (pathStr.startsWith('/')) {
      const size = TMDB_IMAGE_SIZES[imageType] || TMDB_IMAGE_SIZES.poster;
      return buildTmdbImageUrl(pathStr, size);
    }

    const normalizedPath = String(path).replace(/^\/+/, '');
    if (normalizedPath.startsWith('media/images/')) {
      return `${apiBase}/${normalizedPath}`;
    }

    let folder = 'posters';
    if (imageType === 'backdrop') folder = 'backdrops';
    else if (imageType === 'logo') folder = 'logos';
    else if (imageType === 'person' || imageType === 'originalPerson' || imageType === 'personThumb') folder = 'people';
    else if (imageType === 'still' || imageType === 'originalStill') folder = 'stills';
    else if (imageType === 'scene_stills' || imageType === 'originalSceneStill') folder = 'scene_stills';

    const subfolderType = isOriginalType ? 'original' : 'thumbnails';

    if (normalizedPath.includes('/')) {
      if (normalizedPath.startsWith('original/') || normalizedPath.startsWith('thumbnails/')) {
        return `${apiBase}/media/images/${normalizedPath}`;
      }
      return `${apiBase}/media/images/${subfolderType}/${normalizedPath}`;
    }
    return `${apiBase}/media/images/${subfolderType}/${folder}/${normalizedPath}`;
  };

  const resolvedUrl = resolveBaseUrl();
  if (blur || width) {
    return buildImageProxyUrl(resolvedUrl, { blur, width, apiBase });
  }
  return resolvedUrl;
};

export const fnv1aHash = (str) => {
  let hash = 2166136261;
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  for (let i = 0; i < bytes.length; i++) {
    hash ^= bytes[i];
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
};

export const pathsMatch = (path, currentPath) => {
  if (!path || !currentPath) return false;

  // Resolve image-proxy wrappers to the inner URL they proxy
  const unwrapProxy = (p) => {
    const lower = p.toLowerCase();
    if (lower.includes('image-proxy')) {
      try {
        const urlParam = new URL(p, 'http://localhost').searchParams.get('url');
        if (urlParam) return urlParam;
      } catch { /* ignore */ }
    }
    return p;
  };

  const resolvedPath = unwrapProxy(path);
  const resolvedCurrent = unwrapProxy(currentPath);

  const pathLower = resolvedPath.toLowerCase();
  const currentLower = resolvedCurrent.toLowerCase();

  if (pathLower === currentLower) return true;

  const isPathHttp = pathLower.startsWith('http://') || pathLower.startsWith('https://');
  const isCurrentHttp = currentLower.startsWith('http://') || currentLower.startsWith('https://');

  if (isPathHttp && isCurrentHttp) {
    return pathLower === currentLower;
  }

  // Handle local vs remote override matching
  const currentFilename = currentLower.split(/[/\\]/).pop().split('?')[0];
  const optionFilename = pathLower.split(/[/\\]/).pop().split('?')[0];

  // Try exact filename match first
  if (currentFilename === optionFilename) return true;

  // If option is remote, calculate its FNV-1a hash and see if it is in the current local filename
  if (isPathHttp && !isCurrentHttp) {
    const urlHash = fnv1aHash(resolvedPath);
    const hashPattern = `_${urlHash}`;
    if (currentFilename.includes(hashPattern)) {
      return true;
    }
  }

  // Fallback to suffix match of cleaned filename
  const cleanCurrent = currentFilename.replace('user_override_', '');
  if (cleanCurrent.includes(optionFilename)) {
    return true;
  }

  return false;
};

/**
 * Generates a DiceBear SVG avatar URL.
 * @param {string} [style='bottts'] - DiceBear style (e.g. 'bottts', 'shapes', 'identicon', 'lorelei')
 * @param {string} [seed='Bender'] - Seed identifier
 * @returns {string}
 */
export const getDicebearAvatarUrl = (style = 'bottts', seed = 'Bender') => {
  return `https://api.dicebear.com/7.x/${encodeURIComponent(style)}/svg?seed=${encodeURIComponent(seed)}`;
};

/**
 * Resolves an avatar URL, supporting remote URLs, uploads (/media/...), data URLs, or default fallback.
 * @param {string|null|undefined} path - Raw avatar path
 * @param {string} [defaultUrl=''] - Fallback URL if path is missing
 * @param {string} [apiBase=API_BASE] - Backend base URL
 * @returns {string}
 */
export const resolveAvatarUrl = (path, defaultUrl = '', apiBase = API_BASE) => {
  if (!path || !String(path).trim()) return defaultUrl;
  const pathStr = String(path).trim();
  if (pathStr.startsWith('http://') || pathStr.startsWith('https://') || pathStr.startsWith('//') || pathStr.startsWith('data:')) {
    return pathStr;
  }
  if (pathStr.startsWith('/avatars/') || pathStr.startsWith('/images/') || pathStr.startsWith('/demo-assets/') || pathStr.startsWith('avatars/')) {
    return pathStr.startsWith('/') ? pathStr : `/${pathStr}`;
  }
  if (apiBase && pathStr.startsWith(apiBase)) {
    return pathStr;
  }
  if (pathStr.startsWith('/media/') || pathStr.startsWith('/api/')) {
    return `${apiBase}${pathStr}`;
  }
  if (pathStr.startsWith('/')) {
    return pathStr;
  }
  return `${apiBase}/${pathStr}`;
};

export const resolveCustomImageUrl = (path, apiBase = API_BASE) => {
  if (!path || !String(path).trim()) return '';
  const pathStr = String(path).trim();
  if (pathStr.startsWith('data:') || pathStr.startsWith('http://') || pathStr.startsWith('https://') || pathStr.startsWith('//')) {
    return pathStr;
  }
  if (pathStr.startsWith('/avatars/') || pathStr.startsWith('/images/') || pathStr.startsWith('/demo-assets/') || pathStr.startsWith('avatars/')) {
    return pathStr.startsWith('/') ? pathStr : `/${pathStr}`;
  }
  if (pathStr.startsWith(apiBase)) {
    return pathStr;
  }
  if (pathStr.startsWith('/media/') || pathStr.startsWith('/api/')) {
    return `${apiBase}${pathStr}`;
  }
  if (pathStr.startsWith('/')) {
    return pathStr;
  }
  return `${apiBase}/${pathStr}`;
};

/**
 * Measures the natural dimensions of an image URL.
 * @param {string} url - Image URL
 * @returns {Promise<{width: number, height: number}>}
 */
export const checkImageResolution = (url) => {
  return new Promise((resolve) => {
    if (!url) {
      resolve({ width: 0, height: 0 });
      return;
    }
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = () => resolve({ width: 0, height: 0 });
    img.src = url;
  });
};

/**
 * Resolves original/hi-res image URL helper for people / poster media.
 */
export const getOriginalImageUrlHelper = (isPeople, item, mediaUrl, apiBase = API_BASE) => {
  const rawPath = isPeople ? getProfileImagePath(item) : getPosterImagePath(item);
  if (!rawPath) return mediaUrl || '';
  return resolveMediaImageUrl(rawPath, isPeople ? 'originalPerson' : 'originalPoster', apiBase);
};

export const resolveDetailsImageUrl = (path, apiBase = API_BASE, imageType = 'backdrop') => {
  return resolveMediaImageUrl(path, imageType, apiBase);
};

export const resolveGalleryImageUrl = (path, apiBase = API_BASE) => {
  if (!path) return '';
  const pathStr = String(path);
  if (pathStr.startsWith('http://') || pathStr.startsWith('https://') || pathStr.startsWith('//') || pathStr.startsWith('data:')) {
    return pathStr;
  }
  if (pathStr.startsWith('/media/') || pathStr.startsWith('/api/')) {
    return `${apiBase}${pathStr}`;
  }
  // Local filesystem path or archive path -> route through image proxy
  return buildImageProxyUrl(pathStr, { apiBase });
};


