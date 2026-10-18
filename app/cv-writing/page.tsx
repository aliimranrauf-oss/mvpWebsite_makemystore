import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CvPage from "@/components/CvPage";
import { cvMetadata, cvJsonLd } from "@/lib/cv-seo";

// Title, description, keywords, share image and structured data live in lib/cv-seo.ts
export const metadata = cvMetadata("en");

export default function CvWritingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cvJsonLd("en")) }} />
      <Navbar />
      <main>
        <CvPage initialLang="en" />
      </main>
      <Footer />
    </>
  );
}
