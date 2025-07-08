export const MapComponent = () => {
  return (
    <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#a86b3c] mb-4">
        Encontre-nos no Mapa
      </h2>
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d252.83888426041008!2d-8.832056870281402!3d39.89731146000295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-PT!2spt!4v1751976443011!5m2!1spt-PT!2spt"
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
