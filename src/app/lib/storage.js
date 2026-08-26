/**
 * Safe wrapper around localStorage to prevent unhandled exceptions and unify JSON parsing/serialization.
 */

export const safeStorage = {
  getItem: (key, fallback = null) => {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? val : fallback;
    } catch (err) {
      console.error(`[Storage] Failed to getItem("${key}"):`, err);
      return fallback;
    }
  },

  setItem: (key, value) => {
    try {
      localStorage.setItem(key, String(value));
      return true;
    } catch (err) {
      console.error(`[Storage] Failed to setItem("${key}"):`, err);
      return false;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.error(`[Storage] Failed to removeItem("${key}"):`, err);
      return false;
    }
  },

  getJSON: (key, fallback = null) => {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch (err) {
      console.error(`[Storage] Failed to getJSON("${key}"):`, err);
      return fallback;
    }
  },

  setJSON: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error(`[Storage] Failed to setJSON("${key}"):`, err);
      return false;
    }
  },
};
