<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Info extends Model
{
    protected $table = 'info';

    protected $fillable = [
        'texto_home',
        'imagem_home',
        'telefone',
        'email',
        'slogan',
        'sabado',
        'heroText',
        'morada',
        'horario_semana',
        'horario_domingo',
    ];
}

