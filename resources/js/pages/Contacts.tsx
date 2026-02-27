
import { useEffect } from "react";

import { motion } from "motion/react";
import { Navbar } from '@/components/padaria/Navbar';
import { ContactInfo } from '@/components/padaria/ContactInfo';
import { LocationMap } from '@/components/padaria/LocationMap';
import { MapComponent } from '@/components/padaria/MapComponent';
import { Footer } from '@/components/padaria/Footer';

export default function Contacts() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 mt-36  md:mt-25">

      <Navbar />

      <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <motion.div
              key={location.pathname}

     whileInView={{opacity: 1 ,y:0}}
    initial={{opacity:0, y: -100}}
    transition={{duration:1.5}}
    viewport={{ once: false }}
        className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#a86b3c] mb-4">
            Contacte-Nos
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estamos sempre disponíveis para responder às suas questões.
            Visite-nos ou entre em contacto através dos seguintes meios.
          </p>
        </motion.div>

        <motion.div
           key={location.pathname}

     whileInView={{opacity: 1 ,y:0}}
    initial={{opacity:0, y: -100}}
    transition={{duration:1.5}}
    viewport={{ once: false }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <ContactInfo />
          <LocationMap/>
        </motion.div>

        <MapComponent />
      </section>
      <Footer />
    </div>
  );
};
