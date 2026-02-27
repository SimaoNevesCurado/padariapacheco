<?php

namespace App\Http\Controllers;

use App\Models\Info;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class InfoController extends Controller
{
    public function edit()
    {
        $info = Info::first();

        return Inertia::render('info', [
            'info' => $info,
        ]);
    }


    public function update(Request $request)
    {
        $data = $request->validate([
            'texto_home' => 'nullable|string',
            'imagem_home' => 'nullable|image|max:2048',

            'telefone' => 'nullable|string',
            'email' => 'nullable|email',
            'morada' => 'nullable|string',
            'heroText' => 'nullable|string',
            'slogan' => 'nullable|string', // n da
            'horario_semana' => 'nullable|string',
            'sabado' => 'nullable|string', // n da
            'horario_domingo' => 'nullable|string',
        ]);

        $info = Info::firstOrCreate([]);

        /* NOVA IMAGEM */
        if ($request->hasFile('imagem_home')) {

            /* Apagar antiga se existir */
            if ($info->imagem_home) {
                Storage::disk('public')->delete($info->imagem_home);
            }

            /* Guardar nova */
            $data['imagem_home'] = $request
                ->file('imagem_home')
                ->store('site', 'public');
        }

        /* Não tocar na imagem se não vier nova */
        else {
            unset($data['imagem_home']);
        }

        $info->update($data);

        return back()->with('success', 'Informações atualizadas');
    }

}
