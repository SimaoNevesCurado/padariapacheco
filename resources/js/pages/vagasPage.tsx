import { Link } from '@inertiajs/react'
import { BriefcaseIcon, ClockIcon } from 'lucide-react'
import { route } from 'ziggy-js'
import { Vaga } from '@/types/Models/Vaga'
import { Footer } from '@/components/padaria/Footer'
import { Navbar } from '@/components/padaria/Navbar'

type Props = {
    vagas: Vaga[]
}

export default function VagasDisponiveis({
                                             vagas,
                                         }: Props) {
    return (
        <>
            <div className="mb-40">
                <Navbar />
            </div>

            <section className="mt-24 px-4 sm:px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#a86b3c]">
                    Vagas disponíveis
                </h1>

                {vagas.length === 0 ? (
                    <p className="text-center text-gray-500">
                        De momento não há vagas disponíveis.
                    </p>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {vagas.map((vaga) => (
                            <div
                                key={vaga.id}
                                className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                            >
                                {/* LINK INVISÍVEL PARA O CARD */}
                                <Link
                                    href={route('vagas.view', { id: vaga.id })}
                                    className="absolute inset-0 z-0"
                                    aria-label={`Abrir vaga ${vaga.name}`}
                                />

                                {/* CONTEÚDO (não clicável, o clique é do overlay) */}
                                <div className="relative z-10 flex-1 p-6 pointer-events-none">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                            {vaga.name}
                                        </h3>

                                        {vaga.position && (
                                            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                                <BriefcaseIcon className="h-4 w-4" />
                                                <span>{vaga.position}</span>
                                            </div>
                                        )}
                                    </div>

                                    {vaga.horario && (
                                        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                                            <ClockIcon className="h-4 w-4" />
                                            <span>{vaga.horario}</span>
                                        </div>
                                    )}

                                    {vaga.description && (
                                        <p className="text-sm text-gray-700 line-clamp-3">
                                            {vaga.description}
                                        </p>
                                    )}
                                </div>

                                {/* FOOTER */}
                                <div className="relative z-10 border-t border-gray-100 bg-gray-50 px-6 py-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-sm font-medium text-[#a86b3c] group-hover:underline pointer-events-none">
                                            Ver detalhes
                                        </span>


                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </>
    )
}
