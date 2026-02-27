<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UnidadeController;
use App\Http\Controllers\VagaController;
use App\Models\Categoria;
use App\Models\News;
use App\Models\Produto;
use App\Models\Vaga;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [MainController::class, 'index'])->name('home');

Route::get('/produtos', function () {
    return Inertia::render('produtos', [
        'produtos' => Produto::with(['categoria', 'imagens'])->get(),
        'categoriasNomes' => Categoria::select('id', 'nome')->get(),
    ]);
});

Route::get('noticia/ler/{id}', [NewsController::class, 'show'])->name('noticia.view');
Route::get('vagas', [VagaController::class, 'vagas'])->name('vagas.show');

Route::get('vagas/ver/{id}', [VagaController::class, 'vagasView'])->name('vagas.view');

Route::get('/contactos', function () {
    return Inertia::render('Contacts');
})->name('contacts');


Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('dashboard')->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard',[

                'noticias' => News::all(),
                'produtos' => Produto::with('categoria')->get(),
                'vagasNum' => Vaga::count(),

            ]);
        })->name('dashboard');

        Route::get('/produtos', [ProductController::class, 'index'])->name('dashboardProducts');
        Route::post('/produtos/store', [ProductController::class, 'store'])->name('produtos.store');
        Route::patch('/produtos/update/{id}', [ProductController::class, 'update'])->name('produtos.update');
        Route::delete('/produtos/destroy/{id}', [ProductController::class, 'destroy'])->name('produtos.destroy');


        Route::get('/unidades', [UnidadeController::class, 'index'])->name('unidade');
        Route::post('/unidades/store', [UnidadeController::class, 'store'])->name('unidades.store');
        Route::patch('/unidades/update/{id}', [UnidadeController::class, 'update'])->name('unidades.update');
        Route::delete('/unidades/destroy/{id}', [UnidadeController::class, 'destroy'])->name('unidades.destroy');


        Route::get('/categorias', [CategoriaController::class, 'index'])->name('categoria');
        Route::post('/categorias/store', [CategoriaController::class, 'store'])->name('categoria.store');
        Route::patch('/categorias/update/{id}', [CategoriaController::class, 'update'])->name('categoria.update');
        Route::delete('/categorias/destroy/{id}', [CategoriaController::class, 'destroy'])->name('categoria.destroy');

        Route::get('/info', [InfoController::class, 'edit'])->name('info');

        Route::get('/vagas', [VagaController::class, 'index'])->name('vagas');
        Route::get('/vagas/create', [VagaController::class, 'create'])->name('vagas.create');
        Route::get('/vagas/edit/{id}', [VagaController::class, 'edit'])->name('vagas.edit');

        Route::post('/vagas/store', [VagaController::class, 'store'])->name('vagas.store');
        Route::patch('/vagas/update/{id}', [VagaController::class, 'update'])->name('vagas.update');
        Route::delete('/vagas/destroy/{id}', [VagaController::class, 'destroy'])->name('vagas.destroy');


        Route::get('/noticias', [NewsController::class, 'index'])->name('noticias');
        Route::get('/noticias/create', [NewsController::class, 'create'])->name('noticias.create');
        Route::post('/noticias/store', [NewsController::class, 'store'])->name('noticias.store');
        Route::get('/noticias/edit/{id}', [NewsController::class, 'edit'])->name('noticias.edit');
        Route::post('/noticias/update/{id}', [NewsController::class, 'update'])->name('noticias.update');
        Route::delete('/noticias/destroy/{id}', [NewsController::class, 'destroy'])->name('noticias.destroy');







        Route::patch('/info/update', [InfoController::class, 'update'])->name('info.update');

    });
});

require __DIR__ . '/settings.php';
