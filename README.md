# makemystore.online — Homepage

Next.js (App Router) + Tailwind CSS. Dark theme, mint green + cyan accents.
This build covers the **homepage only** — the dedicated Chatbot / SaaS MVP /
Project Rescue / Contact pages come next.

## Repo map

```
makemystore/
├── app/
│   ├── layout.tsx        Root layout: fonts, SEO metadata, favicon/OG tags
│   ├── page.tsx           Homepage — assembles all sections below
│   ├── globals.css        Tailwind base + focus states + reduced-motion rules
│   ├── robots.ts          /robots.txt (auto-generated route)
│   └── sitemap.ts         /sitemap.xml (auto-generated route)
├── components/
│   ├── Navbar.tsx          Sticky nav + mobile menu
│   ├── Hero.tsx            Hero section (headline, CTA, coded dashboard visual)
│   ├── ServiceCards.tsx    3 service cards: Chatbot / SaaS MVP / Project Rescue
│   ├── Benefits.tsx        "What You Get" 6-item grid
│   ├── TechStack.tsx       Tech logos/names strip
│   ├── Pricing.tsx         Pricing — grouped by all 3 services
│   ├── HowItWorks.tsx      4-step process
│   ├── Trust.tsx           Ownership / no lock-in section
│   ├── FAQ.tsx             Accordion FAQ (native <details>, no JS needed)
│   ├── FinalCTA.tsx        Closing CTA + email (id="contact")
│   └── Footer.tsx          Footer nav + email
├── lib/
│   ├── constants.ts        SITE_URL, CONTACT_EMAIL, nav links — site-wide values
│   └── data.ts             Services, pricing tiers, FAQs, steps, benefits —
│                            shared content so future pages don't duplicate it
├── public/
│   ├── favicon.svg         ✅ already included (modern browsers)
│   └── images/             ⬅ you add files here (see checklist below)
├── tailwind.config.ts       Color tokens (bg/surface/ink/mint/cyan), fonts
├── next.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
└── .gitignore               Keeps node_modules/.next out of your repo
```

`lib/data.ts` is the important one going forward: when we build the dedicated
Chatbot, SaaS MVP, and Project Rescue pages, they'll import their pricing
tiers and copy straight from here instead of duplicating it — so updating a
price in one place updates it everywhere it's shown.

## Run it locally

```
npm install
npm run dev
```

Open http://localhost:3000

## Push to your GitHub (manual, no CLI needed)

1. Create a new empty repo on GitHub (no README/gitignore — this project
   already has them).
2. On your machine: unzip this project, then either use GitHub Desktop to
   publish the folder, or drag the files into the repo via GitHub's web
   uploader. `node_modules` and `.next` are excluded by `.gitignore` — don't
   upload them.

## Deploy to Vercel

1. Import the GitHub repo in Vercel.
2. Framework preset: Next.js (auto-detected). No environment variables are
   needed for this homepage yet.
3. Deploy. Every push to `main` will auto-redeploy.

## Images to create (public/images/ + public/)

The hero section is fully coded (no image needed to look right). These are
the image files still worth creating:

| File | Path | Size | What it should be |
|---|---|---|---|
| Favicon (fallback) | `public/favicon.ico` | 48×48 (multi-size ico) | Same mark as `favicon.svg` — a simple "M" or bag icon, mint green on dark, or transparent background |
| Apple touch icon | `public/apple-touch-icon.png` | 180×180 | Same logo mark, solid dark background (transparent won't render well on iOS) |
| Open Graph / social share image | `public/images/og-image.png` | 1200×630 | What shows when the link is shared on WhatsApp/X/LinkedIn: dark background, your logo, the headline text, maybe a mini version of the dashboard mockup |
| Portfolio/demo shots (later) | `public/images/portfolio-*.png` | 1600×1000 (16:10) | Screenshots once you have real chatbot/MVP examples to show — used on a future Portfolio section |

Keep every image on the same dark background (`#070B10`) with mint (`#3CE29A`)
or cyan (`#37D0E8`) accents so nothing looks inconsistent when it's added.

## Performance notes (for Lighthouse)

- Fonts load via `next/font` (self-hosted at build time, no render-blocking
  Google Fonts request).
- No client JS beyond the mobile-menu toggle and the FAQ accordion (which
  uses native `<details>`, not JS).
- Hero visual is coded in CSS/SVG, not an image — nothing to optimize or
  lazy-load there.
- When you add real images to `public/images/`, use Next's `<Image />`
  component (not a plain `<img>`) so they're automatically resized and
  lazy-loaded — ask when you're ready to wire those in.

## AI chatbots (Gemini)

Both chatbots run on **Gemini 3.5 Flash-Lite** through one shared helper (`lib/gemini.ts`):

- Site chat widget: `app/api/chat/route.ts`
- Live demo on `/ai-chatbot`: `app/api/demo-chat/route.ts`

Environment variables (Vercel → Project → Settings → Environment Variables):

| Name | Required | Notes |
| --- | --- | --- |
| `GEMINI_API_KEY` | Yes | From https://aistudio.google.com/apikey. Mark it **Sensitive** in Vercel. |
| `GEMINI_MODEL` | No | Switch both bots, e.g. `gemini-3.8-flash`. Defaults to `gemini-3.5-flash-lite`. |
| `DEMO_CHAT_MODEL` | No | Override the model for the `/ai-chatbot` demo only. |
| `DEMO_IP_MAX` / `DEMO_DAILY_MAX` | No | Demo limits: per visitor per hour (default 100) / whole site per day (default 1000). |
| `CHAT_IP_MAX` / `CHAT_DAILY_MAX` | No | Widget limits: per visitor per hour (default 40) / whole site per day (default 400). |

After adding or changing a variable, **redeploy** — running deployments don't pick up new values.
