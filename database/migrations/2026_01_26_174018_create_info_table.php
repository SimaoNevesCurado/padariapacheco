<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('info', function (Blueprint $table) {
            $table->id();
            $table->text('texto_home')->nullable();
            $table->string('imagem_home')->nullable();
            $table->string('telefone')->nullable();
            $table->string('email')->nullable();
            $table->string('morada')->nullable();
            $table->string('heroText')->nullable();
            $table->string('slogan')->nullable();
            $table->string('horario_semana')->nullable();
            $table->string('sabado')->nullable();
            $table->string('horario_domingo')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('info');
    }
};
