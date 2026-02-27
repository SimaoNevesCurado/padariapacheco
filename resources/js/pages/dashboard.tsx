import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import {
    ShoppingBag,
    Newspaper,
    Briefcase,
    Plus
} from 'lucide-react';
import { route } from 'ziggy-js';
import { Produto } from '@/types/Models/Produto';
import { Noticia } from '@/types/Models/Noticia';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type Props = {
    noticias: Noticia[];
    vagasNum: number;
    produtos: Produto[];
}

export default function Dashboard({ noticias, vagasNum, produtos }: Props) {
    function formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Painel de Controlo</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Bem-vindo de volta! Aqui está um resumo da sua padaria.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid gap-6 md:grid-cols-3">
                    {/* Produtos */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Produtos Ativos</p>
                                <p className="mt-2 text-3xl font-bold text-gray-900">{produtos.length}</p>
                            </div>
                            <div className="rounded-full bg-amber-100 p-3">
                                <ShoppingBag className="h-6 w-6 text-amber-600" />
                            </div>
                        </div>
                    </div>

                    {/* Notícias */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Notícias Publicadas</p>
                                <p className="mt-2 text-3xl font-bold text-gray-900">{noticias.length}</p>
                            </div>
                            <div className="rounded-full bg-purple-100 p-3">
                                <Newspaper className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    {/* Vagas */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Vagas Abertas</p>
                                <p className="mt-2 text-3xl font-bold text-gray-900">{vagasNum}</p>
                            </div>
                            <div className="rounded-full bg-green-100 p-3">
                                <Briefcase className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Produtos Recentes */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">Produtos Recentes</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {produtos.length === 0 ? (
                                <div className="px-6 py-8 text-center text-sm text-gray-500">
                                    Nenhum produto cadastrado ainda
                                </div>
                            ) : (
                                produtos.slice(0, 4).map((produto) => (
                                    <div key={produto.id} className="px-6 py-4 transition-colors hover:bg-gray-50">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {produto.nome}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-600">
                                                    {produto.categoria.nome || 'Sem categoria'}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
                            <a href={route('dashboardProducts')} className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                Ver todos os produtos →
                            </a>
                        </div>
                    </div>

                    {/* Notícias Recentes */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">Notícias Recentes</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {noticias.length === 0 ? (
                                <div className="px-6 py-8 text-center text-sm text-gray-500">
                                    Nenhuma notícia publicada ainda
                                </div>
                            ) : (
                                noticias.slice(0, 4).map((noticia) => (
                                    <div key={noticia.id} className="px-6 py-4 transition-colors hover:bg-gray-50">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {noticia.title}
                                                </p>
                                                <div className="mt-1 flex items-center gap-2">
                                                    <span className="text-xs font-medium text-purple-600">
                                                        {noticia.categoria}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(noticia.created_at)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
                            <a href={route('noticias')} className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                Ver todas as notícias →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Seção de Ação Rápida */}
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                    <a href={route('dashboardProducts')} className="group overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-amber-100 p-3 transition-colors group-hover:bg-amber-200">
                                <Plus className="h-6 w-6 text-amber-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Adicionar Produto</p>
                                <p className="text-sm text-gray-600">Cadastre novos itens</p>
                            </div>
                        </div>
                    </a>

                    <a href={route('noticias.create')} className="group overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-purple-100 p-3 transition-colors group-hover:bg-purple-200">
                                <Plus className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Publicar Notícia</p>
                                <p className="text-sm text-gray-600">Criar conteúdo</p>
                            </div>
                        </div>
                    </a>

                    <a href={route('vagas.create')} className="group overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-green-100 p-3 transition-colors group-hover:bg-green-200">
                                <Plus className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Criar Vaga</p>
                                <p className="text-sm text-gray-600">Publicar oportunidade</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}
