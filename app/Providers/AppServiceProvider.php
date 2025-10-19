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
                    'notAdminError' => session('notAdminError')
                ];
            },
        ]);
    }
}
