"use client";

import { useEffect } from "react";
import { getOrCreateSessionId, getReferrer, getUtmParams } from "@/lib/clientSession";

/** Fires one pageview beacon per visit so the dashboard can compute
 * page-view -> signup-start -> signup-complete conversion rates. */
export default function PageViewTracker() {
  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    const alreadySent = window.sessionStorage.getItem("heirloom_view_sent");
    if (alreadySent) return;

    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        path: window.location.pathname,
        utm: getUtmParams(),
        referrer: getReferrer(),
      }),
      keepalive: true,
    }).catch(() => {
      // best-effort analytics; never block the page on failure
    });

    window.sessionStorage.setItem("heirloom_view_sent", "1");
  }, []);

  return null;
}
