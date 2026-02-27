<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unidade extends Model
{
    use softDeletes;

    protected $table = 'unidades';

    protected $fillable = [
        'nome',
        'descricao',
    ];

}
