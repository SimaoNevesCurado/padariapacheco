import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import FlashMessage from '@/components/padaria/FlashMessage';
import { Noticia } from '@/types/Models/Noticia';
import { Button } from '@headlessui/react';
import {
    NewspaperIcon,
    CalendarIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
} from 'lucide-react';
import { route } from 'ziggy-js';
import { useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notícias',
        href: dashboard().url,
    },
];

type Props = {
    noticias: Noticia[];
};

export default function News({ noticias }: Props) {
    const { delete: destroy } = useForm();

    function handleDelete(id: number) {
        if (confirm('Tens a certeza que queres eliminar esta notícia?')) {
            destroy(route('noticias.destroy', id));
        }
    }

    function formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <FlashMessage />
            <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Notícias
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Gerencie as notícias do seu site
                        </p>
                    </div>
                    <Button
                        as="a"
                        href={route('noticias.create')}
                        className="inline-flex items-center gap-2 rounded-lg bg-orange-300 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Criar Notícia
                    </Button>
                </div>

                {noticias.length === 0 ? (
                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                        <NewspaperIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">
                            Nenhuma notícia criada
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Comece criando sua primeira notícia.
                        </p>
                        <Button
                            as="a"
                            href={route('noticias.create')}
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-300 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            <PlusIcon className="h-5 w-5" />
                            Criar Primeira Notícia
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {noticias.map((noticia) => (
                            <div
                                key={noticia.id}
                                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                            >
                                {/* Imagem da notícia */}
                                {noticia.imagens && noticia.imagens.length > 0 ? (
                                    <img
                                        src={`/storage/${noticia.imagens[0].caminho}`}
                                        alt={noticia.title}
                                        className="h-48 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-48 w-full items-center justify-center bg-gray-100">
                                        <NewspaperIcon className="h-16 w-16 text-gray-300" />
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* Categoria */}
                                    <div className="mb-3">
                                        <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
                                            {noticia.categoria}
                                        </span>
                                    </div>

                                    {/* Título */}
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
                                        {noticia.title}
                                    </h3>

                                    {/* Data */}
                                    <div className="mb-3 flex items-center gap-1.5 text-sm text-gray-500">
                                        <CalendarIcon className="h-4 w-4" />
                                        {formatDate(noticia.created_at)}
                                    </div>

                                    {/* Conteúdo */}
                                    <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                                        {noticia.content}
                                    </p>

                                    {/* Botões de ação */}
                                    <div className="flex gap-2">
                                        <Button
                                            as="a"
                                            href={route('noticias.edit', noticia.id)}
                                            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                            Editar
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(noticia.id)}
                                            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                            Apagar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
