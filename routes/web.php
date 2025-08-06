<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\AdminMiddleware;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Route::get('/manage-room', function () {
//     return 'Welcome, Admin!';
// })->middleware(AdminMiddleware::class);
Route::middleware(['auth', 'admin'])->get('/manage-user', function () {
    return 'Welcome, Admin!';
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
