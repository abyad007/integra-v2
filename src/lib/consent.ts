/**
 * Consent storage utility (CNIL-compliant).
 *
 * Stores granular consent in localStorage under a single JSON key.
 * Other parts of the app (analytics, marketing tags) consume `hasConsent(category)`
 * before initializing trackers.
 *
 * Categories:
 *   - "necessary"  : always granted (legal basis: legitimate interest)
 *   - "analytics"  : user must opt in (Plausible, GA4, etc.)
 *   - "marketing"  : user must opt in (retargeting, ads, etc.)
 */

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO date of the last user decision */
  updatedAt: string;
  /** Version of the policy when the decision was made (bump to re-prompt all users) */
  version: number;
};

const STORAGE_KEY = "integra_consent_v1";
const CURRENT_VERSION = 1;

const DEFAULT_NEEDS_PROMPT: Omit<ConsentState, "necessary" | "version" | "updatedAt"> = {
  analytics: false,
  marketing: false,
};

/** Read current consent (or null if user hasn't decided yet) */
export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CURRENT_VERSION) return null; // re-prompt if policy bumped
    return parsed;
  } catch {
    return null;
  }
}

/** Save user's choice */
export function setConsent(partial: { analytics: boolean; marketing: boolean }) {
  if (typeof window === "undefined") return;
  const state: ConsentState = {
    necessary: true,
    analytics: partial.analytics,
    marketing: partial.marketing,
    updatedAt: new Date().toISOString(),
    version: CURRENT_VERSION,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Notify any listeners (analytics modules, etc.)
    window.dispatchEvent(new CustomEvent("integra:consent-change", { detail: state }));
  } catch {
    // Storage might be unavailable (private mode) — ignore silently
  }
}

/** Convenience: accept-all helper for the banner CTA */
export function acceptAll() {
  setConsent({ analytics: true, marketing: true });
}

/** Convenience: reject-all helper (keeps only "necessary") */
export function rejectAll() {
  setConsent({ analytics: false, marketing: false });
}

/** Returns true if the user has granted consent for the given category. */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  const state = getConsent();
  if (!state) return false;
  return state[category];
}

/** Returns true if the user hasn't yet made a decision (and the banner should be shown). */
export function needsConsentPrompt(): boolean {
  return getConsent() === null;
}

export { DEFAULT_NEEDS_PROMPT };
