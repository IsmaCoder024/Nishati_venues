<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Inertia::share([
            'flash' => function () {
                return [
                    'registerSuccess' => session('registerSuccess'),
                    'registerError' => session('registerError'),

                    'logSuccess' => session('logSuccess'),
                    'logError' => session('logError'),

                    'notAdminError' => session('notAdminError'),

                    'venueSuccess' => session('venueSuccess'),
                    'venueError' => session('venueError'),
                    
                    'updateUserSuccess' => session('updateUserSuccess'),
                    'updateUserError' => session('updateUserError'),

                    'updateVenueSuccess' => session('updateVenueSuccess'),
                    'updateVenueError' => session('updateVenueError'),

                    'bookSuccess' => session('bookSuccess'),
                    'bookError' => session('bookError'),
                    'bookTimeError' => session('bookTimeError'),
                    
                ];
            },
        ]);
    }
}
