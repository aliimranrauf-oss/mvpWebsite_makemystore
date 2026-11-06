"use client";

import { useState } from "react";

/**
 * Click-to-load YouTube embed ("facade").
 *
 * Why: a normal <iframe> pulls ~0.5-1 MB of YouTube JavaScript on page load and
 * hurts Lighthouse (TBT, LCP, unused JS). This renders a lightweight thumbnail and
 * only mounts the real player when the visitor taps play.
 *
 *  - SSR renders a plain link to YouTube, so it works without JavaScript.
 *  - The aspect-ratio box is fixed, so nothing shifts (CLS = 0).
 *  - Uses youtube-nocookie.com, so YouTube sets no cookies until playback starts.
 */
export default function YouTubeFacade({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://youtu.be/${videoId}`;

  // Warm up the connection just before the click so playback starts faster.
  function warm() {
    if (typeof document === "undefined") return;
    for (const href of ["https://www.youtube-nocookie.com", "https://i.ytimg.com"]) {
      if (document.head.querySelector(`link[rel="preconnect"][href="${href}"]`)) continue;
      const l = document.createElement("link");
      l.rel = "preconnect";
      l.href = href;
      document.head.appendChild(l);
    }
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl2 border border-border bg-ink shadow-lg">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Play video: ${title}`}
          onClick={(e) => {
            e.preventDefault();
            setPlaying(true);
          }}
          onPointerEnter={warm}
          onFocus={warm}
          onTouchStart={warm}
          className="group absolute inset-0 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            width={480}
            height={360}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" aria-hidden="true" />
          <span
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-mint text-white shadow-xl transition-transform group-hover:scale-110 sm:h-20 sm:w-20"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 sm:h-9 sm:w-9" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </a>
      )}
    </div>
  );
}
