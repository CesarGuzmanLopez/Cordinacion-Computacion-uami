<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        "*",
        "/api",
        "http://localhost:3000",
        "http://localhost:3000/*",
        //ionic
        "http://localhost:8100",
        "http://localhost:8100/*",
    ];
}
