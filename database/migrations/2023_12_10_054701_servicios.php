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
        Schema::create('servicios_sociales', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('usuario_id'); // Profesor u organización responsable
            $table->string('titulo');
            $table->text('descripcion');
            $table->string('localizacion');
            $table->text('habilidades_requeridas');
            $table->date('inicio');
            $table->date('termino');
            $table->enum('estado', ['Abierto', 'Cerrado'])->default('Abierto');
            $table->timestamps();

            $table->foreign('usuario_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('postulaciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('servicio_social_id');
            $table->unsignedBigInteger('usuario_id'); // Estudiante que se postula
            $table->text('motivacion');
            $table->enum('estado', ['Pendiente', 'Aceptada', 'Rechazada'])->default('Pendiente');
            $table->boolean('Verificado')->default(false); // Nuevo campo para verificación por coordinador
            $table->timestamps();

            $table->foreign('servicio_social_id')->references('id')->on('servicios_sociales')->onDelete('cascade');
            $table->foreign('usuario_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('archivos_postulaciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('postulacion_id');
            $table->string('nombre');
            $table->string('ruta');
            $table->timestamps();

            $table->foreign('postulacion_id')->references('id')->on('postulaciones')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('archivos_postulaciones');
        Schema::dropIfExists('postulaciones');
        Schema::dropIfExists('servicios_sociales');
    }
};
