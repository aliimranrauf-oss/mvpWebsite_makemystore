import ServiceReviews from "@/components/ServiceReviews";
import { SERVICE_GROUPS } from "@/lib/reviews";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/tools/RelatedTools";
import CvPage from "@/components/CvPage";
import { cvMetadata, cvJsonLd } from "@/lib/cv-seo";

// Title, description, keywords, share image and structured data live in lib/cv-seo.ts
export const metadata = cvMetadata("en");

// Refetch approved reviews at most every 60s so new ones show without a redeploy.
export const revalidate = 60;

export default function CvWritingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cvJsonLd("en")) }} />
      <Navbar />
      <main>
        <CvPage
          initialLang="en"
          reviews={<ServiceReviews services={SERVICE_GROUPS.cv} title="What clients say about our CV & portfolio work" />}
        />
      </main>
      <RelatedTools service="cv-writing" />
      <Footer />
    </>
  );
}
