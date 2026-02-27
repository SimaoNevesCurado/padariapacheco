<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class News extends Model
{
    use SoftDeletes;
    protected $table = 'news';

    protected $fillable = [
        'title',
        'content',
        'categoria',
    ];

    protected $appends = ['imagem'];

    public function imagens()
    {
        return $this->hasMany(ImagemNews::class, 'news_id');
    }

    public function imagemPrincipal()
    {
        return $this->hasOne(ImagemNews::class, 'news_id');
    }

    public function getImagemAttribute()
    {
        return $this->imagemPrincipal?->caminho;
    }
}
