<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Proceso
 * 
 * @property int $id
 * @property int|null $usuario_id
 * @property int $tipo_proceso_id
 * @property Carbon $fecha_inicio
 * @property Carbon $fecha_termino
 * @property string $estado
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class Proceso extends Model
{
	protected $table = 'procesos';

	protected $casts = [
		'usuario_id' => 'int',
		'tipo_proceso_id' => 'int',
		'fecha_inicio' => 'datetime',
		'fecha_termino' => 'datetime'
	];

	protected $fillable = [
		'usuario_id',
		'tipo_proceso_id',
		'fecha_inicio',
		'fecha_termino',
		'estado'
	];
}
