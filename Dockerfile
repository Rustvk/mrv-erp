# Используем легковесный Nginx
FROM nginx:alpine

# Задаем аргумент сборки (имя приложения в папке apps/)
ARG APP_NAME

# Проверяем, что аргумент был передан (защита от ошибок)
RUN test -n "$APP_NAME" || (echo "APP_NAME argument is required" && false)

# Удаляем дефолтный конфиг
RUN rm /etc/nginx/conf.d/default.conf

# Копируем nginx.conf.
# В этом примере предполагается, что у каждого приложения есть свой конфиг.
# Если конфиг один на всех, измените путь на COPY shared-nginx.conf /etc/nginx/conf.d/default.conf
COPY shared/nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранную папку dist конкретного приложения в Nginx
COPY apps/${APP_NAME}/dist/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
