<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\ImagemNews;
use App\Support\ImageCompressor;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class NewsController extends Controller
{
    public function index()
    {
        return Inertia::render('news', [
            'noticias' => News::with('imagens')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('news/form', [
            'type' => 'create'
        ]);
    }

    public function edit(int $id)
    {
        $noticia = News::with('imagens')->findOrFail($id);

        return Inertia::render('news/form', [
            'type' => 'edit',
            'noticia' => $noticia
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'categoria' => 'required|string|max:255',
            'content' => 'required|string',
            'imagem' => 'required|image|max:3072',
        ], [
            'imagem.image' => 'O ficheiro selecionado deve ser uma imagem válida.',
            'imagem.max' => 'A imagem não pode exceder 3MB.',
        ]);

        $noticia = News::create([
            'title' => $validated['title'],
            'categoria' => $validated['categoria'],
            'content' => $validated['content'],
        ]);

        if ($request->hasFile('imagem')) {
            $resultado = $this->handleImageUpload($request->file('imagem'), $noticia->id);

            if (!$resultado) {
                $noticia->delete();
                return back()->with('error', 'Erro ao processar a imagem. Tente novamente.');
            }
        }

        return redirect()->route('noticias')->with('success', 'Notícia criada!');
    }

    public function update(Request $request, int $id)
    {
        $noticia = News::with('imagens')->findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'categoria' => 'required|string|max:255',
            'content' => 'required|string',
            'imagem' => 'nullable|image|max:3072',
        ], [
            'imagem.image' => 'O ficheiro selecionado deve ser uma imagem válida.',
            'imagem.max' => 'A imagem não pode exceder 3MB.',
        ]);

        $noticia->update([
            'title' => $validated['title'],
            'categoria' => $validated['categoria'],
            'content' => $validated['content'],
        ]);

        if ($request->hasFile('imagem')) {
            // Remover associação antiga (mas não apagar o ficheiro, pode estar a ser usado por outras notícias)
            $noticia->imagens()->delete();

            // Adicionar nova imagem (reutiliza se já existir)
            $resultado = $this->handleImageUpload($request->file('imagem'), $noticia->id);

            if (!$resultado) {
                return back()->with('error', 'Erro ao processar a imagem. A notícia foi atualizada mas sem imagem.');
            }
        }

        return redirect()->route('noticias')->with('success', 'Notícia atualizada!');
    }

    public function destroy(int $id)
    {
        $noticia = News::with('imagens')->findOrFail($id);

        // Apenas desassociar as imagens, não apagar os ficheiros
        // (podem estar a ser usados por outras notícias)
        $noticia->imagens()->delete();

        $noticia->delete();

        return redirect()->route('noticias')->with('success', 'Notícia eliminada com sucesso!');
    }

    /**
     * Faz upload da imagem ou reutiliza se já existir com o mesmo hash
     *
     * @return bool Retorna true se sucesso, false se erro
     */
    private function handleImageUpload(UploadedFile $file, int $newsId): bool
    {
        try {
            $processed = ImageCompressor::compressUploadedToWebp($file, 1600, 78);
            $hash = $processed['hash'];

            // Verificar se já existe uma imagem com este hash
            $imagemExistente = ImagemNews::where('hash', $hash)->first();

            if ($imagemExistente) {
                // Reutilizar a imagem existente
                ImagemNews::create([
                    'news_id' => $newsId,
                    'caminho' => $imagemExistente->caminho,
                    'hash' => $hash,
                ]);
            } else {
                $path = ImageCompressor::storeCompressedWebp(
                    $processed['binary'],
                    'noticias',
                    'public'
                );

                ImagemNews::create([
                    'news_id' => $newsId,
                    'caminho' => $path,
                    'hash' => $hash,
                ]);
            }

            return true;
        } catch (\Exception $e) {
            Log::error('Erro ao processar imagem: ' . $e->getMessage());
            return false;
        }
    }

    public function show(string $id)
    {
        $noticia = News::with('imagens')->findOrFail($id);

        return Inertia::render('news/view', [
            'noticia' => $noticia
        ]);

    }
}
