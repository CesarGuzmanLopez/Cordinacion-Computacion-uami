<?php

use App\Http\Controllers\Login;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/login',[Login::class,'index']);
Route::post('/login',[Login::class,'Login']);
Route::post('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);
