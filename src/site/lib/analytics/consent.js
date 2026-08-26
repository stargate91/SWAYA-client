export const COOKIE_CONSENT_KEY = 'swaya_consent_state';
export const CONSENT_CHANGE_EVENT = 'swaya:consent-change';

/**
 * Gets the current stored consent decision ('granted', 'denied', or null if unchosen).
 * @returns {'granted' | 'denied' | null}
 */
export function getStoredConsent() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    const val = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (val === 'granted' || val === 'denied') {
      return val;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Updates Google Consent Mode v2 and persists the user decision.
 * @param {'granted' | 'denied'} state
 */
export function updateConsentState(state) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, state);
    }
  } catch {
    // Storage access might be restricted in private browsing
  }

  // Update Google Consent Mode v2 in gtag
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('consent', 'update', {
        analytics_storage: state === 'granted' ? 'granted' : 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    } catch {
      // Safe catch
    }
  }

  // Notify listeners within the app
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: { state } }));
    } catch {
      // Safe catch
    }
  }
}
