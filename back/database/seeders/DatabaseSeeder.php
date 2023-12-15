<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create(['name' => 'Administrador']);
        Role::create(['name' => 'Coordinador']);
        Role::create(['name' => 'Profesor']);
        Role::create(['name' => 'Alumno']);
        Role::create(['name' => 'Invitado']);

        // Creo el usuario Administrador
        $admin = new User();
        $admin->name = 'Administrador';
        $admin->email = 'admin@admin.com';
        $admin->password = bcrypt('admin123');
        $admin->save();
        $admin->assignRole('Administrador');

        // Creo un usuario Alumno
        $alumno = new User();
        $alumno->name = 'Alumno';
        $alumno->email = 'alumno@alumno.com';
        $alumno->password = bcrypt('alumno123');
        $alumno->save();
        $alumno->assignRole('Alumno');

        // Creo un usuario Profesor
        $profesor = new User();
        $profesor->name = 'Profesor';
        $profesor->email = 'profesor@profesor.com';
        $profesor->password = bcrypt('profesor123');
        $profesor->save();
        $profesor->assignRole('Profesor');

        // Creo un usuario del sistema
        $sistema = new User();
        $sistema->name = 'Usuario del Sistema';
        $sistema->email = 'sistema@sistema.com';
        $sistema->password = bcrypt('sistema123');
        $sistema->save();

        // Asigno roles según tus necesidades al usuario del sistema
        $sistema->assignRole(['Administrador', 'Coordinador']);
        $sistema->save();
    }
}
