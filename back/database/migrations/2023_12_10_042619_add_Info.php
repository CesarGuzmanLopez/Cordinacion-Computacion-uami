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
        Schema::table('users', function (Blueprint $table) {
            $table->string('matricula')->nullable(); // Para Alumno
            $table->string('carrera')->nullable(); // Para Alumno
            $table->string('numero_empleado')->nullable(); // Para Profesor y Coordinador
            $table->string('departamento')->nullable(); // Para Profesor y Coordinador
            $table->string('telefono')->nullable();
            $table->string('extension')->nullable(); // Para Profesor y Coordinador
            $table->string('ubicacion')->nullable(); // Para Profesor y Coordinador
            $table->string('horario')->nullable(); // Para Profesor y Coordinador
            $table->string('foto')->nullable(); // Para Profesor, Coordinador y Alumno
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([ 'matricula', 'carrera', 'numero_empleado', 'departamento', 'telefono', 'extension', 'ubicacion', 'horario', 'foto']);
        });
    }
};
