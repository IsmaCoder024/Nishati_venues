# --- Base image ---
FROM php:8.3-apache

# --- System dependencies ---
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev libzip-dev libpq-dev nodejs npm \
    && docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd zip

# --- Enable Apache rewrite ---
RUN a2enmod rewrite

# --- Set working directory ---
WORKDIR /var/www/html

# --- Copy application code ---
COPY . .

# --- Install Composer globally ---
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# --- Install PHP dependencies ---
RUN composer install --no-dev --optimize-autoloader

# --- Discover Laravel packages ---
RUN php artisan package:discover --ansi

# --- Build frontend with Vite ---
RUN npm install && npm run build

# --- Fix permissions ---
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# --- Set Apache root to /public and enable .htaccess ---
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf
RUN echo '<Directory /var/www/html/public>\nAllowOverride All\n</Directory>' >> /etc/apache2/apache2.conf

# --- Copy startup script ---
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# --- Expose port ---
EXPOSE 80

# --- Start container ---
CMD ["start.sh"]
