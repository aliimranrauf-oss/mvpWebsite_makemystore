"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { services } from "@/lib/data";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const budgetOptions = [
  "Not sure yet",
  "Under $250",
  "$250–$750",
  "$750–$2,000",
  "$2,000+",
];

export default function ContactForm({
  defaultService = "other",
  defaultMessage = "",
}: {
  defaultService?: string;
  defaultMessage?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Name is required.";
    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_RE.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!message) nextErrors.message = "Message is required.";

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setStatus("submitting");

    const payload = {
      name,
      email,
      phone: String(data.get("phone") || "").trim(),
      service: String(data.get("service") || "other"),
      budget: String(data.get("budget") || "").trim(),
      message,
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
        setErrorMessage(
          json.error || "Something went wrong sending your message. Please try again."
        );
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
        <h3 className="font-display text-xl font-semibold text-ink">
          Message sent
        </h3>
        <p className="max-w-[40ch] text-sm leading-relaxed text-muted">
          Thanks — we&apos;ll get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-mint hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot field — hidden from real users via CSS, catches basic bots */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="company_website">Company Website</label>
        <input
          type="text"
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Name <span className="text-mint">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-mint"
          />
          {fieldErrors.name && (
            <p className="mt-1.5 text-xs text-red-600">{fieldErrors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email <span className="text-mint">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-mint"
          />
          {fieldErrors.email && (
            <p className="mt-1.5 text-xs text-red-600">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            Phone <span className="text-muted">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            autoComplete="tel"
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-mint"
          />
        </div>

        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-ink">
            Service interested in
          </label>
          <select
            id="service"
            name="service"
            defaultValue={defaultService}
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-mint"
          >
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
            <option value="other">Something else</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-ink">
          Budget range <span className="text-muted">(optional)</span>
        </label>
        <select
          id="budget"
          name="budget"
          defaultValue=""
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-mint"
        >
          <option value="" disabled>
            Select a range
          </option>
          {budgetOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Message <span className="text-mint">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          defaultValue={defaultMessage}
          required
          rows={5}
          placeholder="Tell us what you're trying to build or fix..."
          className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-mint"
        />
        {fieldErrors.message && (
          <p className="mt-1.5 text-xs text-red-600">{fieldErrors.message}</p>
        )}
      </div>

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
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
