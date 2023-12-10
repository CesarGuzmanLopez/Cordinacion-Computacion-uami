<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;

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
        $user = $request->input('user');
        $pass = $request->input('pass');

        $user = User::where('user', $user)->where('pass', $pass)->first();
        if ($user) {
            $request->session()->regenerate();
            $request->session()->put('id', $user->id);
            return response()->json(['status' => 'ok', 'user' => $user]);
        } else {
            //si no existe el usuario retorno error
            return response()->json(['status' => 'error', 'message' => 'Usuario o contraseña incorrecta'], 401);
        }
    }

}
