FROM node:20-alpine AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Чтобы работал turbo можно использовать npx, но глобальный пакет надежнее в Docker
RUN npm install -g turbo

# Принимаем имя приложения как аргумент
ARG APP_SCOPE
RUN test -n "$APP_SCOPE" || (echo "APP_SCOPE is required" && false)

# Копируем весь монорепозиторий в Docker-контекст
COPY . .

# Turbo создает папку /app/out с выжимкой нужных файлов для APP_NAME
RUN turbo prune ${APP_SCOPE} --docker

# Установка и сборка
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Устанавливаем pnpm
RUN npm install -g pnpm turbo

ARG APP_SCOPE

# Копируем package.json и lock-файлы из pruner
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Устанавливаем зависимости.
# Этот слой закэшируется Docker'ом и не будет пересобираться, если меняется только код
RUN pnpm install --frozen-lockfile

# Копируем исходный код приложения и пакетов
COPY --from=pruner /app/out/full/ .

# Собираем конкретное приложение
RUN turbo run build --filter=${APP_SCOPE}

# Создание содержимого контейнера для ghrc.io
FROM nginx:alpine AS runner

ARG APP_DIR

# Удаляем дефолтный конфиг
RUN rm /etc/nginx/conf.d/default.conf

# Копируем общий конфиг nginx
COPY shared/nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранный dist из этапа Builder
COPY --from=builder /app/apps/${APP_DIR}/dist/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
