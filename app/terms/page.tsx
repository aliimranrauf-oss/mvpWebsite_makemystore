import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/constants";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service — MakeMyStore",
  description: "The terms that apply when you work with MakeMyStore.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const lastUpdated = "September 9, 2026";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Terms of Service"
          description={`Last updated: ${lastUpdated}`}
        />

        <section>
          <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
            <div className="mx-auto max-w-[70ch] space-y-10 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                These Terms of Service ("Terms") govern any project, quote,
                or engagement between you ("Client") and {SITE_NAME}{" "}
                ("we," "us," or "our") arranged through {SITE_URL} (the
                "Site"). By requesting a quote or engaging our services, you
                agree to these Terms.
              </p>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  1. Services
                </h2>
                <p className="mt-3">We offer the following categories of work:</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <strong className="text-ink">{s.title}</strong> — {s.desc}
                    </li>
                  ))}
                </ul>
                <p className="mt-3">
                  The exact scope of any project is defined in the quote
                  provided to you before work begins, not by this page alone.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  2. Quotes and payment
                </h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5">
                  <li>
                    Every project is priced with a fixed quote provided
                    before work starts, based on the scope you describe.
                  </li>
                  <li>
                    A deposit may be required to begin work, with the
                    remaining balance due on delivery, unless otherwise
                    agreed in writing.
                  </li>
                  <li>
                    Work outside the agreed scope (new features, significant
                    changes in direction) may require a revised quote.
                  </li>
                  <li>
                    Deposits are generally non-refundable once work has
                    started, except where required by law.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  3. Ownership and intellectual property
                </h2>
                <p className="mt-3">
                  On full payment, you own 100% of the code delivered as part
                  of your project. There is no vendor lock-in: the codebase
                  is delivered to a GitHub repository under your own account,
                  deployed to your own Vercel project, and connected to your
                  own Supabase project (or equivalent services you control).
                  We retain no ongoing rights, license fees, or access
                  requirements over the delivered code.
                </p>
                <p className="mt-3">
                  Pre-existing tools, libraries, or general-purpose code
                  patterns we reuse across projects remain open-source or
                  freely licensed, as applicable, and are not exclusive to
                  any one client.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  4. Delivery timelines
                </h2>
                <p className="mt-3">
                  Timelines referenced on the Site (for example, "48–72 hour
                  delivery") are estimates based on typical projects of that
                  size and are not guarantees. Actual delivery times depend
                  on project scope, complexity, how quickly you provide
                  feedback or requested information, and factors outside our
                  control.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  5. Client responsibilities
                </h2>
                <p className="mt-3">
                  You&apos;re responsible for providing accurate project
                  requirements, timely feedback, and access to any
                  third-party accounts (such as GitHub, Vercel, or Supabase)
                  needed to complete and deliver the work.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  6. Limitation of liability
                </h2>
                <p className="mt-3">
                  To the fullest extent permitted by law, {SITE_NAME} will
                  not be liable for any indirect, incidental, special, or
                  consequential damages arising from your use of the
                  delivered project, including lost profits or lost data.
                  Our total liability for any claim arising from a project
                  is limited to the amount you paid for that specific
                  project.
                </p>
                <p className="mt-3">
                  Delivered software is provided "as is." We stand behind the
                  quality of our work and will address defects reported
                  within a reasonable period after delivery, but we do not
                  guarantee the software will be error-free or uninterrupted
                  indefinitely.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  7. Cancellations
                </h2>
                <p className="mt-3">
                  Either party may cancel a project before it is delivered
                  by notifying the other in writing (email is sufficient).
                  Work completed up to the point of cancellation is billable;
                  any remaining deposit balance beyond work already performed
                  will be handled on a case-by-case basis.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  8. Governing law
                </h2>
                <p className="mt-3">
                  <em>
                    [Governing law and jurisdiction to be confirmed with the
                    site owner — not yet finalized. Do not rely on this
                    section until it is filled in.]
                  </em>
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  9. Changes to these terms
                </h2>
                <p className="mt-3">
                  We may update these Terms from time to time. The "Last
                  updated" date at the top of this page reflects the most
                  recent revision. Continuing to engage our services after an
                  update means you accept the revised Terms.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  10. Contact
                </h2>
                <p className="mt-3">
                  Questions about these Terms can be sent to{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium text-mint hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </div>

              <p className="rounded-lg border border-border bg-surface2 px-4 py-3 text-xs text-muted">
                This page is provided as general boilerplate and does not
                constitute legal advice. It has not been reviewed by a
                lawyer. We strongly recommend having a qualified lawyer
                review these Terms — especially the liability and governing
                law sections — before relying on them.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
