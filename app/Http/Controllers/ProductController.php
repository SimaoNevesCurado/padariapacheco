<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Imagem;
use App\Models\Produto;
use App\Models\Unidade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('produtos/Products', [
            'produtos' => Produto::with([
                'categoria',
                'unidade',
                'imagens',
            ])->get(),

            'categorias' => Categoria::select('nome', 'id')->get(),
            'unidades' => Unidade::select('nome', 'id')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = request()->validate([
            'nome' => 'required|min:3|max:30|unique:produtos',
            'descricao' => 'nullable|min:3|max:255',
            'preco' => 'required|numeric|min:0',

            'unidade_id' => 'required|exists:unidades,id',
            'categoria_id' => 'required|exists:categorias,id',

            'imagem' => 'nullable|image|max:2048',
            'vitrine' => 'boolean', // Add this
        ]);

        if ($request->boolean('vitrine')) {

            $numVitrine = Produto::where('vitrine', true)->count();

            if ($numVitrine >= 10) {
                return back()->with(
                    'error',
                    'Só pode ter 10 itens na vitrine'
                );
            }
        }


        $hash = null;

        if (request()->hasFile('imagem')) {
            $file = request()->file('imagem');

            // MD5 do ficheiro temporário
            $hash = md5_file($file->getRealPath());

            // Verificar se já existe
            $imagemExistente = Imagem::where('hash', $hash)->first();

            if ($imagemExistente) {
                return back()
                    ->withErrors([
                        'error' => 'Esta imagem já existe no sistema.', // Better to attach to the field
                    ])
                    ->withInput();
            }
        }

        // Create product with vitrine field
        $produto = Produto::create($validated);

        if (request()->hasFile('imagem')) {
            $path = request()
                ->file('imagem')
                ->store('produtos', 'public');

            $produto->imagens()->create([
                'caminho' => $path,
                'hash' => $hash,
                'on_vitrine' => $validated['vitrine'] ?? false, // Use the vitrine value from form
            ]);
        }

        return back()->with('success', 'Produto criado com sucesso!');
    }



    public function update(Request $request, int $id)
    {
        $produto = Produto::with('imagens')->findOrFail($id);

        $validated = $request->validate([

            'nome' => 'required|min:3|max:30|unique:produtos,nome,' . $produto->id,

            'descricao' => 'nullable|min:3|max:255',

            'preco' => 'required|numeric|min:0',


            'unidade_id' => 'required|exists:unidades,id',

            'categoria_id' => 'required|exists:categorias,id',

            'imagem' => 'nullable|image|max:2048',

            'vitrine' => 'nullable|boolean',
        ]);



        // Normalizar vitrine
        $validated['vitrine'] = $request->boolean('vitrine');


        if ($request->boolean('vitrine')) {

            $numVitrine = Produto::where('vitrine', true)
                ->where('id', '!=', $produto->id)
                ->count();

            if ($numVitrine >= 10) {
                return back()->with(
                    'error',
                    'Só pode ter 10 itens na vitrine'
                );
            }
        }


        // Atualizar dados base
        $produto->update($validated);



        // Se vier imagem nova
        if ($request->hasFile('imagem')) {

            $file = $request->file('imagem');

            $hash = md5_file($file->getRealPath());


            // Verificar duplicada (noutros produtos)
            $imagemExistente = Imagem::where('hash', $hash)
                ->where('produto_id', '!=', $produto->id)
                ->first();


            if ($imagemExistente) {

                return back()
                    ->withErrors([
                        'imagem' => 'Esta imagem já existe no sistema.',
                    ])
                    ->withInput();
            }



            // Apagar imagem antiga
            foreach ($produto->imagens as $img) {

                if (Storage::disk('public')->exists($img->caminho)) {
                    Storage::disk('public')->delete($img->caminho);
                }

                $img->delete();
            }



            // Guardar nova
            $path = $file->store('produtos', 'public');


            $produto->imagens()->create([
                'caminho' => $path,
                'hash' => $hash,
                'on_vitrine' => $validated['vitrine'],
            ]);
        }



        return back()->with('success', 'Produto atualizado com sucesso!');
    }


    public function destroy(int $id)
    {
        DB::transaction(function () use ($id) {

            $produto = Produto::with('imagens')->findOrFail($id);


            foreach ($produto->imagens as $imagem) {

                if (Storage::disk('public')->exists($imagem->caminho)) {
                    Storage::disk('public')->delete($imagem->caminho);
                }
            }


            $produto->imagens()->delete();


            $produto->delete();
        });


        return back()->with('success', 'Produto eliminado com sucesso!');
    }


}
