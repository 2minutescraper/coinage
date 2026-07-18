"use client";

import type { UtmParams } from "./types";

const SESSION_ID_KEY = "heirloom_session_id";
const UTM_KEY = "heirloom_utm";

export function getOrCreateSessionId(): string {
  const existing = window.sessionStorage.getItem(SESSION_ID_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  window.sessionStorage.setItem(SESSION_ID_KEY, id);
  return id;
}

/** Captures utm_* query params once per visit and caches them so later steps
 * (which may run after the user has scrolled/navigated) keep the same
 * attribution even if the query string is gone from the URL bar by then. */
export function getUtmParams(): UtmParams {
  const cached = window.sessionStorage.getItem(UTM_KEY);
  if (cached) {
    try {
      return JSON.parse(cached) as UtmParams;
    } catch {
      // fall through and re-derive
    }
  }

  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {
    source: params.get("utm_source") ?? undefined,
    medium: params.get("utm_medium") ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
    content: params.get("utm_content") ?? undefined,
    term: params.get("utm_term") ?? undefined,
  };
  window.sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
  return utm;
}

export function getReferrer(): string | undefined {
  return document.referrer || undefined;
}
