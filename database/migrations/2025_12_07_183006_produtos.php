<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->text('descricao')->nullable();
            $table->decimal('preco', 10, 2);
            $table->foreignId('unidade_id');
            $table->foreignId('categoria_id');
            $table->boolean('vitrine')->default(false)->index();
            $table->timestamps();
            $table->softDeletes();
        });

        if (Schema::hasTable('unidades')) {
            Schema::table('produtos', function (Blueprint $table) {
                $table->foreign('unidade_id')
                    ->references('id')
                    ->on('unidades')
                    ->cascadeOnDelete();
            });
        }

        if (Schema::hasTable('categorias')) {
            Schema::table('produtos', function (Blueprint $table) {
                $table->foreign('categoria_id')
                    ->references('id')
                    ->on('categorias')
                    ->cascadeOnDelete();
            });
        }
    }


    public function down(): void
    {
        Schema::dropIfExists('produtos');
    }

};
