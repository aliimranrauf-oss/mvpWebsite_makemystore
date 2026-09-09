import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import Benefits from "@/components/Benefits";
import TechStack from "@/components/TechStack";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import Trust from "@/components/Trust";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServiceCards />
        <Benefits />
        <TechStack />
        <Pricing />
        <HowItWorks />
        <Trust />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
