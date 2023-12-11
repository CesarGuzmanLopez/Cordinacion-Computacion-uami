<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        $nuevoUsuario->email = '88-8@live.com.mx';
        $nuevoUsuario->password = bcrypt('12345678');
        $nuevoUsuario->save();
        $nuevoUsuario->assignRole('Administrador');
        $nuevoUsuario->save();
    }
}
