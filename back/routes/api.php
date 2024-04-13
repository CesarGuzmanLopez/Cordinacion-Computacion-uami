<?php

use App\Http\Controllers\AppWeb;
use App\Http\Controllers\Login;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/login',[Login::class,'index']);
Route::post('/login',[Login::class,'Login']);
Route::post('/logout',[Login::class,'logout']);
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);
//agrego paginas que solo pueden ser vistas por usuarios autenticados
//Route::middleware('auth:sanctum')->get('/appWeb', AppWeb::class, 'index' );

Route::get('/user',[UserController::class,'index']);
