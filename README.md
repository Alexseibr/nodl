# NODL Platform Monorepo

NODL — платформа для заказчиков, мастеров, бригад, прорабов и строительных магазинов с единым API, мультиязычностью (RU/EN/PL) и мультивалютностью (BYN/RUB/PLN/EUR).

## Структура репозитория

```
/nodl
  /apps
    /api       # NestJS backend
    /web       # Next.js web-приложение
    /miniapp   # Telegram MiniApp (web)
    /mobile    # React Native SuperApp (скелет)
  /packages
    /ui        # общие UI-компоненты
    /shared    # хелперы/хуки
    /types     # DTO и модели
    /i18n      # словари переводов (RU/EN/PL)
    /config    # общие конфиги
  /infra
    /docker
    /nginx
    /ci-cd
  docker-compose.yml
  ARCHITECTURE.md
  API.md
```

## Быстрый старт (Docker Compose)

1. Скопировать переменные окружения:

   ```bash
   cp .env.example .env
   ```

2. Запустить сервисы (API, web, miniapp, Mongo, Redis, Nginx):

   ```bash
   docker-compose up --build
   ```

3. Доступы по умолчанию:
   - API: `http://localhost:3000/api`
   - Web: `http://localhost:3001`
   - MiniApp: `http://localhost:3002`
   - Nginx reverse proxy: `http://localhost`

## Разработка без Docker

- API: `cd apps/api && npm install && npm run start:dev`
- Web: `cd apps/web && npm install && npm run dev`
- MiniApp: `cd apps/miniapp && npm install && npm run dev`

## Мультиязычность и мультивалютность

- Переводы хранятся в `packages/i18n`. Клиенты получают словари через API/статический импорт и сохраняют выбранный язык в профиле пользователя.
- Базовая валюта — EUR. Локальные цены (BYN/RUB/PLN) вычисляются через Currency Service с кешированием курсов в Redis.

## Основные модули API

Скелет модулей находится в `apps/api/src/modules/*`: auth, users, masters, teams, tenders, bids, stores, geo, reviews, analytics, currency, media, notifications, admin.

## Документация

- [ARCHITECTURE.md](ARCHITECTURE.md) — архитектура, диаграммы, ERD.
- [API.md](API.md) — основные эндпоинты и роли.
