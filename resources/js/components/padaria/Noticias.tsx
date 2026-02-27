import { CalendarIcon, NewspaperIcon } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { Noticia } from '@/types/Models/Noticia'
import { route } from 'ziggy-js';

type Props = {
    noticias: Noticia[]
}

function formatDate(date: string) {
    const d = new Date(date)

    return d.toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}


export default function Noticias({ noticias }: Props) {
    return (
        <section className="mt-24 px-4 sm:px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#a86b3c]">
                Notícias
            </h1>

            {noticias.length === 0 && (
                <p className="text-center text-gray-500">
                    Ainda não existem notícias publicadas.
                </p>
            )}

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {noticias.map((noticia) => (
                    <Link
                        key={noticia.id}
                        href={route('noticia.view', noticia.id)}
                        className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                        aria-label={`Abrir notícia: ${noticia.title}`}
                    >
                        {/* IMAGEM */}
                        {noticia.imagens && noticia.imagens.length > 0 ? (
                            <img
                                src={`/storage/${noticia.imagens[0].caminho}`}
                                alt={noticia.title}
                                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex h-48 w-full items-center justify-center bg-gray-100">
                                <NewspaperIcon className="h-16 w-16 text-gray-300" />
                            </div>
                        )}

                        {/* CONTEÚDO */}
                        <div className="p-6 space-y-3">
                            {noticia.categoria && (
                                <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
                                    {noticia.categoria}
                                </span>
                            )}

                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:underline">
                                {noticia.title}
                            </h3>

                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                <CalendarIcon className="h-4 w-4" />
                                {formatDate(noticia.created_at)}
                            </div>

                            <p className="line-clamp-3 text-sm text-gray-600">
                                {noticia.content}
                            </p>

                            <span className="inline-flex text-sm font-medium text-[#a86b3c] group-hover:underline">
                                Ler mais
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
