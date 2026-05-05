import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Trust from "@/components/Trust";
import Services from "@/components/Services";
import Proof from "@/components/Proof";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyCall from "@/components/StickyCall";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="pb-16 md:pb-0">
        <Hero />
        <Trust />
        <Services />
        <Proof />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyCall />
    </>
  );
}
