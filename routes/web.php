<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VenueController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Auth\AuthenticatedSessionController;


// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });


    //Homepage
Route::get('/home', function(){
    return Inertia::render('User/Homepage');
})->name('home');


    //Admin routes
//Admin dashboard
Route::get('/admin', function(){
    return Inertia::render('Admin/AdminDashboard');
})->name('admin');

//Add new venue
Route::get('/new', function(){
    return Inertia::render('Admin/NewVenue');
})->name('new');

Route::post('/new',
    [VenueController::class, 'create']
)->name('new');

//Update venue
Route::get('/update', function(){
    return Inertia::render('Admin/UpdateVenue');
})->name('update');
//Delete venue
Route::get('/delete', function(){
    return Inertia::render('Admin/DeleteVenue');
})->name('delete');


    //User routes
//registration
Route::get('/register', function(){
    return Inertia::render('User/RegistrationForm');
})->name('register');

Route::post('/register',
    [UserController::class, 'create']
)->name('register');

//login
Route::get('/login', function(){
    return Inertia::render('User/LoginForm');
})->name('login');


Route::post('/login',
    [UserController::class, 'login']
)->name('login');

Route::middleware(['auth'])->group(function (){ 
//booking
Route::get('/book',
    [VenueController::class, 'display']
)->name('book');

Route::post('/book',
    [VenueController::class, 'book']
)->name('book');

});


// require __DIR__.'/auth.php';
