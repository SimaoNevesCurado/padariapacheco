<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('produtos')) {
            return;
        }

        if (Schema::getConnection()->getDriverName() === 'sqlite') {
            return;
        }

        if (
            Schema::hasTable('unidades')
            && Schema::hasColumn('produtos', 'unidade_id')
            && ! $this->foreignKeyExists('produtos', 'produtos_unidade_id_foreign')
        ) {
            Schema::table('produtos', function (Blueprint $table) {
                $table->foreign('unidade_id')
                    ->references('id')
                    ->on('unidades')
                    ->cascadeOnDelete();
            });
        }

        if (
            Schema::hasTable('categorias')
            && Schema::hasColumn('produtos', 'categoria_id')
            && ! $this->foreignKeyExists('produtos', 'produtos_categoria_id_foreign')
        ) {
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
        if (! Schema::hasTable('produtos')) {
            return;
        }

        if (Schema::getConnection()->getDriverName() === 'sqlite') {
            return;
        }

        Schema::table('produtos', function (Blueprint $table) {
            if ($this->foreignKeyExists('produtos', 'produtos_unidade_id_foreign')) {
                $table->dropForeign('produtos_unidade_id_foreign');
            }

            if ($this->foreignKeyExists('produtos', 'produtos_categoria_id_foreign')) {
                $table->dropForeign('produtos_categoria_id_foreign');
            }
        });
    }

    private function foreignKeyExists(string $table, string $constraint): bool
    {
        $driver = Schema::getConnection()->getDriverName();

        if ($driver === 'pgsql') {
            return DB::table('information_schema.table_constraints')
                ->where('table_name', $table)
                ->where('constraint_name', $constraint)
                ->where('constraint_type', 'FOREIGN KEY')
                ->exists();
        }

        if ($driver === 'mysql') {
            return DB::table('information_schema.table_constraints')
                ->where('table_schema', DB::getDatabaseName())
                ->where('table_name', $table)
                ->where('constraint_name', $constraint)
                ->where('constraint_type', 'FOREIGN KEY')
                ->exists();
        }

        return DB::table('information_schema.table_constraints')
            ->whereRaw('1 = 0')
            ->exists();
    }
};
