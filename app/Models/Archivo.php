<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Archivo
 * 
 * @property int $id
 * @property string $nombre
 * @property string $ruta
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|ArchivoUsuarioVerificador[] $archivo_usuario_verificadors
 *
 * @package App\Models
 */
class Archivo extends Model
{
	protected $table = 'archivos';

	protected $fillable = [
		'nombre',
		'ruta'
	];

	public function archivo_usuario_verificadors()
	{
		return $this->hasMany(ArchivoUsuarioVerificador::class);
	}
}
