<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class Login extends Controller
{
    public function index()
    {
        //averiguo si el usuario esta logeadss
        $user = Auth::user();
        $rol = "Invitado";
        if ($user) {
            $user = User::where('id', $user->id)->first();
            $rol = $user->getRoleNames()->first();
        }
        //retorno ek rik del usuario y el token de la sesion
        return response()->json(['status' => 'ok', 'rol' => $rol], 200);

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

        if (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
            $user = User::where('matricula', $request->email)->first();
            if ($user) {
                $request->email = $user->email;
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Usuario o contraseña incorrecta',
                ], 401);
            }
        }
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();
            $user = User::where('id', $user->id)->first();
            $rol = Auth::user()->getRoleNames()->first();
            // obtenemos el token para el usuario
            $token = $user->createToken('authToken')->plainTextToken;
            // retornamos el token y el rol del usuario
            return response()->json(['status' => 'ok', 'token' => $token, 'rol' => $rol], 200);
        } else {
            return response()->json(['status'=> 'error', 'message'=> 'no se pudo iniciar session'],401);
        }
    }

    //cierro sesion
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['status' => 'ok'], 200);
    }
}
