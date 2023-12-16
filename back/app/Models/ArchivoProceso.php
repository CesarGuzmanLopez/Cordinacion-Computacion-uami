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
 * @property int $tipo_archivo_id
 * @property int $tipo_proceso_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property TiposArchivo $tipos_archivo
 * @property TipoProceso $tipo_proceso
 *
 * @package App\Models
 */
class ArchivoProceso extends Model
{
	protected $table = 'archivo_proceso';
	public $incrementing = false;

	protected $casts = [
		'tipo_archivo_id' => 'int',
		'tipo_proceso_id' => 'int'
	];

	public function tipos_archivo()
	{
		return $this->belongsTo(TiposArchivo::class, 'tipo_archivo_id');
	}

	public function tipo_proceso()
	{
		return $this->belongsTo(TipoProceso::class);
	}
}
