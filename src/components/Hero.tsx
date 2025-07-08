import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative h-[500px] bg-cover bg-center px-4 sm:px-8 md:px-12 lg:px-20"
      style={{ backgroundImage: "url('/headerIMG.jpeg')" }}
    >
      {/* Texto centralizado */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-center">
        <div className="w-full px-4">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
            Bem Vindo à Padaria Pacheco
          </h1>
          <Link to="/contactos">
            <button className="text-sm md:text-base font-medium bg-orange-300/90 hover:bg-orange-400 px-6 py-3 rounded-md mt-6 mb-8 transition-colors duration-300 ">
              Fala connosco
            </button>
          </Link>
        </div>
      </div>

      {/* Caixa branca flutuante - wider version */}
      <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 px-6 py-6 w-[95%] sm:w-[90%] lg:w-[85%] max-w-8xl text-center mx-auto">
        {/* Horário */}
        <div className="flex-1">
          <p className="text-base md:text-lg font-semibold">
            Seg-Sáb: 7h - 20h
          </p>
          <p className="text-base md:text-lg font-semibold">
            Domingos: 7h - 13h
          </p>
        </div>

        {/* Divisória */}
        <div className="hidden md:block w-px h-12 bg-gray-200" />

        {/* Morada */}
        <div className="flex-1">
          <p className="text-sm text-gray-500">Visita-nos em</p>
          <p className="text-base md:text-lg font-semibold">
            R. de Fonte Cova 17, Monte Redondo
          </p>
        </div>

        {/* Divisória */}
        <div className="hidden md:block w-px h-12 bg-gray-200" />

        {/* Slogan */}
        <div className="flex-1">
          <p className="text-sm text-gray-500">Desde 1951</p>
          <p className="text-base md:text-lg italic text-[#a86b3c]">
            ... Mais de 70 anos de experiência
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
