"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitReview, type SubmitReviewState } from "@/app/reviews/actions";
import { REVIEW_SERVICES } from "@/lib/reviews";

const initialState: SubmitReviewState = { status: "idle" };
const inputCls =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-mint";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60 sm:w-auto"
    >
      {pending && <Loader2 size={16} className="animate-spin" />}
      {pending ? "Submitting…" : "Submit review"}
    </button>
  );
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-mint"> *</span>}
        {hint && <span className="ml-1.5 font-normal text-muted">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

export default function ReviewForm() {
  const [state, formAction] = useFormState(submitReview, initialState);
  // Set on the client after mount so the timestamp is the real render time
  // (not a stale value baked into cached HTML).
  const [renderedAt, setRenderedAt] = useState("");
  useEffect(() => setRenderedAt(String(Date.now())), []);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl2 border border-border bg-surface p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mint/10 text-mint">
          <CheckCircle2 size={24} />
        </span>
        <h3 className="font-display text-xl font-semibold text-ink">Thank you!</h3>
        <p className="max-w-[40ch] text-sm leading-relaxed text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Honeypot, hidden from real users */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="hp_field_9k2">Leave this field empty</label>
        <input type="text" id="hp_field_9k2" name="hp_field_9k2" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="form_rendered_at" value={renderedAt} readOnly />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" required>
          <input id="name" name="name" type="text" required maxLength={80} autoComplete="name" className={inputCls} placeholder="Jane Rivera" />
        </Field>
        <Field label="Company" htmlFor="company" hint="Optional">
          <input id="company" name="company" type="text" maxLength={80} className={inputCls} />
        </Field>
        <Field label="Country" htmlFor="country" required>
          <input id="country" name="country" type="text" required maxLength={60} className={inputCls} placeholder="United Kingdom" />
        </Field>
        <Field label="Service" htmlFor="service">
          <select id="service" name="service" defaultValue="" className={inputCls}>
            <option value="">Select a service</option>
            {REVIEW_SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Rating" htmlFor="rating" required>
          <select id="rating" name="rating" required defaultValue="" className={inputCls}>
            <option value="" disabled>Select a rating</option>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {"★".repeat(n)}{"☆".repeat(5 - n)} ({n}/5)
              </option>
            ))}
          </select>
        </Field>
        <Field label="Order number" htmlFor="order_number" required hint="From your purchase">
          <input id="order_number" name="order_number" type="text" required maxLength={60} className={inputCls} />
        </Field>
      </div>

      <Field label="Phone or email" htmlFor="contact" required hint="Private, never shown on the site">
        <input id="contact" name="contact" type="text" required maxLength={120} className={inputCls} placeholder="For verification only" />
      </Field>

      <Field label="Your review" htmlFor="review" required>
        <textarea
          id="review"
          name="review"
          required
          rows={4}
          maxLength={1000}
          className={`${inputCls} resize-none`}
          placeholder="What was it like working with MakeMyStore?"
        />
      </Field>

      {state.status === "error" && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.message}
        </p>
      )}

      <SubmitButton />

      <p className="text-xs text-muted">
        Your order number and contact details are kept private and used only to verify genuine clients.
      </p>
    </form>
  );
}
