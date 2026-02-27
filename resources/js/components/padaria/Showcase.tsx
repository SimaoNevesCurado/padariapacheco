import { Produto } from '@/types/Models/Produto';

type ShowcaseProps = {
    produtos: Produto[];
};

export function Showcase({ produtos }: ShowcaseProps) {
    const fallback = "/images/placeholder.jpg";

    return (
        <section className="mt-24 px-4 sm:px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">

            {/* TÍTULO */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#a86b3c]">
                    O Nosso Menu
                </h1>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                {produtos.length > 0 ? (

                    produtos.map((p) => (

                        <div
                            key={p.id}
                            className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >

                            {/* IMAGEM */}
                            <div className="relative aspect-[2/3] bg-gray-100 overflow-hidden">

                                <img
                                    src={p.imagem ?? fallback}
                                    alt={p.nome}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* OVERLAY */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />

                                {/* NOME */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 p-3 text-center
                                    translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                                    transition-all duration-300"
                                >
                                    <h3 className="text-sm font-bold text-white drop-shadow">
                                        {p.nome}
                                    </h3>
                                </div>

                            </div>

                        </div>

                    ))

                ) : (

                    <>
                        {/* PLACEHOLDERS */}
                        {Array.from({ length: 5 }).map((_, i) => (

                            <div
                                key={i}
                                className="overflow-hidden rounded-xl bg-white shadow-md"
                            >

                                <div className="aspect-[3/2] bg-gray-200">

                                    <img
                                        src={fallback}
                                        alt="placeholder"
                                        className="h-full w-full object-cover opacity-60"
                                    />

                                </div>

                                <div className="p-3 text-center font-medium text-gray-400">
                                    Produto
                                </div>

                            </div>

                        ))}
                    </>

                )}

            </div>
        </section>
    );
}
