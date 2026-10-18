import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CvPage from "@/components/CvPage";
import { cvMetadata, cvJsonLd } from "@/lib/cv-seo";

// Arabic version on its own address so Google can index it for Arabic searches.
export const metadata = cvMetadata("ar");

export default function CvWritingArabicPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cvJsonLd("ar")) }} />
      <Navbar />
      <main>
        <CvPage initialLang="ar" />
      </main>
      <Footer />
    </>
  );
}
