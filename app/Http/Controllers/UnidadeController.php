<?php

namespace App\Http\Controllers;

use App\Models\Unidade;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnidadeController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('unidades/Unidades',[
            'unidades' => Unidade::select('nome','descricao','id')->get()
        ]);

    }

    public function store(Request $request)
    {


        $validated = $request->validate([
            'nome' => 'required|min:1|unique:unidades',
            'descricao' => 'required|min:1|max:15',
        ]);

        Unidade::create($validated);

        return back()->with('sucess', 'Unidade criada com sucesso!');

    }

    public function update(int $id, Request $request)
    {
        $unidade= Unidade::findOrFail($id);
        $validated = $request->validate([
            'nome' => 'required|min:1|unique:unidades,nome,',
            'descricao' => 'required|min:1|max:15',
        ]);
        $unidade->update($validated);

        return back()->with('sucess', 'Unidade atualizada com sucesso!');
    }

    public function destroy(string $id)
    {
        $unidade= Unidade::findOrFail($id);

        $unidade->delete();
    }


}
