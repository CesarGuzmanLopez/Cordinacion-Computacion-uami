<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class Login extends Controller
{
    public function index()
    {
        //envio el codigo csrf para los formularios y codigo de conexion correcta
        return response()->json(['status' => 'ok', 'csrf' => csrf_token()]);
    }
    //verifico si el usuario existe e inicio sesion si no regreso error de usuario o contraseña incorrecta
    //con error unhautorized 401 para que el front lo maneje
    //esto sera por metodo post
    /**
     * @param Request $request
     * @var  User $user
     */
    public function Login(Request $request)
    {
    // si la el email no es un correo busco la matricula en la base de datos y obtengo el cooreo
    //para iniciar sesion
        if (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
            $user = User::where('matricula', $request->email)->first();
            if ($user) {
                $request->email = $user->email;
            } else {
                return response()->json(['status' => 'error', 'message' => 'Usuario o contraseña incorrecta'], 401);
            }
        }
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();
            $user = User::where('id', $user->id)->first();
            $rol = $user->rol;
            return response()->json(['status' => 'ok', 'rol'=> $rol ], 200);
        } else {
            return response()->json(['status'=> 'error', 'message'=> 'no se pudo iniciar session'],0);
        }
    }

}
