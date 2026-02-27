import { CalendarIcon, ArrowLeftIcon } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { Noticia } from '@/types/Models/Noticia'
import { route } from 'ziggy-js';
import { Footer } from '@/components/padaria/Footer';
import { Navbar } from '@/components/padaria/Navbar';

type Props = {
    noticia: Noticia
}

/* =========================
   FORMATAR DATA
========================= */
function formatDate(date: string) {
    const d = new Date(date)

    return d.toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}

export default function ViewNoticia({ noticia }: Props) {
    return (
        <>
<div className="mb-40">
<Navbar/>

</div>
        <section className="mt-24 px-4 sm:px-6 md:px-10 lg:px-20 max-w-4xl mx-auto">

            {/* VOLTAR */}
            <Link
                href={route('home')}
                className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#a86b3c]"
            >
                <ArrowLeftIcon className="h-4 w-4" />
                Voltar
            </Link>

            {/* TÍTULO */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {noticia.title}
            </h1>

            {/* META */}
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">

                {noticia.categoria && (
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-800 font-medium">
                        {noticia.categoria}
                    </span>
                )}

                <div className="flex items-center gap-1.5">
                    <CalendarIcon className="h-4 w-4" />
                    {formatDate(noticia.created_at)}
                </div>

            </div>

            {/* IMAGEM */}
            {noticia.imagens && noticia.imagens.length > 0 && (
                <img
                    src={`/storage/${noticia.imagens[0].caminho}`}
                    alt={noticia.title}
                    className="mb-8 w-full max-h-[420px] object-cover rounded-lg"
                />
            )}

            {/* CONTEÚDO */}
            <article className="prose prose-lg max-w-none text-gray-800">

                {noticia.content
                    .split('\n')
                    .map((linha, index) => (
                        <p key={index}>{linha}</p>
                    ))}

            </article>

        </section>
    <Footer/>
        </>
    )
}
