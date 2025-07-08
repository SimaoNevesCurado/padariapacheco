import { useState } from "react";
import { Products } from "../data/galery.js";

export const Galery = () => {
  const [activeCategory, setActiveCategory] = useState<
    "all" | Products["category"]
  >("all");

  const filteredProducts =
    activeCategory === "all"
      ? Products
      : Products.filter((product) => product.category === activeCategory);

  return (
    <section className="py-12 px-4 sm:px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-[#a86b3c] mb-8 text-center">
        Nossos Produtos
      </h2>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {["all", "Pão", "Bolo"].map((category) => (
          <button
            key={category}
            onClick={() =>
              setActiveCategory(category as "all" | Products["category"])
            }
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === category
                ? "bg-[#a86b3c] text-white shadow-md"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {category === "all" ? "Todos" : category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden flex-shrink-0">
                <img
                  src={product.img}
                  alt={product.alt}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <span className="bg-[#a86b3c]/10 text-[#a86b3c] text-xs px-2 py-1 rounded-full whitespace-nowrap">
                    {product.category}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-auto flex justify-between items-center">
                  <p className="text-[#a86b3c] font-medium">
                    €{product.price.toFixed(2)}{" "}
                    <span className="text-gray-500 text-sm">
                      /{product.unit}
                    </span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Nenhum produto encontrado nesta categoria.
          </p>
        </div>
      )}
    </section>
  );
};
