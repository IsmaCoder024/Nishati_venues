# Base PHP image
FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    bash \
    git \
    unzip \
    libzip-dev \
    oniguruma-dev \
    icu-dev \
    zlib-dev \
    curl \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql zip bcmath intl

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy Laravel project files into the container
COPY . .

# Copy nginx config into container
COPY ./conf/nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy start script into container
COPY ./scripts/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Expose HTTP port
EXPOSE 80

# Start script (launch nginx + php-fpm)
CMD ["/usr/local/bin/start.sh"]
