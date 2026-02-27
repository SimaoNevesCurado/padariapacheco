<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\ImagemNews;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
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
            'imagem' => 'required|image|max:10240',
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
            'imagem' => 'nullable|image|max:10240',
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
    private function handleImageUpload($file, int $newsId): bool
    {
        try {
            $hash = hash_file('sha256', $file->getRealPath());

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
                // Upload nova imagem
                $path = $file->store('noticias', 'public');

                if (!$path) {
                    Log::error('Falha ao fazer upload da imagem para storage');
                    return false;
                }

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
