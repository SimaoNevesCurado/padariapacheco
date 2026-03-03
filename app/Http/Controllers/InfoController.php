<?php

namespace App\Http\Controllers;

use App\Models\Info;
use App\Support\ImageCompressor;
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
            'imagem_home' => 'nullable|image|max:3072',

            'telefone' => 'nullable|string',
            'email' => 'nullable|email',
            'morada' => 'nullable|string',
            'heroText' => 'nullable|string',
            'slogan' => 'nullable|string', // n da
            'horario_semana' => 'nullable|string',
            'sabado' => 'nullable|string', // n da
            'horario_domingo' => 'nullable|string',
        ], [
            'imagem_home.image' => 'O ficheiro selecionado deve ser uma imagem válida.',
            'imagem_home.max' => 'A imagem não pode exceder 3MB.',
        ]);

        $info = Info::firstOrCreate([]);

        /* NOVA IMAGEM */
        if ($request->hasFile('imagem_home')) {

            /* Apagar antiga se existir */
            if ($info->imagem_home) {
                Storage::disk('public')->delete($info->imagem_home);
            }

            $processed = ImageCompressor::compressUploadedToWebp(
                $request->file('imagem_home'),
                1600,
                78
            );

            $data['imagem_home'] = ImageCompressor::storeCompressedWebp(
                $processed['binary'],
                'site',
                'public'
            );
        }

        /* Não tocar na imagem se não vier nova */
        else {
            unset($data['imagem_home']);
        }

        $info->update($data);

        return back()->with('success', 'Informações atualizadas');
    }

}
