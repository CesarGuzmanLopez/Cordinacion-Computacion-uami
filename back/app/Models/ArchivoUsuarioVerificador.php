<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ArchivoUsuarioVerificador
 * 
 * @property int $archivo_id
 * @property int $usuario_verificador_id
 * @property string $estado
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Archivo $archivo
 * @property User $user
 *
 * @package App\Models
 */
class ArchivoUsuarioVerificador extends Model
{
	protected $table = 'archivo_usuario_verificador';
	public $incrementing = false;

	protected $casts = [
		'archivo_id' => 'int',
		'usuario_verificador_id' => 'int'
	];

	protected $fillable = [
		'estado'
	];

	public function archivo()
	{
		return $this->belongsTo(Archivo::class);
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'usuario_verificador_id');
	}
}
