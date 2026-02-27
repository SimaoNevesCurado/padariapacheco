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
        Schema::create('imagens', function (Blueprint $table) {

            $table->id();

            $table->string('caminho');

            $table->string('hash')->unique(); // Add this line - required by your controller

            $table->foreignId('produto_id')
                ->constrained('produtos')
                ->cascadeOnDelete();


            $table->boolean('on_vitrine')->default(false); // Changed from is_principal to match controller

            $table->timestamps();

            $table->softDeletes();

        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imagens'); // Fixed typo: was 'imagems'
    }
};
