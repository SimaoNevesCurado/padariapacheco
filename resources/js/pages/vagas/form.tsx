import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Vaga } from '@/types/Models/Vaga';

type Props = {
    vaga?: Vaga;
    type: 'create' | 'edit';
};

export default function FormVaga({ vaga, type }: Props) {
    const isEdit = type === 'edit';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Vagas/${isEdit ? 'Editar' : 'Criar'}`,
            href: dashboard().url,
        },
    ];

    const { data, setData, post, patch, processing, errors } = useForm({
        name: vaga?.name ?? '',
        position: vaga?.position ?? '',
        horario: vaga?.horario ?? '',
        description: vaga?.description ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit && vaga) {
            patch(route('vagas.update', vaga.id));
        } else {
            post(route('vagas.store'));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-8">
                <div className="mx-auto max-w-3xl">
                    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                        {/* Nome da Vaga */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                Nome da Vaga <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Ex: Padeiro, Atendente"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Posição */}
                        <div>
                            <label htmlFor="position" className="block text-sm font-medium text-gray-900">
                                Posição <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="position"
                                name="position"
                                value={data.position}
                                onChange={(e) => setData('position', e.target.value)}
                                required
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Ex: Fornos, Atendimento, Distribuidor"
                            />
                            {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
                        </div>

                        {/* Horário */}
                        <div>
                            <label htmlFor="horario" className="block text-sm font-medium text-gray-900">
                                Horário
                            </label>
                            <input
                                type="text"
                                id="horario"
                                name="horario"
                                value={data.horario}
                                onChange={(e) => setData('horario', e.target.value)}
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Ex: Segunda a Sexta, 9h às 18h"
                            />
                            {errors.horario && <p className="mt-1 text-sm text-red-600">{errors.horario}</p>}
                        </div>

                        {/* Descrição */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                Descrição <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                required
                                rows={6}
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Descreva as responsabilidades, requisitos e benefícios da vaga..."
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
                            <a
                                href={route('vagas')}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Cancelar
                            </a>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-orange-400 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                            >
                                {processing ? (isEdit ? 'Atualizando...' : 'Criando...') : (isEdit ? 'Atualizar Vaga' : 'Criar Vaga')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
