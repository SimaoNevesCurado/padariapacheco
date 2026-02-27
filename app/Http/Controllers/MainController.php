<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Produto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Ramsey\Uuid\Provider\Time\SystemTimeProvider;

class MainController extends Controller
{
    public function index()
    {
    $produtosVitrine = Produto::where('vitrine', true)->get();
        return Inertia::render('home', [
            'vitrine' => $produtosVitrine,
            'noticias' => News::with('imagens')->latest()->take(3)->get(),
        ]);
    }



}
