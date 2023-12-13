<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
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

        //Creo al usuario Administrador
        $nuevoUsuario = new User();
        $nuevoUsuario->name = 'Administrador';
        $nuevoUsuario->email = 'admin@admin.com';
        $nuevoUsuario->password = bcrypt('admin123');
        $nuevoUsuario->save();
        $nuevoUsuario->assignRole('Administrador');
        $nuevoUsuario->save();
    }
}
