<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ImagemNews extends Model
{
    use SoftDeletes;

    protected $table = 'news_imagens';

    protected $fillable = [
        'caminho',
        'hash',
        'news_id',
        'image_path',
    ];

    public function news()
    {
        return $this->belongsTo(News::class);
    }
}
