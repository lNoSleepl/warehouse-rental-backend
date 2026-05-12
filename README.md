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


### Через Docker (рекомендуется)

  git clone https://github.com/INoSleepl/warehouse-rental-backend.git
  cd warehouse-rental-backend
  cp .env.example .env
  docker-compose up --build

### Локально

  npm install
  docker-compose up -d postgres  # только база данных
  npm run start:dev

## Документация API
http://localhost:3000/api/docs
