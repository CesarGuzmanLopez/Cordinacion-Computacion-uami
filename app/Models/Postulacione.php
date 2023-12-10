<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Postulacione
 * 
 * @property int $id
 * @property int $servicio_social_id
 * @property int $usuario_id
 * @property string $motivacion
 * @property string $estado
 * @property bool $Verificado
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property ServiciosSociale $servicios_sociale
 * @property User $user
 * @property Collection|ArchivosPostulacione[] $archivos_postulaciones
 *
 * @package App\Models
 */
class Postulacione extends Model
{
	protected $table = 'postulaciones';

	protected $casts = [
		'servicio_social_id' => 'int',
		'usuario_id' => 'int',
		'Verificado' => 'bool'
	];

	protected $fillable = [
		'servicio_social_id',
		'usuario_id',
		'motivacion',
		'estado',
		'Verificado'
	];

	public function servicios_sociale()
	{
		return $this->belongsTo(ServiciosSociale::class, 'servicio_social_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'usuario_id');
	}

	public function archivos_postulaciones()
	{
		return $this->hasMany(ArchivosPostulacione::class, 'postulacion_id');
	}
}
