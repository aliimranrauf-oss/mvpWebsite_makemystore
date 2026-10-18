"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { content, effectiveLevel, gbp, priceFor, type Lang, type LevelId } from "@/lib/cv-data";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LEVELS: LevelId[] = ["entry", "professional", "senior", "executive"];
const CURRENCIES = ["SAR", "AED", "QAR", "KWD", "USD", "GBP"];

const field =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-mint";

export default function CvOrderForm({ lang = "en" }: { lang?: Lang }) {
  const t = content[lang].form;
  const packages = content[lang].packages.items;
  const enPackages = content.en.packages.items;

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pkg, setPkg] = useState("complete");
  const [level, setLevel] = useState<LevelId>("professional");
  const selectedPkg = packages.find((p) => p.id === pkg);
  // Where this lead came from: the card the visitor clicked (or the ?package= link).
  const [origin, setOrigin] = useState<{ type: "card" | "link"; pkg: string; level?: string } | null>(null);

  // Package cards carry data-package="<id>". Clicking one preselects it here.
  useEffect(() => {
    const valid = new Set(enPackages.map((p) => p.id));
    const fromUrl = new URLSearchParams(window.location.search).get("package");
    if (fromUrl && valid.has(fromUrl)) {
      setPkg(fromUrl);
      setOrigin({ type: "link", pkg: fromUrl });
    }

    const fromUrlLevel = new URLSearchParams(window.location.search).get("level");
    if (fromUrlLevel && LEVELS.includes(fromUrlLevel as LevelId)) setLevel(fromUrlLevel as LevelId);

    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-package]");
      const id = el?.dataset.package;
      if (id && valid.has(id)) setPkg(id);
      const lv = el?.dataset.level;
      if (lv && LEVELS.includes(lv as LevelId)) setLevel(lv as LevelId);
      if (id && valid.has(id)) {
        setOrigin({ type: "card", pkg: id, level: lv && LEVELS.includes(lv as LevelId) ? lv : undefined });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enPackages]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) || "").trim();

    const name = get("name");
    const email = get("email");
    const targetRole = get("targetRole");

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = t.errName;
    if (!email) nextErrors.email = t.errEmail;
    else if (!EMAIL_RE.test(email)) nextErrors.email = t.errEmailInvalid;
    if (!targetRole) nextErrors.targetRole = t.errRole;

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setStatus("submitting");

    // The message saved to Supabase is always in English (option values are
    // English) so it's easy for you to read, plus a line noting the site language.
    const selected = enPackages.find((p) => p.id === pkg);
    const billedLevel = selected ? effectiveLevel(selected, level) : level;
    const enLevel = content.en.form.levels.find((l) => l.value === level)?.label ?? level;
    const fixedPrice = selected ? gbp(priceFor(selected, level)) : "-";
    // Source tag saved in leads.source, e.g. "cv-card:all-in-one" or "cv-card:complete:executive"
    const source = origin
      ? `cv-${origin.type}:${origin.pkg}${origin.level ? `:${origin.level}` : ""}`
      : "cv-form";
    const originPkg = enPackages.find((p) => p.id === origin?.pkg);
    const originText = origin
      ? `${origin.type === "card" ? "Clicked the" : "Opened a link for the"} "${originPkg?.name ?? origin.pkg}" ${origin.type === "card" ? "card" : "package"}${origin.level ? ` (${origin.level} level)` : ""}${originPkg?.badge ? ` [${originPkg.badge}]` : ""}`
      : "Used the order form directly (no card clicked)";
    const lines = [
      `CV SERVICES ORDER`,
      `Lead origin: ${originText}`,
      `Package: ${selected?.name ?? pkg}`,
      `Career level: ${enLevel}${billedLevel !== level ? ` (billed at ${billedLevel})` : ""}`,
      `Fixed price shown to customer: ${fixedPrice} GBP`,
      `Country targeted: ${get("country") || "-"}`,
      `Target role / industry: ${targetRole}`,
      `Deadline: ${get("deadline") || "-"}`,
      `Preferred currency: ${get("currency") || "-"}`,
      `Wants samples: ${data.get("samples") ? "Yes" : "No"}`,
      `Customer browsed site in: ${lang === "ar" ? "Arabic" : "English"}`,
      `Notes: ${get("notes") || "-"}`,
    ];

    const payload = {
      name,
      email,
      phone: get("phone"),
      service: "cv-writing",
      source,
      budget: selected ? `${selected.name} - ${fixedPrice}` : "",
      message: lines.join("\n"),
      company_website: String(data.get("company_website") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({ success: false }));

      if (!res.ok || !json.success) {
        setStatus("error");
        setErrorMessage(lang === "ar" ? t.errGeneric : json.error || t.errGeneric);
        return;
      }

      // Tell GTM a lead was submitted (used as the Google Ads conversion trigger)
      try {
        const w = window as unknown as { dataLayer?: unknown[] };
        (w.dataLayer = w.dataLayer || []).push({ event: "generate_lead", form_name: "cv_order" });
      } catch {}
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(t.errNetwork);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl2 border border-border bg-surface p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mint/10 text-mint">
          <CheckCircle2 size={24} />
        </span>
        <h3 className="font-display text-xl font-semibold text-ink">{t.successTitle}</h3>
        <p className="max-w-[44ch] text-sm leading-relaxed text-muted">{t.successBody}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-mint hover:underline"
        >
          {t.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from real users, catches basic bots */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="company_website">Company Website</label>
        <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="package" className="mb-1.5 block text-sm font-medium text-ink">
          {t.package}
        </label>
        <select id="package" name="package" value={pkg} onChange={(e) => setPkg(e.target.value)} className={field}>
          {packages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            {t.name} <span className="text-mint">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={field} />
          {fieldErrors.name && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            {t.email} <span className="text-mint">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            required
            autoComplete="email"
            className={`${field} ${lang === "ar" ? "text-right" : ""}`}
          />
          {fieldErrors.email && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.email}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            {t.phone} <span className="text-muted">{t.phoneHint}</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            placeholder="+966 5X XXX XXXX"
            className={`${field} ${lang === "ar" ? "text-right" : ""}`}
          />
        </div>
        <div>
          <label htmlFor="country" className="mb-1.5 block text-sm font-medium text-ink">
            {t.country}
          </label>
          <select id="country" name="country" defaultValue="Saudi Arabia" className={field}>
            {t.countries.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="level" className="mb-1.5 block text-sm font-medium text-ink">
            {t.level}
          </label>
          <select id="level" name="level" value={level} onChange={(e) => setLevel(e.target.value as LevelId)} className={field}>
            {t.levels.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="deadline" className="mb-1.5 block text-sm font-medium text-ink">
            {t.deadline}
          </label>
          <select id="deadline" name="deadline" defaultValue="No rush" className={field}>
            {t.deadlines.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedPkg && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-mint/30 bg-mint/5 px-4 py-3">
          <div>
            <p className="text-xs font-medium text-muted">{t.yourPrice}</p>
            <p className="text-sm text-ink">
              {selectedPkg.name}
              {" · "}
              {t.levels.find((l) => l.value === effectiveLevel(selectedPkg, level))?.label}
            </p>
            {effectiveLevel(selectedPkg, level) !== level && (
              <p className="mt-1 text-xs text-muted">{t.levelAdjusted}</p>
            )}
          </div>
          <p className="font-display text-2xl font-semibold text-ink" aria-live="polite">
            <bdi>{gbp(priceFor(selectedPkg, level))}</bdi>
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="targetRole" className="mb-1.5 block text-sm font-medium text-ink">
            {t.role} <span className="text-mint">*</span>
          </label>
          <input id="targetRole" name="targetRole" type="text" placeholder={t.rolePlaceholder} className={field} />
          {fieldErrors.targetRole && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.targetRole}</p>}
        </div>
        <div>
          <label htmlFor="currency" className="mb-1.5 block text-sm font-medium text-ink">
            {t.currency} <span className="text-muted">{t.optional}</span>
          </label>
          <select id="currency" name="currency" defaultValue="" className={field}>
            <option value="">{t.noPreference}</option>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-ink">
          {t.notes} <span className="text-muted">{t.optional}</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder={t.notesPlaceholder}
          className={`${field} resize-none`}
        />
      </div>

      <label className="flex items-center gap-2.5 text-sm text-muted">
        <input type="checkbox" name="samples" className="h-4 w-4 accent-[#2E9E48]" />
        {t.samples}
      </label>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" && <Loader2 size={16} className="animate-spin" />}
        {status === "submitting" ? t.sending : t.submit}
      </button>
      <p className="text-xs text-muted">{t.note} {t.fixedPriceNote}</p>
    </form>
  );
}
