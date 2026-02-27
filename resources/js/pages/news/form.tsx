import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Noticia } from '@/types/Models/Noticia';
import { ImageIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import FlashMessage from '@/components/padaria/FlashMessage';

type Props = {
    noticia?: Noticia;
    type: 'create' | 'edit';
};

export default function FormNews({ noticia, type }: Props) {
    const isEdit = type === 'edit';
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        noticia?.imagens?.[0]?.caminho
            ? `/storage/${noticia.imagens[0].caminho}`
            : null
    );

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Notícias/${isEdit ? 'Editar' : 'Criar'}`,
            href: dashboard().url,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        title: noticia?.title ?? '',
        content: noticia?.content ?? '',
        categoria: noticia?.categoria ?? '',
        imagem: null as File | null,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('imagem', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('imagem', null);
        setPreviewUrl(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit && noticia) {
            post(route('noticias.update', noticia.id), {
                forceFormData: true,
                method: 'patch',
            });
        } else {
            post(route('noticias.store'));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <FlashMessage/>
            <div className="p-8">
                <div className="mx-auto max-w-3xl">
                    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                        {/* Título */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-900">
                                Título <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                placeholder="Ex: Nova loja inaugurada em Lisboa"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        {/* Categoria */}
                        <div>
                            <label htmlFor="categoria" className="block text-sm font-medium text-gray-900">
                                Categoria <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="categoria"
                                name="categoria"
                                value={data.categoria}
                                onChange={(e) => setData('categoria', e.target.value)}
                                required
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                placeholder="Ex: Inauguração, Promoção, Evento"
                            />
                            {errors.categoria && <p className="mt-1 text-sm text-red-600">{errors.categoria}</p>}
                        </div>

                        {/* Imagem */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900">
                                Imagem {!isEdit && <span className="text-red-500">*</span>}
                            </label>
                            <div className="mt-2">
                                {previewUrl ? (
                                    <div className="relative">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="h-48 w-full rounded-lg object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white transition-colors hover:bg-red-600"
                                        >
                                            <XIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 transition-colors hover:border-orange-400 hover:bg-blue-50">
                                        <ImageIcon className="h-10 w-10 text-gray-400" />
                                        <span className="mt-2 text-sm font-medium text-gray-600">
                                            Clique para carregar imagem
                                        </span><span className="mt-1 text-xs text-gray-500">
                                            PNG, JPG até 10MB
                                        </span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            required={!isEdit}
                                        />
                                    </label>
                                )}
                            </div>
                            {errors.imagem && <p className="mt-1 text-sm text-red-600">{errors.imagem}</p>}
                        </div>

                        {/* Conteúdo */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-900">
                                Conteúdo <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                required
                                rows={10}
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                placeholder="Escreva o conteúdo da notícia..."
                            />
                            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
                            <a
                                href={route('noticias')}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Cancelar
                            </a>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-orange-300 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                            >
                                {processing ? (isEdit ? 'Atualizando...' : 'Criando...') : (isEdit ? 'Atualizar Notícia' : 'Criar Notícia')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
