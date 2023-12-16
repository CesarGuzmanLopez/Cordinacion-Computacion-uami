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
 * @property int $usuario_id
 * @property string $nombre
 * @property string $ruta
 * @property string $estado
 * @property int $tipo_id
 * @property int|null $proceso_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Proceso|null $proceso
 * @property TiposArchivo $tipos_archivo
 * @property User $user
 * @property Collection|ArchivoUsuarioVerificador[] $archivo_usuario_verificadors
 *
 * @package App\Models
 */
class Archivo extends Model
{
	protected $table = 'archivos';

	protected $casts = [
		'usuario_id' => 'int',
		'tipo_id' => 'int',
		'proceso_id' => 'int'
	];

	protected $fillable = [
		'usuario_id',
		'nombre',
		'ruta',
		'estado',
		'tipo_id',
		'proceso_id'
	];

	public function proceso()
	{
		return $this->belongsTo(Proceso::class);
	}

	public function tipos_archivo()
	{
		return $this->belongsTo(TiposArchivo::class, 'tipo_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'usuario_id');
	}

	public function archivo_usuario_verificadors()
	{
		return $this->hasMany(ArchivoUsuarioVerificador::class);
	}
}
