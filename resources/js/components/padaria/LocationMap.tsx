

import locImg from "@/../images/localizacao.png"

export const LocationMap = () => {
  return (
    <div


    className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#a86b3c] mb-4">
        Onde Estamos
      </h2>

      <img
        src={locImg}
        alt="Localização no mapa"
        className="w-full h-80 object-cover rounded-md"
      />
    </div>
  );
};
