import { ArrowLeftIcon, BriefcaseIcon, ClockIcon, CalendarIcon } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { Footer } from '@/components/padaria/Footer'
import { Navbar } from '@/components/padaria/Navbar'
import { Vaga } from '@/types/Models/Vaga'

type Props = {
    vaga: Vaga
}

function formatDate(date: string) {
    const d = new Date(date)

    return d.toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}

export default function ViewVaga({ vaga }: Props) {
    return (
        <>
            <div className="mb-40">
                <Navbar />
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
                    {vaga.name}
                </h1>

                {/* META */}
                <div className="mb-6 flex flex-col gap-3 text-sm text-gray-600">
                    {vaga.position && (
                        <div className="flex items-center gap-2">
                            <BriefcaseIcon className="h-4 w-4" />
                            <span className="font-medium text-gray-800">{vaga.position}</span>
                        </div>
                    )}

                    {vaga.horario && (
                        <div className="flex items-center gap-2">
                            <ClockIcon className="h-4 w-4" />
                            <span>{vaga.horario}</span>
                        </div>
                    )}

                    {vaga.created_at && (
                        <div className="flex items-center gap-2 text-gray-500">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{formatDate(vaga.created_at)}</span>
                        </div>
                    )}
                </div>

                {/* DESCRIÇÃO */}
                <article className="prose prose-lg max-w-none text-gray-800">
                    {(vaga.description ?? '')
                        .split('\n')
                        .filter((linha) => linha.trim().length > 0)
                        .map((linha, index) => (
                            <p key={index}>{linha}</p>
                        ))}
                </article>

                {/* CTA */}
                <div className="mt-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Candidatura
                    </h2>
                    <p className="mt-2 text-sm text-gray-700">
                        Envia a tua candidatura com CV e uma breve apresentação,ou entra em contacto connosco para mais informações.
                    </p>

                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <a
                            href="mailto:geral@padariapacheco.pt?subject=Candidatura%20-%20Vaga"
                            className="inline-flex items-center justify-center rounded-lg bg-[#a86b3c] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                        >
                            Enviar por email
                        </a>

                        <Link
                            href={route('home')}
                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Voltar ao início
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
