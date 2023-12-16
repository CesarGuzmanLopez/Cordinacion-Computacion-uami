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
        // Tipos de archivos del proceso
        // Ejemplo carta de aceptación de servicio social
        Schema::create('tipos_archivo', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->timestamps();
        });

        // Tipo de proceso por ejemplo servicio social
        Schema::create('tipo_proceso', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            // Tiempo que dura el proceso en días
            $table->integer('tiempo');
            $table->timestamps();
        });

        // Procesos por ejemplo servicio social
        // El usuario que crea la solicitud puede ser un alumno o un profesor
        Schema::create('procesos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('usuario_id')->nullable(); // Id del alumno interesado
            $table->unsignedBigInteger('tipo_proceso_id');
            $table->date('fecha_inicio');
            $table->date('fecha_termino');
            $table->enum('estado', ['Activo', 'Cancelado'])->default('Activo');
            $table->timestamps();
        });

        // Archivos subidos por el usuario
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

        // Estado de verificación del archivo por los usuarios que deben verificarlo
        // Estos usuarios pueden ser profesores coordinadores y administradores
        Schema::create('archivo_usuario_verificador', function (Blueprint $table) {
            $table->unsignedBigInteger('archivo_id');
            $table->unsignedBigInteger('usuario_verificador_id');
            $table->enum('estado', ['No Verificado', 'Verificado'])->default('No Verificado');
            $table->timestamps();
            $table->primary(['archivo_id', 'usuario_verificador_id']);
            $table->foreign('archivo_id')->references('id')->on('archivos')->onDelete('cascade');
            $table->foreign('usuario_verificador_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Archivos necesarios por procesos relacion Tipo_archivo y Tipo_proceso
        Schema::create('archivo_proceso', function (Blueprint $table) {
            $table->unsignedBigInteger('tipo_archivo_id');
            $table->unsignedBigInteger('tipo_proceso_id');
            $table->timestamps();
            $table->primary(['tipo_archivo_id', 'tipo_proceso_id']);
            $table->foreign('tipo_archivo_id')->references('id')->on('tipos_archivo')->onDelete('cascade');
            $table->foreign('tipo_proceso_id')->references('id')->on('tipo_proceso')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('archivo_proceso');
        Schema::dropIfExists('archivo_usuario_verificador');
        Schema::dropIfExists('archivos');
        Schema::dropIfExists('procesos');
        Schema::dropIfExists('tipo_proceso');
        Schema::dropIfExists('tipos_archivo');
    }
};

