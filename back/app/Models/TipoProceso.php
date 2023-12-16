<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TipoProceso
 * 
 * @property int $id
 * @property string $nombre
 * @property int $tiempo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|ArchivoProceso[] $archivo_procesos
 *
 * @package App\Models
 */
class TipoProceso extends Model
{
	protected $table = 'tipo_proceso';

	protected $casts = [
		'tiempo' => 'int'
	];

	protected $fillable = [
		'nombre',
		'tiempo'
	];

	public function archivo_procesos()
	{
		return $this->hasMany(ArchivoProceso::class);
	}
}
