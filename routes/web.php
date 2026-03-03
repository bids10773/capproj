<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth; // Added for Auth check
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\UserController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// 1. Admin-only Routes (Protected by your AdminMiddleware)
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard');
    
    Route::get('/users', [UserController::class, 'index'])->name('admin.users');
    Route::post('/users', [UserController::class, 'store'])->name('admin.users.store');
});

// 2. Standard User Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        // FIX: If an Admin lands here (e.g., reopening a tab), send them to Admin Dashboard
        if (Auth::user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Doctor Dashboard - uses staff.verified middleware to allow admin-created staff
    Route::middleware(['staff.verified'])->group(function () {
        Route::get('/doctor/dashboard', function () {
            if (Auth::user()->role !== 'doctor') {
                return redirect()->route('dashboard');
            }
            return Inertia::render('doctor/dashboard');
        })->name('doctor.dashboard');

        // MedTech Dashboard
        Route::get('/medtech/dashboard', function () {
            if (Auth::user()->role !== 'medtech') {
                return redirect()->route('dashboard');
            }
            return Inertia::render('medtech/dashboard');
        })->name('medtech.dashboard');

        // RadTech Dashboard
        Route::get('/radtech/dashboard', function () {
            if (Auth::user()->role !== 'radtech') {
                return redirect()->route('dashboard');
            }
            return Inertia::render('radtech/dashboard');
        })->name('radtech.dashboard');
    });
});

require __DIR__.'/settings.php';
