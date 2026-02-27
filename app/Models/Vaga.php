<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vaga extends Model
{
    protected $table = 'vagas';

    protected $fillable = [

        'name',
        'position',
        'description',
        'horario',
    ];
}
