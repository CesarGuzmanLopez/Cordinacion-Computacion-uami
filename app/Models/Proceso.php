<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Proceso
 * 
 * @property int $id
 * @property Carbon $fecha_inicio
 * @property Carbon $fecha_termino
 * @property string $estado
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Archivo[] $archivos
 *
 * @package App\Models
 */
class Proceso extends Model
{
	protected $table = 'procesos';

	protected $casts = [
		'fecha_inicio' => 'datetime',
		'fecha_termino' => 'datetime'
	];

	protected $fillable = [
		'fecha_inicio',
		'fecha_termino',
		'estado'
	];

	public function archivos()
	{
		return $this->hasMany(Archivo::class);
	}
}
