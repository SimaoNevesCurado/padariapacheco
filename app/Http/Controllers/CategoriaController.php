<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Unidade;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('categorias/categorias', [
            'categorias' => Categoria::select('nome', 'descricao','id')->orderBy('nome')->get(),
        ]);
    }

    public function store(Request $request)
    {


        $validated = $request->validate([
            'nome' => 'required|min:1|unique:unidades',
            'descricao' => 'required|min:1|max:80',
        ]);

        Categoria::create($validated);

        return back()->with('sucess', 'Categoria criada com sucesso!');

    }

    public function update(int $id, Request $request)
    {
        $categoria = Categoria::findOrFail($id);

        $validated = $request->validate([
            'nome' => 'required|min:1|unique:categorias,nome,' . $id,
            'descricao' => 'required|min:1|max:80',
        ]);

        $categoria->update($validated);

        return back()->with('sucess', 'Categoria atualizada com sucesso!');
    }

    public function destroy(string $id)
    {
        $categoria = Categoria::findOrFail($id);

        $categoria->delete();

        return back()->with('success', 'Categoria apagada com sucesso!');
    }

}
