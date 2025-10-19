# Use the official PHP image with Apache
FROM php:8.2-apache

# Set working directory inside container
WORKDIR /var/www/html

# Install system dependencies and PHP extensions required by Laravel
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libzip-dev \
    zip \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd mbstring zip exif pcntl bcmath pdo pdo_mysql \
    && a2enmod rewrite

# Copy existing application files
COPY . /var/www/html

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Set correct permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 80 for Apache
EXPOSE 80

# Set the Apache document root to public directory
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

# Update Apache config to point to Laravel's public folder
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf

# Start Apache on Render's port
CMD sed -i "s/Listen 80/Listen ${PORT:-80}/" /etc/apache2/ports.conf && apache2-foreground
