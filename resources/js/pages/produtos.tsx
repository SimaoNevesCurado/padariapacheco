import { Navbar } from "@/components/padaria/Navbar";
import { Footer } from "@/components/padaria/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, JSX } from "react";
import { Categoria } from "@/types/Models/Categoria";

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    tipo_unidade: string;
    categoria: {
        id: number;
        nome: string;
    };
    imagem?: string | null;
}

type Props = {
    produtos: Produto[];
    categoriasNomes: Categoria[];
};

export default function Produtos({
                                     produtos,
                                     categoriasNomes,
                                 }: Props): JSX.Element {

    const [filter, setFilter] = useState<string>("todos");
    const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);


    const filteredProducts = useMemo(() => {
        if (filter === "todos") return produtos;

        return produtos.filter((p) => {
            if (!p.categoria?.nome) return false;

            // Comparar categoria do produto com o filtro selecionado
            return p.categoria.nome.toLowerCase().trim() === filter.toLowerCase().trim();
        });
    }, [filter, produtos]);


    /* ================= CATEGORIAS ================= */

    const categorias = [
        { id: 0, nome: "Todos" },
        ...categoriasNomes,
    ];

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navbar />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:mx-auto lg:max-w-7xl">

                {/* HEADER */}
                <header className="mb-12 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-[#a86b3c] mb-4 tracking-tight"
                    >
                        Os Nossos Produtos
                    </motion.h2>

                    <div className="h-1 w-20 bg-[#a86b3c] mx-auto rounded-full opacity-60" />
                </header>

                {/* ================= FILTROS ================= */}
                <nav className="flex flex-wrap justify-center gap-3 mb-12">
                    {categorias.map((cat) => {
                        // Se for "Todos", usar "todos", senão usar o nome da categoria
                        const valorFiltro = cat.id === 0 ? "todos" : cat.nome;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(valorFiltro)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm
                ${
                                    filter === valorFiltro
                                        ? "bg-[#a86b3c] text-white shadow-md scale-105"
                                        : "bg-white text-gray-600 border border-gray-200 hover:border-[#a86b3c]/50 hover:bg-gray-50"
                                }`}
                            >
                                {cat.nome}
                            </button>
                        );
                    })}
                </nav>


                {/* ================= GRID ================= */}

                <div className="relative min-h-[400px]">

                    <AnimatePresence mode="popLayout">

                        {filteredProducts.length > 0 ? (

                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            >

                                {filteredProducts.map((produto) => (

                                    <motion.article
                                        layout
                                        key={produto.id}
                                        initial={{ scale: 0.95, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.35, ease: "easeOut" }}
                                        className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden"
                                    >

                                        {/* IMAGEM */}
                                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">

                                            {produto.imagem ? (
                                                <img
                                                    src={produto.imagem}
                                                    alt={produto.nome}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                                                    Sem imagem
                                                </div>
                                            )}

                                            {/* BADGE */}
                                            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#a86b3c] shadow">
                                                {produto.categoria?.nome ?? "Sem categoria"}
                                            </span>
                                        </div>

                                        {/* CONTEÚDO */}
                                        <div className="p-5 flex flex-col flex-grow">

                                            <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#a86b3c] transition">
                                                {produto.nome}
                                            </h3>

                                            <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                                                {produto.descricao}
                                            </p>

                                            {/* FOOTER */}
                                            <div className="mt-auto pt-4 border-t border-gray-100">

                                                <div className="flex items-end justify-between">

                                                    {/* PREÇO */}
                                                    <div>
                                                        <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">
                                                            Preço
                                                        </span>

                                                        <span className="text-[#a86b3c] font-extrabold text-xl">
                                                            €{produto.preco.toFixed(2)}
                                                        </span>

                                                        <span className="ml-1 text-xs text-gray-400">
                                                            /{produto.tipo_unidade}
                                                        </span>
                                                    </div>

                                                    {/* BOTÃO */}
                                                    <button
                                                        onClick={() => setSelectedProduct(produto)}
                                                        className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300
                                                        rounded-full bg-[#a86b3c] px-4 py-2 text-xs font-semibold text-white shadow hover:brightness-110"
                                                    >
                                                        Ver produto
                                                    </button>

                                                </div>
                                            </div>
                                        </div>

                                    </motion.article>

                                ))}

                            </motion.div>

                        ) : (

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <p className="text-xl text-gray-500 font-medium">
                                    Ups. Não encontramos produtos nesta categoria.
                                </p>
                            </motion.div>

                        )}

                    </AnimatePresence>

                </div>

            </main>

            <Footer />

            {/* ================= MODAL ================= */}

            <AnimatePresence>

                {selectedProduct && (

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
                        onClick={() => setSelectedProduct(null)}
                    >

                        <motion.div
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                        >

                            <div className="mb-4 flex items-start justify-between">

                                <h3 className="text-xl font-bold text-gray-800">
                                    {selectedProduct.nome}
                                </h3>

                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="mb-4 text-[#a86b3c] font-extrabold text-2xl">
                                €{selectedProduct.preco.toFixed(2)}
                                <span className="ml-1 text-sm text-gray-400">
                                    /{selectedProduct.tipo_unidade}
                                </span>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-6">
                                {selectedProduct.descricao}
                            </p>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="rounded-full bg-[#a86b3c] px-6 py-2 text-sm font-semibold text-white shadow hover:brightness-110"
                                >
                                    Fechar
                                </button>
                            </div>

                        </motion.div>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>
    );
}
