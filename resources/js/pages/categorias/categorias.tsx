import AppLayout from '@/layouts/app-layout';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { FormEvent, useState } from 'react';

import { type BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';


/* =====================
   TIPOS
===================== */

export interface Categoria {
    id: number;
    nome: string;
    descricao: string;
}

type Props = {
   categorias: Categoria[];
};


/* =====================
   BREADCRUMBS
===================== */

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Unidades',
        href: '/dashboard/unidades',
    },
];


/* =====================
   COMPONENTE
===================== */

export default function Categorias({ categorias }: Props) {

    const [modalAberto, setModalAberto] = useState(false);

    const [mode, setMode] = useState<'create' | 'edit'>('create');

    const [editingId, setEditingId] = useState<number | null>(null);


    const {
        data,
        setData,
        errors,
        post,
        delete: destroy,
        patch,
        processing,
        reset,
    } = useForm({
        nome: '',
        descricao: '',
    });


    /* =====================
       ABRIR MODAL
    ===================== */

    function abrirCriar() {

        setMode('create');
        setEditingId(null);

        reset();

        setModalAberto(true);
    }



    function abrirEditar(categoria: Categoria) {

        setMode('edit');

        setEditingId(categoria.id);

        setData({
            nome: categoria.nome,
            descricao: categoria.descricao,
        });

        setModalAberto(true);
    }


    function fecharModal() {

        setModalAberto(false);

        setMode('create');

        setEditingId(null);

        reset();
    }


    /* =====================
       SUBMIT
    ===================== */

    function handleSubmit(e: FormEvent) {

        e.preventDefault();


        if (mode === 'create') {

            post(route('categoria.store'), {
                onSuccess: () => fecharModal(),
            });

            return;
        }


        if (mode === 'edit' && editingId) {

            patch(route('categoria.update', editingId), {
                onSuccess: () => fecharModal(),
            });
        }
    }


    /* =====================
       RENDER
    ===================== */

    function handleDelete(id: number) {

        if (!confirm(`Tem a certeza que quer apagar?`)) {
            return;
        }
        destroy(route('categoria.destroy', id))

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>

            <div className="space-y-6 p-6">


                {/* HEADER */}
                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-bold">
                            Categorias
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Gestão de categorias de produtos
                        </p>
                    </div>


                    <Button
                        className="bg-orange-400 hover:bg-orange-500"
                        onClick={abrirCriar}
                    >
                        + Nova Categoria
                    </Button>

                </div>


                {/* TABELA */}
                <div className="rounded-xl border bg-white shadow-sm">

                    <Table>

                        <TableHeader>
                            <TableRow>

                                <TableHead>Nome</TableHead>

                                <TableHead>Descrição</TableHead>

                                <TableHead className="text-right">
                                    Ações
                                </TableHead>

                            </TableRow>
                        </TableHeader>


                        <TableBody>

                            {categorias.map((categoria) => (

                                <TableRow key={categoria.id}>

                                    <TableCell className="font-medium">
                                        {categoria.nome}
                                    </TableCell>

                                    <TableCell>
                                        {categoria.descricao}
                                    </TableCell>


                                    <TableCell className="space-x-2 text-right">

                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => abrirEditar(categoria)}
                                        >
                                            Editar
                                        </Button>


                                        <Button
                                            onClick={() => handleDelete(categoria.id)}

                                            size="sm"
                                            variant="destructive"
                                        >
                                            Apagar
                                        </Button>

                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </div>


                {/* MODAL */}
                <Dialog
                    open={modalAberto}
                    onOpenChange={(open) => {
                        if (!open) fecharModal();
                    }}
                >

                    <DialogContent className="max-w-md">

                        <DialogHeader>

                            <DialogTitle>

                                {mode === 'create'
                                    ? 'Nova Categoria'
                                    : 'Editar Categoria'}

                            </DialogTitle>

                        </DialogHeader>


                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >


                            {/* NOME */}
                            <div>

                                <Label>Nome</Label>

                                <Input
                                    placeholder="Ex: Pães de Leite"
                                    value={data.nome}
                                    onChange={(e) =>
                                        setData('nome', e.target.value)
                                    }
                                />

                                {errors.nome && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.nome}
                                    </p>
                                )}

                            </div>


                            {/* DESCRIÇÃO */}
                            <div>

                                <Label>Descrição</Label>

                                <Input
                                    value={data.descricao}
                                    placeholder="Ex: Produtos feitos com farinha de trigo"
                                    onChange={(e) =>
                                        setData('descricao', e.target.value)
                                    }
                                />

                                {errors.descricao && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.descricao}
                                    </p>
                                )}

                            </div>


                            {/* BOTÕES */}
                            <div className="flex justify-end gap-2 pt-4">

                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={fecharModal}
                                >
                                    Cancelar
                                </Button>


                                <Button
                                    type="submit"
                                    className="bg-orange-400 hover:bg-orange-500"
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'A guardar...'
                                        : mode === 'create'
                                            ? 'Criar'
                                            : 'Atualizar'}
                                </Button>

                            </div>

                        </form>

                    </DialogContent>

                </Dialog>


            </div>

        </AppLayout>
    );
}
