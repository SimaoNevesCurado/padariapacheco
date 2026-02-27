export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    tipo_unidade: string;
    categoria: string;
    imagem: string | null;
    vitrine: boolean;
}
