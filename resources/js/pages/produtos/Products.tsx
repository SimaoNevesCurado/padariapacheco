import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

import { Button } from '@/components/ui/button';

import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import FlashMessage from '@/components/padaria/FlashMessage';

/* =====================
   TIPOS
===================== */

interface Option {
    id: number;
    nome: string;
}

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;

    categoria_id: number;
    unidade_id: number;

    categoria: Option;
    unidade: Option;

    imagem: string | null;
    vitrine: boolean;
}

interface Props {
    produtos: Produto[];
    categorias: Option[];
    unidades: Option[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produtos',
        href: dashboard().url,
    },
];

export default function Products({ produtos, categorias, unidades }: Props) {
    const [modalCreateAtivo, setModalCreateAtivo] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Produto | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    /* =====================
       FORM
    ===================== */

    const {
        data,
        errors,
        setData,
        post,
        patch,
        delete: destroy,
        processing,
        reset,
    } = useForm({
        nome: '',
        descricao: '',
        preco: 0,

        categoria_id: '',
        unidade_id: '',

        imagem: null as File | null,

        vitrine: false,
    });

    function handleImagem(file: File | null) {
        setData('imagem', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    }

    function handleSubmit() {
        if (editingProduct) {
            patch(route('produtos.update', editingProduct.id), {
                onSuccess: () => handleClose(),
            });
        } else {
            post(route('produtos.store'), {
                onSuccess: () => handleClose(),
            });
        }
    }

    function handleEdit(produto: Produto) {
        setEditingProduct(produto);
        setData({
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco,
            categoria_id: produto.categoria_id.toString(),
            unidade_id: produto.unidade_id.toString(),
            imagem: null,
            vitrine: produto.vitrine,
        });
        if (produto.imagem) {
            setPreview(produto.imagem);
        }
        setModalCreateAtivo(true);
    }

    function handleDelete(id: number) {
        if (!confirm('Apagar este produto?')) return;
        destroy(route('produtos.destroy', id), {
            preserveScroll: true,
        });
    }

    function handleClose() {
        setModalCreateAtivo(false);
        setEditingProduct(null);
        setPreview(null);
        reset();
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <FlashMessage/>
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Produtos</h1>

                    <Button
                        className="bg-orange-400 hover:bg-orange-500"
                        onClick={() => {
                            setEditingProduct(null);
                            reset();
                            setPreview(null);
                            setModalCreateAtivo(true);
                        }}
                    >
                        Novo Produto
                    </Button>
                </div>

                {/* LISTA */}
                <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted">
                        <tr>
                            <th className="p-3">Nome</th>
                            <th className="p-3">Preço</th>
                            <th className="p-3">Categoria</th>
                            <th className="p-3">Unidade</th>
                            <th className="p-3">Imagem</th>
                            <th className="p-3">Estado</th>
                            <th className="p-3 text-right">Ações</th>
                        </tr>
                        </thead>

                        <tbody>
                        {produtos.map((produto) => (
                            <tr
                                key={produto.id}
                                className="border-t hover:bg-muted/50"
                            >
                                <td className="p-3 font-medium">
                                    {produto.nome}
                                </td>

                                <td className="p-3">{produto.preco} €</td>

                                <td className="p-3">
                                    {produto.categoria?.nome || '-'}
                                </td>

                                <td className="p-3">
                                    {produto.unidade?.nome || '-'}
                                </td>

                                <td className="p-3">
                                    {produto.imagem ? (
                                        <img
                                            src={produto.imagem}
                                            className="h-10 w-10 rounded object-cover"
                                            alt="produto"
                                        />
                                    ) : (
                                        <span className="text-sm text-gray-400">
                                                Sem imagem
                                            </span>
                                    )}
                                </td>

                                <td className="p-3">
                                    {produto.vitrine ? (
                                        <span className="font-semibold text-green-600">
                                                Ativo
                                            </span>
                                    ) : (
                                        <span className="font-semibold text-red-600">
                                                Oculto
                                            </span>
                                    )}
                                </td>

                                <td className="flex justify-end gap-2 p-3">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => handleEdit(produto)}
                                    >
                                        Editar
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() =>
                                            handleDelete(produto.id)
                                        }
                                    >
                                        Apagar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Dialog
                open={modalCreateAtivo}
                onOpenChange={(val) => {
                    if (!val) handleClose();
                }}
            >
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* NOME */}
                        <div>
                            <Label>Nome</Label>

                            <Input
                                value={data.nome}
                                onChange={(e) =>
                                    setData('nome', e.target.value)
                                }
                            />

                            {errors.nome && (
                                <p className="text-sm text-red-500">
                                    {errors.nome}
                                </p>
                            )}
                        </div>

                        {/* DESCRIÇÃO */}
                        <div>
                            <Label>Descrição</Label>

                            <Input
                                value={data.descricao}
                                onChange={(e) =>
                                    setData('descricao', e.target.value)
                                }
                            />

                            {errors.descricao && (
                                <p className="text-sm text-red-500">
                                    {errors.descricao}
                                </p>
                            )}
                        </div>

                        {/* PREÇO */}
                        <div>
                            <Label>Preço</Label>

                            <Input
                                type="number"
                                value={data.preco}
                                onChange={(e) =>
                                    setData('preco', Number(e.target.value))
                                }
                            />

                            {errors.preco && (
                                <p className="text-sm text-red-500">
                                    {errors.preco}
                                </p>
                            )}
                        </div>

                        {/* CATEGORIA */}
                        <div>
                            <Label>Categoria</Label>

                            <Select
                                value={data.categoria_id}
                                onValueChange={(val) =>
                                    setData('categoria_id', val)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categorias.map((cat) => (
                                        <SelectItem
                                            key={cat.id}
                                            value={cat.id.toString()}
                                        >
                                            {cat.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.categoria_id && (
                                <p className="text-sm text-red-500">
                                    {errors.categoria_id}
                                </p>
                            )}
                        </div>

                        {/* UNIDADE */}
                        <div>
                            <Label>Tipo Unidade</Label>

                            <Select
                                value={data.unidade_id}
                                onValueChange={(val) =>
                                    setData('unidade_id', val)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma unidade" />
                                </SelectTrigger>
                                <SelectContent>
                                    {unidades.map((un) => (
                                        <SelectItem
                                            key={un.id}
                                            value={un.id.toString()}
                                        >
                                            {un.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.unidade_id && (
                                <p className="text-sm text-red-500">
                                    {errors.unidade_id}
                                </p>
                            )}
                        </div>

                        {/* IMAGEM */}
                        <div>
                            <Label>Imagem</Label>

                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleImagem(e.target.files?.[0] ?? null)
                                }
                            />

                            {preview && (
                                <img
                                    src={preview}
                                    className="mt-2 h-24 rounded object-cover"
                                    alt="Preview"
                                />
                            )}

                            {errors.imagem && (
                                <p className="text-sm text-red-500">
                                    {errors.imagem}
                                </p>
                            )}
                        </div>

                        {/* VITRINE */}
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={data.vitrine}
                                onCheckedChange={(val) =>
                                    setData('vitrine', !!val)
                                }
                            />

                            <Label>Mostrar na vitrine</Label>
                        </div>

                        {/* BOTÕES */}
                        <div className="flex justify-end gap-2 pt-4">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleClose}
                            >
                                Cancelar
                            </Button>

                            <Button
                                type="button"
                                disabled={processing}
                                className="bg-orange-400 hover:bg-orange-500"
                                onClick={handleSubmit}
                            >
                                {processing ? 'A guardar...' : 'Guardar'}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
