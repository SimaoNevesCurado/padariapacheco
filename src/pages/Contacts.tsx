import Navbar from "../components/Navbar";
import { ContactInfo } from "../components/ContactInfo";
import { ContactForm } from "../components/ContactForm";
import { MapComponent } from "../components/MapComponent";
import Footer from "../components/Footer";
import ScrollToTop from "react-scroll-to-top";
import { useEffect } from "react";

export const Contacts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 mt-36  md:mt-25">
      <ScrollToTop />
      <Navbar />

      <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#a86b3c] mb-4">
            Contacte-Nos
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estamos sempre disponíveis para responder às suas questões.
            Visite-nos ou entre em contacto através dos seguintes meios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <ContactInfo />
          <ContactForm />
        </div>

        <MapComponent />
      </section>
      <Footer />
    </div>
  );
};
