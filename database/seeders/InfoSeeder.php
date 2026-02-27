<?php

namespace Database\Seeders;

use App\Models\Info;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Evita criar duplicados
        if (Info::count() === 0) {
            Info::create([
                'texto_home' => 'Bem-vindo à nossa padaria',
                'imagem_home' => null,
                'telefone' => '912345678',
                'email' => 'contacto@padaria.pt',
                'morada' => 'Rua Exemplo, 123',
                'horario_semana' => '08:00 - 18:00',
                'horario_domingo' => 'Fechado',
            ]);
        }
    }

}
