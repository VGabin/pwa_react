FROM php:8.2-fpm

COPY ../../back /var/www/html

RUN apt-get update && apt-get install -y curl \
    && curl -o /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it

RUN docker-php-ext-install pdo pdo_mysql
