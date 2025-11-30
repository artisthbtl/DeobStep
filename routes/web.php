<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Di sini tempat kita daftarin route untuk aplikasi.
| Karena kita pakai Inertia + React, kita cuma perlu return Inertia render.
|
*/

// Route Utama (Landing Page)
Route::get('/', function () {
    // Ini akan merender file: resources/js/Pages/Home.jsx
    return Inertia::render('Home');
})->name('home');