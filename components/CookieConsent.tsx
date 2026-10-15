"use client";

import { useEffect, useState } from "react";

const KEY = "mms_consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Minimal cookie/analytics consent bar (Google Consent Mode v2).
 * layout.tsx sets analytics_storage to "denied" by default; this updates it to
 * "granted" only if the visitor accepts, and remembers the choice.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(value: "granted" | "denied") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* storage unavailable: choice just won't persist */
    }
    window.gtag?.("consent", "update", { analytics_storage: value });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-xl border border-border bg-surface p-4 shadow-lg sm:p-5"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <p className="text-sm leading-relaxed text-muted">
        We use analytics cookies to understand how the site is used. They stay off unless you accept.{" "}
        <a href="/privacy" className="font-medium text-mint underline underline-offset-2">
          Privacy policy
        </a>
      </p>
      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-full bg-mint px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
