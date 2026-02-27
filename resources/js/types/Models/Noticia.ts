export interface Noticia {
    id: number;
    title: string;
    content: string;
    categoria: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    imagens?: NoticiaImagem[];
}


export interface NoticiaImagem {
    id: number;
    caminho: string;
    hash: string;
    news_id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}
