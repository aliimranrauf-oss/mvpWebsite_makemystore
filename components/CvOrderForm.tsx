"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { cvPackages } from "@/lib/cv-data";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const countries = [
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Other",
];

const levels = [
  "Graduate / entry level",
  "Mid-level professional",
  "Senior / manager",
  "Executive / C-level",
  "Academic / researcher",
];

const deadlines = ["No rush", "Within 1 week", "Within 3 days", "Urgent (24–48 hrs)"];

const field =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-mint";

export default function CvOrderForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pkg, setPkg] = useState(cvPackages[2].id);

  // Package cards elsewhere on the page carry data-package="<id>". Clicking one
  // preselects it here, then the browser scrolls to #order as normal.
  useEffect(() => {
    const valid = new Set(cvPackages.map((p) => p.id));
    const fromUrl = new URLSearchParams(window.location.search).get("package");
    if (fromUrl && valid.has(fromUrl)) setPkg(fromUrl);

    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-package]");
      const id = el?.dataset.package;
      if (id && valid.has(id)) setPkg(id);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

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
    if (!name) nextErrors.name = "Name is required.";
    if (!email) nextErrors.email = "Email is required.";
    else if (!EMAIL_RE.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!targetRole) nextErrors.targetRole = "Tell us the role or industry you are targeting.";

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setStatus("submitting");

    const selected = cvPackages.find((p) => p.id === pkg);
    const lines = [
      `CV SERVICES ORDER ENQUIRY`,
      `Package: ${selected?.name ?? pkg}`,
      `Country targeted: ${get("country") || "-"}`,
      `Career level: ${get("level") || "-"}`,
      `Target role / industry: ${targetRole}`,
      `Deadline: ${get("deadline") || "-"}`,
      `Preferred currency: ${get("currency") || "-"}`,
      `Wants samples: ${data.get("samples") ? "Yes" : "No"}`,
      `Notes: ${get("notes") || "-"}`,
    ];

    const payload = {
      name,
      email,
      phone: get("phone"),
      service: "cv-writing",
      budget: selected?.name ?? "",
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
        setErrorMessage(json.error || "Something went wrong. Please try again.");
        if (json.fieldErrors) setFieldErrors(json.fieldErrors);
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error — please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl2 border border-border bg-surface p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mint/10 text-mint">
          <CheckCircle2 size={24} />
        </span>
        <h3 className="font-display text-xl font-semibold text-ink">Request received</h3>
        <p className="max-w-[44ch] text-sm leading-relaxed text-muted">
          Thank you. We will email you within 24 hours with your exact price and timeline.
          You can also reply with your current CV to speed things up.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-mint hover:underline"
        >
          Submit another request
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
          Package
        </label>
        <select
          id="package"
          name="package"
          value={pkg}
          onChange={(e) => setPkg(e.target.value)}
          className={field}
        >
          {cvPackages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Full name <span className="text-mint">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={field} />
          {fieldErrors.name && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email <span className="text-mint">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
          {fieldErrors.email && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.email}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            WhatsApp / phone <span className="text-muted">(with country code)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+966 5X XXX XXXX"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="country" className="mb-1.5 block text-sm font-medium text-ink">
            Country you are applying in
          </label>
          <select id="country" name="country" defaultValue="Saudi Arabia" className={field}>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="level" className="mb-1.5 block text-sm font-medium text-ink">
            Career level
          </label>
          <select id="level" name="level" defaultValue={levels[1]} className={field}>
            {levels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="deadline" className="mb-1.5 block text-sm font-medium text-ink">
            When do you need it?
          </label>
          <select id="deadline" name="deadline" defaultValue={deadlines[0]} className={field}>
            {deadlines.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="targetRole" className="mb-1.5 block text-sm font-medium text-ink">
            Target role / industry <span className="text-mint">*</span>
          </label>
          <input
            id="targetRole"
            name="targetRole"
            type="text"
            placeholder="e.g. Project Manager, Oil & Gas"
            className={field}
          />
          {fieldErrors.targetRole && (
            <p className="mt-1.5 text-xs text-red-600">{fieldErrors.targetRole}</p>
          )}
        </div>
        <div>
          <label htmlFor="currency" className="mb-1.5 block text-sm font-medium text-ink">
            Preferred currency <span className="text-muted">(optional)</span>
          </label>
          <select id="currency" name="currency" defaultValue="" className={field}>
            <option value="">No preference</option>
            <option value="SAR">SAR</option>
            <option value="AED">AED</option>
            <option value="QAR">QAR</option>
            <option value="KWD">KWD</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-ink">
          Anything else? <span className="text-muted">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Job link, specific requirements, or career goals..."
          className={`${field} resize-none`}
        />
      </div>

      <label className="flex items-center gap-2.5 text-sm text-muted">
        <input type="checkbox" name="samples" className="h-4 w-4 accent-[#2E9E48]" />
        Send me CV samples for my industry
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
        {status === "submitting" ? "Sending..." : "Get my exact price"}
      </button>
      <p className="text-xs text-muted">No payment now. You will get a fixed quote by email first.</p>
    </form>
  );
}
