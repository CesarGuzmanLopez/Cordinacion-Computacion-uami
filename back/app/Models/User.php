<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 * 
 * @property int $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string $rol
 * @property string|null $matricula
 * @property string|null $carrera
 * @property string|null $numero_empleado
 * @property string|null $departamento
 * @property string|null $telefono
 * @property string|null $extension
 * @property string|null $ubicacion
 * @property string|null $horario
 * @property string|null $foto
 * 
 * @property Collection|ArchivoUsuarioVerificador[] $archivo_usuario_verificadors
 * @property Collection|Archivo[] $archivos
 * @property Collection|Postulacione[] $postulaciones
 * @property Collection|ServiciosSociale[] $servicios_sociales
 *
 * @package App\Models
 */
class User extends Model
{
	protected $table = 'users';

	protected $casts = [
		'email_verified_at' => 'datetime'
	];

	protected $hidden = [
		'password',
		'remember_token'
	];

	protected $fillable = [
		'name',
		'email',
		'email_verified_at',
		'password',
		'remember_token',
		'rol',
		'matricula',
		'carrera',
		'numero_empleado',
		'departamento',
		'telefono',
		'extension',
		'ubicacion',
		'horario',
		'foto'
	];

	public function archivo_usuario_verificadors()
	{
		return $this->hasMany(ArchivoUsuarioVerificador::class, 'usuario_verificador_id');
	}

	public function archivos()
	{
		return $this->hasMany(Archivo::class, 'usuario_id');
	}

	public function postulaciones()
	{
		return $this->hasMany(Postulacione::class, 'usuario_id');
	}

	public function servicios_sociales()
	{
		return $this->hasMany(ServiciosSociale::class, 'usuario_id');
	}
}
