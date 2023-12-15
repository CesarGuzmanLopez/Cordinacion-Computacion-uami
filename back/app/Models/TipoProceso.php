<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
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
 * @package App\Models
 */
class TipoProceso extends Model
{
	protected $table = 'Tipo_proceso';

	protected $casts = [
		'tiempo' => 'int'
	];

	protected $fillable = [
		'nombre',
		'tiempo'
	];
}
