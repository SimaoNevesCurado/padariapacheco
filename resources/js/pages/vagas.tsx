import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import FlashMessage from '@/components/padaria/FlashMessage';
import { Vaga } from '@/types/Models/Vaga';
import { Button } from '@headlessui/react';
import {
    BriefcaseIcon,
    ClockIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
} from 'lucide-react';
import { route } from 'ziggy-js';
import { useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vagas',
        href: dashboard().url,
    },
];

type Props = {
    vagas: Vaga[];
};

export default function Vagas({ vagas }: Props) {

const {delete: destroy } = useForm();

        function handleDelete(id: number) {
            destroy(route('vagas.destroy',id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <FlashMessage />

            <div className="mb-8 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Vagas</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Gerencie as vagas de emprego da sua empresa
                        </p>
                    </div>
                    <a href={route('vagas.create')}

                        className="inline-flex items-center gap-2 rounded-lg bg-orange-400 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                        <PlusIcon className="h-5 w-5" />
                        Criar Vaga
                    </a>
                </div>
            </div>

            {vagas.length === 0 ? (
                <div className=" m-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                    <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">Nenhuma vaga criada</h3>
                    <p className="mt-2 text-sm text-gray-600">
                        Comece criando sua primeira vaga de emprego.
                    </p>
                    <a
                        href={route('vagas.create')}
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-400 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500">
                        <PlusIcon className="h-5 w-5" />
                        Criar Primeira Vaga
                    </a>
                </div>
            ) : (
                <div className="p-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {vagas.map((vaga) => (
                        <div
                            key={vaga.id}
                            className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="flex-1 p-6">
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                            {vaga.name}
                                        </h3>
                                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                            <BriefcaseIcon className="h-4 w-4" />
                                            <span>{vaga.position}</span>
                                        </div>
                                    </div>
                                </div>

                                {vaga.horario && (
                                    <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                                        <ClockIcon className="h-4 w-4" />
                                        <span>{vaga.horario}</span>
                                    </div>
                                )}

                                <p className="text-sm text-gray-700 line-clamp-3">
                                    {vaga.description}
                                </p>
                            </div>

                            <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                                <div className="flex items-center justify-end gap-2">
                                    <a
                                        href={ route('vagas.edit',{id:vaga.id})}
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        <PencilIcon className="h-4 w-4" />
                                        Editar
                                    </a>
                                    <Button
                                        onClick={() => handleDelete(vaga.id)}
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                        <TrashIcon className="h-4 w-4" />
                                        Apagar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
