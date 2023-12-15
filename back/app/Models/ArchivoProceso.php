<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ArchivoProceso
 * 
 * @property int $archivo_id
 * @property int $proceso_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Archivo $archivo
 * @property Proceso $proceso
 *
 * @package App\Models
 */
class ArchivoProceso extends Model
{
	protected $table = 'archivo_proceso';
	public $incrementing = false;

	protected $casts = [
		'archivo_id' => 'int',
		'proceso_id' => 'int'
	];

	public function archivo()
	{
		return $this->belongsTo(Archivo::class);
	}

	public function proceso()
	{
		return $this->belongsTo(Proceso::class);
	}
}
