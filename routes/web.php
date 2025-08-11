<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TempahanController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard'); 

    Route::get('daftar-tempahan', [TempahanController::class, 'index'])->name('daftar-tempahan');
    Route::post('submit-tempahan', [TempahanController::class, 'store'])->name('store.reservation');
    Route::get('calendar', [TempahanController::class, 'reservationCalendar'])->name('calendar');
    // Route::get('senarai-tempahan', [TempahanController::class, 'senaraiTempahan'])->name('senarai-tempahan'); 
    Route::get('senarai-tempahan', [TempahanController::class, 'senaraiTempahan'])->name('reservation.list'); 
    // Route::get('get-user', [TempahanController::class, 'getUsers'])->name('users.list'); 
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('manage-room', function () {
        // return Inertia::render('manage-room');
    })->name('manage.room');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
