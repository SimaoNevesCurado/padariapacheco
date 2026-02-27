<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Produto extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'produtos';

    protected $appends = ['imagem'];

    protected $fillable = [
        'nome',
        'descricao',
        'preco',
        'unidade_id',
        'categoria_id',
        'vitrine',
        'caminho',
        'hash',
        'on_vitrine',
    ];

    protected function imagem(): Attribute
    {
        return Attribute::make(
            get: function () {

                $img = $this->imagens->first();

                if (!$img) {
                    return null;
                }

                return asset('storage/' . $img->caminho);
            }
        );
    }



    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function unidade()
    {
        return $this->belongsTo(Unidade::class);
    }

    public function imagens()
    {
        return $this->hasMany(Imagem::class);
    }
}
