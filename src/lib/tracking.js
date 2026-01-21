/**
 * Tracking utilities for Meta Pixel + Conversions API
 * Handles fbp/fbc persistence and event deduplication
 */

/**
 * Reads a cookie by name
 * @param {string} name - Cookie name
 * @returns {string|undefined} Cookie value or undefined
 */
function getCookie(name) {
  if (typeof document === 'undefined') return undefined;
  const m = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[2]) : undefined;
}

/**
 * Gets a URL query parameter
 * @param {string} key - Query parameter key
 * @returns {string|null} Query parameter value or null
 */
function getQueryParam(key) {
  if (typeof window === 'undefined') return null;
  try {
    return new URL(window.location.href).searchParams.get(key);
  } catch {
    return null;
  }
}

/**
 * Reads _fbp cookie with localStorage persistence fallback
 * Strategy: Cookie is source of truth, but we persist to localStorage as backup
 * @returns {string|undefined} fbp value or undefined
 */
export function readFbpPersisted() {
  // First, try to read from cookie (source of truth)
  const cookieFbp = getCookie("_fbp");
  
  if (cookieFbp) {
    // Persist to localStorage for future sessions
    try {
      localStorage.setItem("meta_fbp", cookieFbp);
    } catch (e) {
      // localStorage may be unavailable (private mode, quota exceeded)
      if (import.meta.env.DEV) {
        console.debug('[Tracking] Could not persist fbp to localStorage:', e);
      }
    }
    return cookieFbp;
  }
  
  // Fallback to localStorage if cookie doesn't exist
  try {
    const storedFbp = localStorage.getItem("meta_fbp");
    if (storedFbp) {
      return storedFbp;
    }
  } catch (e) {
    if (import.meta.env.DEV) {
      console.debug('[Tracking] Could not read fbp from localStorage:', e);
    }
  }
  
  return undefined;
}

/**
 * Reads _fbc cookie or builds from fbclid, with localStorage persistence
 * Strategy: Cookie is source of truth, but we persist constructed values
 * @returns {string|undefined} fbc value or undefined
 */
export function readOrBuildFbcPersisted() {
  // First, try to read from cookie (source of truth)
  const cookieFbc = getCookie("_fbc");
  
  if (cookieFbc) {
    // Persist to localStorage
    try {
      localStorage.setItem("meta_fbc", cookieFbc);
    } catch (e) {
      if (import.meta.env.DEV) {
        console.debug('[Tracking] Could not persist fbc to localStorage:', e);
      }
    }
    return cookieFbc;
  }
  
  // If no cookie, try to build from fbclid in URL
  const fbclid = getQueryParam("fbclid");
  if (fbclid) {
    const ts = Math.floor(Date.now() / 1000);
    const constructedFbc = `fb.1.${ts}.${fbclid}`;
    
    // Persist constructed value
    try {
      localStorage.setItem("meta_fbc", constructedFbc);
    } catch (e) {
      if (import.meta.env.DEV) {
        console.debug('[Tracking] Could not persist constructed fbc to localStorage:', e);
      }
    }
    return constructedFbc;
  }
  
  // Fallback to localStorage if nothing else available
  try {
    const storedFbc = localStorage.getItem("meta_fbc");
    if (storedFbc) {
      return storedFbc;
    }
  } catch (e) {
    if (import.meta.env.DEV) {
      console.debug('[Tracking] Could not read fbc from localStorage:', e);
    }
  }
  
  return undefined;
}

/**
 * Generates a unique event ID for deduplication
 * Format: SCHEDULE::<timestamp>::<random>
 * @returns {string} Event ID
 */
export function genEventId() {
  return `SCHEDULE::${Date.now()}::${Math.floor(Math.random() * 1e6)}`;
}

/**
 * Reads Meta ad parameters from URL or sessionStorage
 * @returns {object} Object with ad_id, adset_id, campaign_id (if available)
 */
export function readAdParams() {
  const KEYS = ["ad_id", "adset_id", "campaign_id"];
  const out = {};
  let url = null;
  
  try {
    url = new URL(window.location.href);
  } catch {
    // Ignore
  }

  KEYS.forEach((k) => {
    const v =
      (url ? url.searchParams.get(k) : null) ||
      (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(`meta_${k}`) : null) ||
      undefined;
    if (v) {
      out[k] = v;
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(`meta_${k}`, v);
      }
    }
  });
  
  return out;
}

/**
 * Builds metadata object for Meta CAPI events
 * Uses persisted fbp/fbc functions to maximize match rate
 * @returns {object} Metadata with eid, ref_url, fbp, fbc, ad params
 */
export function buildMetadata() {
  // Use persisted functions to maximize fbp/fbc availability
  const fbp = readFbpPersisted();
  const fbc = readOrBuildFbcPersisted();
  
  // Generate or retrieve stable event ID for this session
  // Store in sessionStorage to maintain consistency during the scheduling flow
  let eid;
  if (typeof sessionStorage !== 'undefined') {
    eid = sessionStorage.getItem("schedule_event_id") || genEventId();
    sessionStorage.setItem("schedule_event_id", eid);
  } else {
    eid = genEventId();
  }

  const adp = readAdParams();

  // Build reference URL (event_source_url for CAPI)
  let ref_url = "";
  try {
    const u = new URL(window.location.href);
    ref_url = `${u.origin}${u.pathname}`;
  } catch {
    ref_url = window.location.href;
  }

  // Log missing fbp/fbc in dev mode for diagnostics
  if (import.meta.env.DEV) {
    if (!fbp) {
      console.debug('[Tracking] fbp missing - may reduce match rate');
    }
    if (!fbc) {
      console.debug('[Tracking] fbc missing - may reduce match rate');
    }
  }

  const metadata = {
    eid,
    source: "web_landing",
    ref_url,
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {}),
    ...(adp.ad_id ? { ad_id: adp.ad_id } : {}),
    ...(adp.adset_id ? { adset_id: adp.adset_id } : {}),
    ...(adp.campaign_id ? { campaign_id: adp.campaign_id } : {}),
  };

  return metadata;
}
