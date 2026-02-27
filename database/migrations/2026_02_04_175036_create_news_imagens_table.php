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
        Schema::create('news_imagens', function (Blueprint $table) {
            $table->id();
            $table->string('caminho');
            $table->string('hash')->unique();
            $table->foreignId('news_id')->constrained('news')->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news_imagens');
    }
};

