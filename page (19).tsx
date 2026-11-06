import ServiceReviews from "@/components/ServiceReviews";
import { SERVICE_GROUPS } from "@/lib/reviews";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CvPage from "@/components/CvPage";
import { cvMetadata, cvJsonLd } from "@/lib/cv-seo";

// Arabic version on its own address so Google can index it for Arabic searches.
export const metadata = cvMetadata("ar");

// Refetch approved reviews at most every 60s so new ones show without a redeploy.
export const revalidate = 60;

export default function CvWritingArabicPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cvJsonLd("ar")) }} />
      <Navbar />
      <main>
        <CvPage
          initialLang="ar"
          reviews={<ServiceReviews services={SERVICE_GROUPS.cv} title="What clients say about our CV & portfolio work" />}
        />
      </main>
      <Footer />
    </>
  );
}
