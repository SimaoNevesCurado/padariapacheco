export const MapComponent = () => {
  return (
    <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#a86b3c] mb-4">
        Encontre-nos no Mapa
      </h2>
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.073955759966!2d-9.142322684756612!3d38.71376077959938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQyJzQ5LjUiTiA5wrAwOCcyNy4wIlc!5e0!3m2!1sen!2spt!4v1620000000000!5m2!1sen!2spt"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};
