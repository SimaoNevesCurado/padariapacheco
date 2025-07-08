import { useState, useEffect } from "react";
import { bakeryProductsShowcase } from "../data/productsShowcase";

export default function Showcase() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle scroll locking and modal animation
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      setIsAnimating(true);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  return (
    <section className="mt-12 md:mt-24 px-4 sm:px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#a86b3c] mb-4 md:mb-6">
          O Nosso Menu
        </h1>
        <button
          className="text-sm md:text-base font-medium text-white bg-orange-300/90 hover:bg-orange-400 px-4 py-2 md:px-6 md:py-3 rounded-md transition-all duration-300 hover:scale-105"
          aria-label="Ver menu completo"
          onClick={() => alert("Em breve!")}
        >
          Ver Menu Completo
        </button>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {bakeryProductsShowcase.map((product) => (
          <article
            key={product.id}
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => openModal(product)}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openModal(product)}
            aria-label={`Ver detalhes de ${product.name}`}
            role="button"
          >
            <img
              src={product.img}
              alt={product.alt}
              width={300}
              height={300}
              className="w-full h-48 sm:h-52 md:h-60 object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-white font-medium text-base md:text-lg">
                {product.name}
              </h2>
            </div>
          </article>
        ))}
      </div>

      {/* Modal with responsive improvements */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300 ${
            isAnimating ? "bg-black/70 opacity-100" : "bg-black/0 opacity-0"
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={closeModal}
        >
          <div
            className={`relative bg-white rounded-lg w-full mx-2 max-w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto transition-all duration-300 transform ${
              isAnimating ? "scale-100" : "scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a86b3c] rounded-full p-1"
              aria-label="Fechar modal"
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col md:grid md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
              <div className="h-48 sm:h-64 md:h-full">
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.alt}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="mt-4 md:mt-0">
                <h2
                  id="modal-title"
                  className="text-2xl sm:text-3xl font-bold text-[#a86b3c] mb-3 sm:mb-4"
                >
                  {selectedProduct?.name}
                </h2>
                <p className="text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
                  {selectedProduct?.description ||
                    "Delicioso produto de padaria feito com cuidado e tradição."}
                </p>
                <div className="mb-3 sm:mb-4">
                  {selectedProduct?.price != null ? (
                    <span className="text-xl sm:text-2xl font-bold text-[#a86b3c]">
                      €{selectedProduct.price.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-base sm:text-lg text-gray-500 italic">
                      Preço variável
                    </span>
                  )}
                </div>
                <button
                  className="w-full sm:w-auto mt-2 sm:mt-4 bg-[#a86b3c] hover:bg-[#8a5a34] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md transition-colors duration-300 text-sm sm:text-base"
                  onClick={() => {
                    alert(`${selectedProduct?.name} adicionado ao carrinho!`);
                    closeModal();
                  }}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
