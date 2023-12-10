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
        Schema::create('tipos_archivo', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->timestamps();
        });

        Schema::create('archivos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('usuario_id');
            $table->string('nombre');
            $table->string('ruta');
            $table->enum('estado', ['No Verificado', 'Verificado'])->default('No Verificado');
            $table->unsignedBigInteger('tipo_id');
            $table->unsignedBigInteger('proceso_id')->nullable();
            $table->timestamps();

            $table->foreign('usuario_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('tipo_id')->references('id')->on('tipos_archivo')->onDelete('restrict');
            $table->foreign('proceso_id')->references('id')->on('procesos')->onDelete('set null');
        });

        Schema::create('archivo_usuario_verificador', function (Blueprint $table) {
            $table->unsignedBigInteger('archivo_id');
            $table->unsignedBigInteger('usuario_verificador_id');
            $table->enum('estado', ['No Verificado', 'Verificado'])->default('No Verificado');
            $table->timestamps();

            $table->primary(['archivo_id', 'usuario_verificador_id']);
            $table->foreign('archivo_id')->references('id')->on('archivos')->onDelete('cascade');
            $table->foreign('usuario_verificador_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('procesos', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_inicio');
            $table->date('fecha_termino');
            $table->enum('estado', ['Activo', 'Cancelado'])->default('Activo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('archivo_usuario_verificador');
        Schema::dropIfExists('archivos');
        Schema::dropIfExists('procesos');
        Schema::dropIfExists('tipos_archivo');
    }
};
