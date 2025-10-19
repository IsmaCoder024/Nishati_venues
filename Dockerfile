# Use PHP + Apache
FROM php:8.2-apache

WORKDIR /var/www/html

# Install PHP extensions & dependencies
RUN apt-get update && apt-get install -y \
    git unzip libpng-dev libjpeg-dev libfreetype6-dev libonig-dev libzip-dev zip curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd mbstring zip exif pcntl bcmath pdo pdo_mysql \
    && a2enmod rewrite

# Copy app files
COPY . /var/www/html

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Fix permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Apache config
RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf \
    && echo "DirectoryIndex index.php" >> /etc/apache2/apache2.conf \
    && echo '<Directory /var/www/html/public>\nAllowOverride All\nRequire all granted\n</Directory>' > /etc/apache2/conf-available/laravel.conf \
    && a2enconf laravel

# Expose Render port
EXPOSE 10000

# Run Apache on Render port
CMD sed -i "s/Listen 80/Listen ${PORT:-10000}/" /etc/apache2/ports.conf && apache2-foreground
