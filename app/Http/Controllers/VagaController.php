<?php

namespace App\Http\Controllers;

use App\Models\Vaga;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VagaController extends Controller
{
    public function index()
    {
        return Inertia::render('vagas', [
            'vagas' => Vaga::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('vagas/form', [
            'type' => 'create'
        ]);

    }

    public function edit(int $id)
    {
        return Inertia::render('vagas/form', [
            'vaga' => Vaga::findOrFail($id),
            'type' => 'edit'
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|min:3',
            'position' => 'required|string|max:50|min:3',
            'description' => 'required|string',
            'horario' => 'nullable|string|max:50|min:3',
        ]);

        Vaga::create($validated);

        return redirect()->route('vagas')->with('success', 'Vaga criada com sucesso!');

    }

    public function destroy(int $id)
    {
        $vaga = Vaga::findOrFail($id);
        $vaga->delete();

        return redirect()->route('vagas')->with('success', 'Vaga eliminada com sucesso!');

    }

    public function update(int $id, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|min:3',
            'position' => 'required|string|max:50|min:3',
            'description' => 'required|string',
            'horario' => 'nullable|string|max:50|min:3',
        ]);

        $vaga = Vaga::findOrFail($id);
        $vaga->update($validated);

        return redirect()->route('vagas')->with('success', 'Vaga atualizada com sucesso!');

    }

    public function vagas()
    {
        return Inertia::render('vagasPage', [
            'vagas' => Vaga::all()
        ]);
    }
    public function vagasView(string $id)
    {
        $vaga = Vaga::findOrFail($id);

        return Inertia::render('vagas/show', [
            'vaga' => $vaga
        ]);

    }



}
