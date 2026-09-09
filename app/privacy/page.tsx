import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy — MakeMyStore",
  description: "How MakeMyStore collects, uses, and protects your information.",
  keywords: ["MakeMyStore privacy policy", "data protection", "privacy"],
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy — MakeMyStore",
    description: "How MakeMyStore collects, uses, and protects your information.",
    url: `${SITE_URL}/privacy`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const lastUpdated = "September 9, 2026";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Privacy Policy"
          description={`Last updated: ${lastUpdated}`}
        />

        <section>
          <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
            <div className="mx-auto max-w-[70ch] space-y-10 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                This Privacy Policy explains what information {SITE_NAME}{" "}
                ("we," "us," or "our") collects through {SITE_URL} (the
                "Site"), how it&apos;s used, and the choices you have. By using
                the Site, you agree to the practices described here.
              </p>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  1. Information we collect
                </h2>
                <p className="mt-3">
                  When you submit the contact form, we collect the
                  information you provide directly:
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number (optional)</li>
                  <li>Service you&apos;re interested in</li>
                  <li>Budget range (optional)</li>
                  <li>The message you write</li>
                </ul>
                <p className="mt-3">
                  We also automatically collect limited technical
                  information at the time of submission — your IP address
                  and browser user agent string — solely to help detect and
                  prevent spam submissions.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  2. How we use your information
                </h2>
                <p className="mt-3">Information submitted through the contact form is used to:</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5">
                  <li>Respond to your inquiry and provide a quote</li>
                  <li>Communicate with you about a potential or active project</li>
                  <li>Maintain a record of leads and past conversations</li>
                  <li>Identify and filter spam or abusive submissions</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  3. Where your information is stored
                </h2>
                <p className="mt-3">
                  Contact form submissions are stored in a database hosted by{" "}
                  <strong className="text-ink">Supabase</strong>, a
                  third-party database provider. Supabase stores data on our
                  behalf and does not use it for its own purposes.
                </p>
                <p className="mt-3">
                  If you submit the contact form, we may send you email
                  through <strong className="text-ink">Resend</strong>, a
                  third-party email delivery provider, including an
                  acknowledgment of your message and any follow-up
                  correspondence.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  4. We do not sell your data
                </h2>
                <p className="mt-3">
                  We do not sell, rent, or trade your personal information to
                  any third party for marketing or any other purpose.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  5. Cookies and analytics
                </h2>
                <p className="mt-3">
                  The Site does not currently use cookies or third-party
                  analytics tools. If that changes — for example, if
                  Vercel Analytics or Google Analytics is added in the future
                  — this section will be updated to disclose what&apos;s
                  collected and how to opt out.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  6. Data retention
                </h2>
                <p className="mt-3">
                  Lead information is retained for as long as reasonably
                  necessary to respond to your inquiry, deliver a project, or
                  maintain business records, unless you request deletion
                  sooner.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  7. Your rights
                </h2>
                <p className="mt-3">
                  You can request a copy of the information we hold about
                  you, ask us to correct it, or request that it be deleted
                  entirely. To make any of these requests, email{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium text-mint hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  . We&apos;ll respond and act on verified requests within a
                  reasonable timeframe.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  8. Children&apos;s privacy
                </h2>
                <p className="mt-3">
                  The Site is not directed at children, and we do not
                  knowingly collect information from anyone under the age of
                  16.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  9. Changes to this policy
                </h2>
                <p className="mt-3">
                  We may update this Privacy Policy from time to time. The
                  "Last updated" date at the top of this page reflects the
                  most recent revision.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  10. Contact
                </h2>
                <p className="mt-3">
                  Questions about this policy can be sent to{" "}
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
                constitute legal advice. We recommend having a qualified
                lawyer review this policy before relying on it.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
