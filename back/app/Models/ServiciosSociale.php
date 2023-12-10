<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ServiciosSociale
 * 
 * @property int $id
 * @property int $usuario_id
 * @property string $titulo
 * @property string $descripcion
 * @property string $localizacion
 * @property string $habilidades_requeridas
 * @property Carbon $inicio
 * @property Carbon $termino
 * @property string $estado
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property User $user
 * @property Collection|Postulacione[] $postulaciones
 *
 * @package App\Models
 */
class ServiciosSociale extends Model
{
	protected $table = 'servicios_sociales';

	protected $casts = [
		'usuario_id' => 'int',
		'inicio' => 'datetime',
		'termino' => 'datetime'
	];

	protected $fillable = [
		'usuario_id',
		'titulo',
		'descripcion',
		'localizacion',
		'habilidades_requeridas',
		'inicio',
		'termino',
		'estado'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'usuario_id');
	}

	public function postulaciones()
	{
		return $this->hasMany(Postulacione::class, 'servicio_social_id');
	}
}
