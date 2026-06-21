import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import WhyUs from "@/components/sections/WhyUs";
import Conditions from "@/components/sections/Conditions";
import Services from "@/components/sections/Services";
import RecoveryJourney from "@/components/sections/RecoveryJourney";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import BookingForm from "@/components/sections/BookingForm";
import Contact from "@/components/sections/Contact";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import FloatingCTA from "@/components/ui/FloatingCTA";
import ExitIntent from "@/components/ui/ExitIntent";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyUs />
        <Conditions />
        <Services />
        <RecoveryJourney />
        <Team />
        <Testimonials />
        <BookingForm />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <FloatingCTA />
      <ExitIntent />
    </>
  );
}
