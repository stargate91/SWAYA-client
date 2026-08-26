import { safeStorage } from './storage';
import { getSavedPlayerAudioState } from './playerAudio';

/**
 * Checks if the application is running inside an Electron environment.
 */
export const getIsElectron = () => typeof window !== 'undefined' && !!window?.electronAPI;
export const isElectron = getIsElectron();

/**
 * Electron webUtils wrapper for secure file path extraction.
 */
export const webUtils = {
  getPathForFile: (file) => (getIsElectron() ? window.electronAPI.getPathForFile(file) : null),
};

/**
 * Electron shell wrapper for external URL opening.
 */
export const shell = {
  openExternal: (url) => (getIsElectron() ? window.electronAPI.openExternal(url) : null),
};

/**
 * Opens an external URL in the default browser (Electron shell or web window.open).
 */
export const openExternalLink = (url) => {
  if (getIsElectron()) {
    window.electronAPI.openExternal(url);
  } else if (typeof window !== 'undefined') {
    if (typeof url === 'string' && url.startsWith('mailto:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
};

/**
 * Retrieves the API authorization token from Electron environment or storage/URL.
 */
export const getApiToken = () => {
  if (getIsElectron()) return window.electronAPI.getApiToken();
  if (typeof window === 'undefined') return '';
  const urlParams = new URLSearchParams(window.location?.search || '');
  const token = urlParams.get('api_token') || safeStorage.getItem('api_token', '') || '';
  if (token) {
    safeStorage.setItem('api_token', token);
  }
  return token;
};

/**
 * Sends a one-way IPC message to the main process.
 */
export function sendIpc(channel, ...args) {
  if (getIsElectron()) {
    window.electronAPI.send(channel, ...args);
  }
}

/**
 * Invokes an IPC channel asynchronously and returns the response.
 */
export async function invokeIpc(channel, ...args) {
  if (getIsElectron()) {
    try {
      return await window.electronAPI.invoke(channel, ...args);
    } catch (err) {
      console.error(`[IPC Invoke Error] Channel "${channel}":`, err);
      throw err;
    }
  }
  return null;
}

/**
 * Registers an IPC event listener. Returns an unsubscribe cleanup function.
 */
export function onIpc(channel, listener) {
  if (!getIsElectron()) {
    return () => {};
  }
  return window.electronAPI.on(channel, listener);
}

/**
 * Sends a window management event to the Electron main process.
 */
export const sendWindowEvent = (channel) => {
  sendIpc(channel);
};

/**
 * Opens native folder selection dialog.
 */
export const selectFolder = async (defaultPath) => {
  return await invokeIpc('select-folder', defaultPath);
};

/**
 * Opens native file selection dialog.
 */
export const selectFile = async (defaultPath) => {
  return await invokeIpc('select-file', defaultPath);
};

/**
 * Highlights a file in the native file manager (Explorer/Finder).
 */
export const showItemInFolder = async (filePath) => {
  if (!isElectron) {
    return { success: false, error: 'Unavailable outside Electron' };
  }
  return await invokeIpc('show-item-in-folder', filePath);
};

/**
 * Launches MPV in native fullscreen playback mode.
 */
export const openMpvFullscreen = async ({ itemId, start, volume, mute, ...rest } = {}) => {
  const audioState = getSavedPlayerAudioState();
  return await invokeIpc('mpv-open-fullscreen', {
    itemId,
    start,
    volume: volume !== undefined ? volume : audioState.volume,
    mute: mute !== undefined ? mute : audioState.mute,
    ...rest,
  });
};
