<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Imagem extends Model
{
    use SoftDeletes;

    protected $table = 'imagens'; // Add this to explicitly set the table name

    protected $fillable = [
        'produto_id',
        'noticia_id',
        'caminho',
        'hash',
        'on_vitrine', // Changed from 'is_principal' to match migration and controller
    ];

    protected $casts = [
        'on_vitrine' => 'boolean', // Cast to boolean
    ];

    public function produto()
    {
        return $this->belongsTo(Produto::class);
    }


    public function noticia(){
        return $this->belongsTo(News::class);
    }
}
