import type { Metadata } from "next";
import { Mail, Clock, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact — MakeMyStore",
  description:
    "Tell us about your AI chatbot, SaaS MVP, or project rescue and get a fixed quote back within 24 hours.",
  keywords: [
    "contact MakeMyStore",
    "hire AI chatbot developer",
    "get SaaS MVP quote",
    "fix AI generated project",
    "Next.js developer contact",
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact — MakeMyStore",
    description:
      "Tell us about your project and get a fixed quote back within 24 hours.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact — MakeMyStore",
    description:
      "Tell us about your project and get a fixed quote back within 24 hours.",
  },
};

const reassurances = [
  {
    icon: Clock,
    title: "Reply within 24 hours",
    desc: "Every message gets a real reply, not an autoresponder loop.",
  },
  {
    icon: ShieldCheck,
    title: "No obligation",
    desc: "Sending details doesn't commit you to anything — you'll get a quote first.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Get in touch"
          title="Tell us what you need"
          description="A chatbot, a new MVP, or a project that's stuck — share the details below and get a fixed quote back."
        />

        <section>
          <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink">
                  What happens next
                </h2>
                <div className="mt-6 space-y-6">
                  {reassurances.map((r) => {
                    const Icon = r.icon;
                    return (
                      <div key={r.title} className="flex gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-mint/10 text-mint">
                          <Icon size={20} />
                        </span>
                        <div>
                          <h3 className="font-medium text-ink">{r.title}</h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted">
                            {r.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  className="mt-10 rounded-xl2 card-glow-border p-6"
                  style={{ ["--card-bg" as string]: "#F6F8F7" }}
                >
                  <p className="text-sm text-muted">Prefer email?</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-2 inline-flex items-center gap-2 font-display text-base font-semibold text-ink hover:text-mint"
                  >
                    <Mail size={16} />
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="rounded-xl2 card-glow-border p-6 sm:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
