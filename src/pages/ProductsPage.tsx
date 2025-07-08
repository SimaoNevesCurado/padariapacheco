import Navbar from "../components/Navbar.tsx";
import { Galery } from "../components/Galery.tsx";
import Footer from "../components/Footer.tsx";

export const ProductsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar positioned at the top */}
      <header className="fixed top-0 w-full z-50">
        <Navbar />
      </header>

      {/* Main content with proper spacing */}
      <main className="flex-grow pt-24 md:pt-28">
        {" "}
        <Galery />
      </main>
      <Footer />

      {/* Footer can be added here if needed */}
      {/* <footer className="bg-[#a86b3c] text-white py-6">
        Footer content
      </footer> */}
    </div>
  );
};
