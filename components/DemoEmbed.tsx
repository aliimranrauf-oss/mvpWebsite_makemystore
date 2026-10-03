"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Monitor, Smartphone, Download } from "lucide-react";

const DEFAULT_DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL ?? "https://demo.makemystore.online";

type Device = "unknown" | "desktop" | "mobile";

function detectDevice(): Device {
  const ua = navigator.userAgent;
  const mobileUa = /android|iphone|ipod|ipad|mobile/i.test(ua);
  // iPadOS reports as a Mac, so also treat touch-only wide screens as mobile
  const ipadOs = /macintosh/i.test(ua) && navigator.maxTouchPoints > 1;
  return mobileUa || ipadOs || window.innerWidth < 900 ? "mobile" : "desktop";
}

export default function DemoEmbed({
  demoUrl = DEFAULT_DEMO_URL,
  title = "Live POS demo",
}: {
  demoUrl?: string;
  title?: string;
}) {
  const [device, setDevice] = useState<Device>("unknown");

  useEffect(() => {
    setDevice(detectDevice());
  }, []);

  const isIos = typeof navigator !== "undefined" && /iphone|ipad|ipod/i.test(navigator.userAgent);

  // Desktop: the demo runs inside the page. Click "Log in to demo" inside the frame, nothing to type.
  if (device === "desktop") {
    return (
      <div className="overflow-hidden rounded-xl2 border border-border bg-surface shadow-lg">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
            <Monitor size={16} className="text-mint" /> Live demo: desktop app
          </span>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-mint"
          >
            Open full screen <ExternalLink size={14} />
          </a>
        </div>
        <iframe
          src={`${demoUrl}/demo-start`}
          title={title}
          loading="lazy"
          allow="clipboard-write; microphone; fullscreen"
          className="block h-[640px] w-full bg-white lg:h-[720px]"
        />
      </div>
    );
  }

  // Mobile: no iframe. Open the real app full screen so the browser can offer "Install app".
  if (device === "mobile") {
    return (
      <div className="mx-auto max-w-sm rounded-xl2 card-glow-border p-6 text-center">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-lg bg-mint/10 text-mint">
          <Smartphone size={22} />
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold text-ink">Try it as an app</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Open the demo, tap Log in, then install it to your home screen. It works like a normal app, even offline.
        </p>
        <a
          href={demoUrl}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white"
        >
          Open demo app <ExternalLink size={16} />
        </a>
        <p className="mt-4 flex items-start justify-center gap-2 text-left text-xs leading-relaxed text-muted">
          <Download size={14} className="mt-0.5 shrink-0 text-mint" />
          {isIos
            ? "iPhone/iPad: tap the Share icon in Safari, then Add to Home Screen."
            : "Android: tap Install app on the demo page, or the browser menu, then Install app."}
        </p>
      </div>
    );
  }

  // Before detection finishes: reserve space so the page doesn't jump
  return <div className="h-[320px] rounded-xl2 border border-border bg-surface/40" aria-hidden="true" />;
}
