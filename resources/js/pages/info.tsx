import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

import { useForm} from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import FlashMessage from '@/components/padaria/FlashMessage';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Info',
        href: dashboard().url,
    },
];

type Props = {
    info?: {
        texto_home: string;
        imagem_home: string | null;

        telefone: string;
        email: string;
        morada: string;
        slogan: string;
        heroText: string;

        horario_semana: string;
        sabado: string;
        horario_domingo: string;
    };
};

export default function Info({ info }: Props) {

    const [preview, setPreview] = useState<string | null>(
        info?.imagem_home
            ? `/storage/${info.imagem_home}`
            : null
    );



    const { data, setData, patch, processing, errors, setError, clearErrors } =
        useForm({

        /* HOME */
        texto_home: info?.texto_home ?? '',
        imagem_home: null as File | null,

        /* CONTACTOS */
        telefone: info?.telefone ?? '',
        email: info?.email ?? '',
        morada: info?.morada ?? '',
        slogan: info?.slogan ?? '',
        heroText:info?.heroText ?? '',

        /* HORÁRIOS */
        horario_semana: info?.horario_semana ?? '08:00 - 18:00',
        sabado: info?.sabado ?? '08:00 - 18:00',
        horario_domingo: info?.horario_domingo ?? 'Fechado',
        });



    function handleImagem(file: File | null) {
        if (file && file.size > 3 * 1024 * 1024) {
            setData('imagem_home', null);
            setError('imagem_home', 'A imagem não pode exceder 3MB.');
            setPreview(null);
            return;
        }

        clearErrors('imagem_home');

        setData('imagem_home', file);

        if (!file) {
            setPreview(null);
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreview(reader.result as string);
        };

        reader.readAsDataURL(file);
    }


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        patch(route('info.update'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
<FlashMessage/>
            <div className="max-w-6xl mx-auto p-6">

                {/* TÍTULO */}
                <h1 className="text-2xl font-bold mb-8">
                    Informações da Loja
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >

                    {/* ================= HOME ================= */}
                    <section className="bg-white rounded-xl border shadow-sm p-6 space-y-6">

                        <h2 className="text-lg font-semibold">
                            Página Principal
                        </h2>

                        {/* TEXTO */}
                        <div>
                            <label className="block font-medium mb-1">
                                Texto da Homepage
                            </label>

                            <textarea
                                value={data.texto_home}
                                onChange={(e) =>
                                    setData('texto_home', e.target.value)
                                }
                                className="w-full rounded border px-3 py-2 min-h-[120px]"
                            />

                            {errors.texto_home && (
                                <p className="text-sm text-red-500">
                                    {errors.texto_home}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block font-medium mb-1">
                                Slogan
                            </label>

                            <input
                                type="text"
                                value={data.slogan}
                                onChange={(e) =>
                                    setData('slogan', e.target.value)
                                }
                                className="w-full rounded border px-3 py-2"
                            />
                            {errors.slogan && (
                                <p className="text-sm text-red-500">
                                    {errors.slogan}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block font-medium mb-1">
                                Texto Principal
                            </label>

                            <input
                                type="text"
                                value={data.heroText}
                                onChange={(e) =>
                                    setData('heroText', e.target.value)
                                }
                                className="w-full rounded border px-3 py-2"
                            />
                            {errors.heroText && (
                                <p className="text-sm text-red-500">
                                    {errors.heroText}
                                </p>
                            )}
                        </div>

                        {/* IMAGEM */}
                        <div>
                            <label className="block font-medium mb-1">
                                Imagem Principal
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleImagem(
                                        e.target.files?.[0] ?? null
                                    )
                                }
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                PNG, JPG ou WebP até 3MB.
                            </p>

                            {errors.imagem_home && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.imagem_home}
                                </p>
                            )}

                            {preview && (
                                <img
                                    src={preview}
                                    className="mt-3 h-40 rounded object-cover border"
                                />
                            )}
                        </div>

                    </section>

                    {/* ================= CONTACTOS ================= */}
                    <section className="bg-white rounded-xl border shadow-sm p-6 space-y-6">

                        <h2 className="text-lg font-semibold">
                            Contactos
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="block font-medium mb-1">
                                    Telefone
                                </label>

                                <input
                                    type="text"
                                    value={data.telefone}
                                    onChange={(e) =>
                                        setData('telefone', e.target.value)
                                    }
                                    className="w-full rounded border px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="w-full rounded border px-3 py-2"
                                />
                            </div>

                        </div>



                        <div>
                            <label className="block font-medium mb-1">
                                Morada
                            </label>

                            <input
                                type="text"
                                value={data.morada}
                                onChange={(e) =>
                                    setData('morada', e.target.value)
                                }
                                className="w-full rounded border px-3 py-2"
                            />
                        </div>

                    </section>

                    {/* ================= HORÁRIOS ================= */}
                    <section className="lg:col-span-2 bg-white rounded-xl border shadow-sm p-6 space-y-6">

                        <h2 className="text-lg font-semibold">
                            Horário de Funcionamento
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* SEG-SAB */}
                            <div>
                                <label className="block font-medium mb-1">
                                    Segunda a Sexta
                                </label>

                                <input
                                    type="text"
                                    value={data.horario_semana}
                                    onChange={(e) =>
                                        setData(
                                            'horario_semana',
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded border px-3 py-2"
                                    placeholder="08:00 - 18:00"
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Sábado
                                </label>

                                <input
                                    type="text"
                                    value={data.sabado}
                                    onChange={(e) =>
                                        setData(
                                            'sabado',
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded border px-3 py-2"
                                    placeholder="Fechado"
                                />
                                {errors.sabado && (
                                    <p className="text-sm text-red-500">
                                        {errors.sabado}
                                    </p>
                                )}
                            </div>

                            {/* DOMINGO */}
                            <div>
                                <label className="block font-medium mb-1">
                                    Domingo e Feriados
                                </label>

                                <input
                                    type="text"
                                    value={data.horario_domingo}
                                    onChange={(e) =>
                                        setData(
                                            'horario_domingo',
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded border px-3 py-2"
                                    placeholder="Fechado"
                                />
                            </div>

                        </div>

                    </section>

                    {/* ================= BOTÃO ================= */}
                    <div className="lg:col-span-2 flex justify-center pt-6">

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-orange-400 px-10 py-3 font-semibold text-white shadow hover:bg-orange-500 disabled:opacity-60"
                        >
                            {processing
                                ? 'A guardar...'
                                : 'Guardar Alterações'}
                        </button>

                    </div>

                </form>

            </div>

        </AppLayout>
    );
}
