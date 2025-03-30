FROM php:8.3-apache

# Instal·la extensions necessàries per a Drupal
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip unzip \
    && docker-php-ext-install pdo pdo_mysql gd opcache

# Activa mod_rewrite per als URLs amigables de Drupal
RUN a2enmod rewrite

# Copia el php.ini
COPY php.ini /usr/local/etc/php/

# Estableix el document root a /web
ENV APACHE_DOCUMENT_ROOT=/var/www/html/web

# Modifica el VirtualHost per fer servir el nou document root
RUN sed -ri -e 's!/var/www/html!/var/www/html/web!g' /etc/apache2/sites-available/000-default.conf

# Dona permisos correctes al document root
RUN echo "<Directory /var/www/html/web/> \n\
    AllowOverride All \n\
    Require all granted \n\
</Directory>" > /etc/apache2/conf-available/custom-permissions.conf \
    && a2enconf custom-permissions
