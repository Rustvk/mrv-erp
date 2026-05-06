# Используем легковесный Nginx
FROM nginx:alpine

# Удаляем дефолтный конфиг
RUN rm /etc/nginx/conf.d/default.conf

# Копируем наш конфиг Nginx для SPA (создадим его в следующем шаге)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранную папку dist в Nginx
COPY dist/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
