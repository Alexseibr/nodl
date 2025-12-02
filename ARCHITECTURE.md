# Архитектура NODL

## Обзор

Платформа объединяет веб, Telegram MiniApp и мобильное приложение вокруг единого API (Node.js + NestJS) и MongoDB. Redis используется для кешей (сессии, курсы валют, антифрод). Nginx даёт единый вход и маршрутизацию по доменам/путям.

## Высокоуровневая диаграмма

```mermaid
graph TD
  subgraph Clients
    W[Next.js Web] -->|REST/GraphQL| API
    M[Telegram MiniApp] -->|REST/GraphQL| API
    RN[React Native] -->|REST/GraphQL| API
  end

  subgraph Backend
    API[NestJS API Gateway] --> AuthSvc
    API --> UserSvc
    API --> MasterSvc
    API --> TenderSvc
    API --> BidSvc
    API --> GeoSvc
    API --> StoreSvc
    API --> ReviewSvc
    API --> AnalyticsSvc
    API --> CurrencySvc
    API --> MediaSvc
    API --> NotificationSvc
    API --> AdminSvc
  end

  subgraph Data
    Mongo[(MongoDB)]
    Redis[(Redis Cache)]
    Media[(S3/MinIO bucket)]
  end

  AuthSvc --> Mongo
  UserSvc --> Mongo
  MasterSvc --> Mongo
  TenderSvc --> Mongo
  BidSvc --> Mongo
  GeoSvc --> Mongo
  StoreSvc --> Mongo
  ReviewSvc --> Mongo
  AnalyticsSvc --> Mongo
  CurrencySvc --> Redis
  NotificationSvc --> Redis
  MediaSvc --> Media

  extRates[FX Provider] --> CurrencySvc
  SMS[SMS/Telegram] --> AuthSvc
```

## Модули backend

- **Auth Service** — OTP по телефону, Telegram OAuth, refresh-токены, сохранение языка/страны.
- **User Service** — профили, роли, KYC/верификация мастеров и бригад.
- **Masters & Teams Service** — карточки, специализации, портфолио, календарь занятости.
- **Tenders & Orders Service** — создание/фильтрация тендеров, трансформация в заказы.
- **Bids Service** — отклики с ценой/сроком/гарантией, статусная машина.
- **Stores & Materials Service** — витрины, склады, спецпредложения.
- **Geo Service** — геозоны, поиск в радиусе, обратное геокодирование.
- **Ratings & Reviews Service** — оценки с причинами, антифрод.
- **Analytics & Heatmap** — события, конверсия, тепловые карты спроса/предложения.
- **Currency Service** — курсы, кеширование, конвертация из базовой валюты (EUR) в локальную (BYN/RUB/PLN).
- **Media Service** — загрузка, сжатие, CDN/S3-совместимое хранилище.
- **Notifications** — Telegram/push/email очереди.
- **Admin** — модерация, просмотр аналитики и антифрода.

## Роли и доступы

- **Customer** — создаёт тендеры, выбирает исполнителей, оставляет отзывы.
- **Master** — индивидуальный исполнитель, портфолио, отклики, график.
- **Team** — бригада с несколькими мастерами, управляется прорабом.
- **Foreman** — управляет несколькими бригадами, получает аналитику по ним.
- **Store** — управляет товарами/складами, публикует промо.
- **Admin** — модерация и операционная поддержка.

## Мультиязычность

- Заголовок `Accept-Language` (fallback: `DEFAULT_LOCALE` из `.env`).
- Словари RU/EN/PL хранятся в `packages/i18n` и кешируются на клиентах.
- Язык сохраняется в профиле пользователя и подставляется в уведомления.

## Мультивалютность

- Базовая валюта: EUR.
- Цены сущностей (тендер, ставка, заказ) хранят `amount_eur` и `amount_local + currency`.
- Currency Service тянет курсы (`CURRENCY_API_URL`), кладёт в Redis, конвертирует для ответов API.

## Гео и выдача "как Яндекс Go"

- Geo Service хранит геозоны (страна/регион/город/район) и радиусные запросы.
- API отдаёт ленты "заказы рядом" для мастеров и "мастера рядом" для заказчиков с фильтрами по специализациям.

## Sequence: создание тендера и отклики

```mermaid
sequenceDiagram
  participant C as Customer (web/mobile)
  participant API as API Gateway
  participant T as Tenders Service
  participant B as Bids Service
  participant M as Master

  C->>API: POST /tenders (описание, бюджет, адрес)
  API->>T: createTender()
  T-->>API: tenderId, geo
  API-->>C: 201 Created
  API-->>M: push/telegram "Новый тендер рядом"
  M->>API: POST /tenders/{id}/bids (цена, срок, гарантия)
  API->>B: createBid()
  B-->>API: bidId, status=submitted
  API-->>C: обновлённая таблица предложений
```

## Sequence: авторизация через Telegram

```mermaid
sequenceDiagram
  participant U as User (MiniApp)
  participant TG as Telegram
  participant API as Auth Service

  U->>TG: open t.me/nodl_bot?start=auth_<token>
  TG->>API: auth data + hash
  API->>API: verify hash & token
  API-->>TG: redirect with JWT (deep-link)
  TG-->>U: returns to miniapp with access/refresh
  U->>API: uses JWT for дальнейшие вызовы
```

## ERD (Mongo, концептуально)

```mermaid
erDiagram
  USERS ||--o{ MASTERS : "owns profile"
  USERS ||--o{ TEAMS : "can manage"
  USERS ||--o{ STORES : "manages"
  TEAMS ||--|{ MASTERS : "members"
  TEAMS }o--|| FOREMEN : "led by"
  TENDERS ||--o{ BIDS : "receives"
  BIDS }o--|| MASTERS : "submitted by"
  BIDS }o--|| TEAMS : "or by team"
  TENDERS ||--|| ORDERS : "convert to"
  ORDERS }o--|| MASTERS : "executed by"
  ORDERS }o--|| TEAMS : "or by team"
  REVIEWS }o--|| ORDERS : "after"
  STORES ||--o{ MATERIALS : "stocks"
  GEO_ZONES ||--o{ TENDERS : "located"
  GEO_ZONES ||--o{ MASTERS : "service area"
  ANALYTICS_EVENTS }o--|| USERS : "actor"
```

## Коллекции MongoDB (концепт)

- `users`: роли, контакты, страна, язык, KYC-статусы.
- `masters`: профиль, навыки, портфолио, ставки, график.
- `teams`: состав, руководитель (foreman), расписание.
- `stores`: магазины, склады, геозоны.
- `materials`: товары, цены в EUR и локальной валюте, привязка к складам.
- `tenders`: требования, бюджет, сроки, адрес/гео.
- `bids`: предложения с ценой, сроком, гарантией, статусами.
- `orders`: подтверждённые работы, финальные суммы, гарантия.
- `reviews`: рейтинги, причины низких оценок, антифрод-флаги.
- `geo_zones`: страна/город/район, координаты и полигоны.
- `analytics_events`: просмотры, отклики, клики, отказ.
- `media_files`: ссылки на хранилище, оптимизации.

## CI/CD и инфраструктура

- `infra/docker` — базовые Dockerfile/скрипты.
- `infra/nginx/nginx.conf` — reverse proxy и маршрутизация клиентов.
- `infra/ci-cd` — место для GitHub Actions/ArgoCD/Helm charts.
