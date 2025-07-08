import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import ShowCase from "./components/ShowCase";
import Footer from "./components/Footer";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-40">
        <main className="pt-36 pb-20">
          <Hero />
          <ShowCase />
          <About />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
