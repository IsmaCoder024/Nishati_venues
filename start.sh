#!/bin/bash
set -e

echo "Running Laravel setup..."

# Ensure storage is writable
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Run migrations automatically
php artisan migrate --force || true

# Cache config and routes for performance
php artisan config:cache || true
php artisan route:cache || true

# Start Apache
apache2-foreground
