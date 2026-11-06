import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import { getApprovedReviews } from "@/lib/get-reviews";
import { SITE_URL } from "@/lib/constants";
import { buildMetadata, breadcrumbJsonLd, aggregateRatingFrom, reviewsJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Client Reviews — MakeMyStore",
  description:
    "Read what clients say about MakeMyStore's AI chatbots, SaaS MVPs, portfolio websites and CV writing, and leave your own review.",
  path: "/reviews",
});

// Refetch at most every 60s so newly approved reviews appear without a redeploy.
export const revalidate = 60;

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();
  const aggregateRating = aggregateRatingFrom(reviews);

  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Client Reviews", path: "/reviews" },
    ]),
    ...(aggregateRating
      ? [
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": `${SITE_URL}/#organization`,
            aggregateRating,
            review: reviewsJsonLd(reviews),
          },
        ]
      : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Client reviews"
          title="What clients say about working with us"
          description="Honest feedback from founders and professionals in the US, UK, Australia and UAE."
        />

        <section className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </section>

        <section id="leave-a-review" className="scroll-mt-20 border-t border-border bg-surface2">
          <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Worked with MakeMyStore?
            </h2>
            <p className="mt-3 text-sm text-muted">
              Tell others what it was like. Reviews are checked against your order before they go live, to keep this page genuine.
            </p>
            <div className="relative mt-8 rounded-xl2 border border-border bg-surface p-6 sm:p-8">
              <ReviewForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
