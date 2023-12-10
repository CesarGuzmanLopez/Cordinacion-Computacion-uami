<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ArchivosPostulacione
 * 
 * @property int $id
 * @property int $postulacion_id
 * @property string $nombre
 * @property string $ruta
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Postulacione $postulacione
 *
 * @package App\Models
 */
class ArchivosPostulacione extends Model
{
	protected $table = 'archivos_postulaciones';

	protected $casts = [
		'postulacion_id' => 'int'
	];

	protected $fillable = [
		'postulacion_id',
		'nombre',
		'ruta'
	];

	public function postulacione()
	{
		return $this->belongsTo(Postulacione::class, 'postulacion_id');
	}
}
