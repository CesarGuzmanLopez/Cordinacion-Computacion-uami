<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TiposArchivo
 * 
 * @property int $id
 * @property string $nombre
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Archivo[] $archivos
 *
 * @package App\Models
 */
class TiposArchivo extends Model
{
	protected $table = 'tipos_archivo';

	protected $fillable = [
		'nombre'
	];

	public function archivos()
	{
		return $this->hasMany(Archivo::class, 'tipo_id');
	}
}
