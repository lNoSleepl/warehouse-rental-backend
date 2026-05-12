# Warehouse Rental Backend

API для аренды складов на NestJS + TypeORM + PostgreSQL.

## Стек
- NestJS + TypeScript
- PostgreSQL (Docker)
- TypeORM
- JWT авторизация
- Swagger документация
- Архитектура DDD

## Запуск

1. Клонировать репозиторий
2. Создать `.env` файл по образцу `.env.example`
3. Запустить Postgres: `docker-compose up -d`
4. Установить зависимости: `npm install`
5. Запустить сервер: `npm run start:dev`

## Документация API
http://localhost:3000/api/docs