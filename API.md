# NODL API (черновик)

Все клиенты используют единый API. Авторизация — JWT access/refresh, заголовок `Accept-Language` обязателен для мультиязычных ответов. Цены возвращаются в EUR и локальной валюте (`currency`).

## Auth Service
- `POST /api/auth/otp` — запрос SMS-кода (телефон, country_code).
- `POST /api/auth/otp/verify` — верификация кода, выдача access/refresh.
- `GET /api/auth/telegram/callback` — приём payload от Telegram, валидация hash.
- `POST /api/auth/refresh` — обновление access-токена.
- `POST /api/auth/logout` — инвалидация refresh-токена.

## Users
- `GET /api/users/me` — профиль, роли, язык, страна.
- `PATCH /api/users/me` — обновление контактов, языка, настроек уведомлений.
- `POST /api/users/roles` — запрос/переключение роли (customer/master/team/foreman/store).
- `POST /api/users/kyc` — загрузка документов, верификация мастеров/бригад.

## Masters & Teams
- `POST /api/masters` — создание/обновление профиля мастера.
- `GET /api/masters` — поиск по гео/специализациям/рейтингу.
- `GET /api/masters/:id` — карточка мастера, портфолио.
- `POST /api/teams` — создание бригады, привязка мастеров.
- `GET /api/teams/:id` — карточка бригады, список мастеров.
- `PATCH /api/teams/:id/foreman` — назначение прораба.

## Tenders & Orders
- `POST /api/tenders` — создать тендер (описание, бюджет_eur, бюджет_local, специализация, гео).
- `GET /api/tenders` — лента тендеров по радиусу/фильтрам.
- `GET /api/tenders/:id` — детали тендера и предложения.
- `POST /api/tenders/:id/accept` — выбрать исполнителя и конвертировать в заказ.
- `GET /api/orders` — заказы пользователя (по роли).
- `PATCH /api/orders/:id/status` — статусы: in_progress/completed/cancelled.

## Bids / Offers
- `POST /api/tenders/:id/bids` — отправить отклик (цена_eur, цена_local, срок, гарантия, комментарий).
- `GET /api/tenders/:id/bids` — таблица предложений с сортировкой.
- `PATCH /api/bids/:id/status` — submit/viewed/selected/rejected.

## Stores & Materials (будущее)
- `POST /api/stores` — регистрация магазина/склада.
- `GET /api/stores` — список по гео/наличию материалов.
- `POST /api/materials` — добавление товара (цена_eur, цена_local, склад, наличие).
- `GET /api/materials` — поиск материалов и спецпредложений.

## Geo
- `GET /api/geo/zones` — страны/города/районы.
- `GET /api/geo/nearby` — мастера/заказы в радиусе (lat, lng, radius_km, role_filter).

## Reviews
- `POST /api/reviews` — отзыв после заказа (рейтинг, причины низкой оценки).
- `GET /api/reviews/:subjectId` — отзывы мастера/бригады/заказчика.

## Analytics
- `POST /api/analytics/events` — трекинг событий (просмотр, клик, отклик, отказ).
- `GET /api/analytics/heatmap` — тепловая карта спроса/предложения по гео.

## Notifications
- `POST /api/notifications/test` — тестовое уведомление (push/telegram/email) для среды разработки.

## Admin
- `GET /api/admin/moderation/queue` — очереди модерации (мастера, магазины, тендеры).
- `PATCH /api/admin/moderation/:id` — approve/reject с причиной.
- `GET /api/admin/antifraud/reviews` — подозрительные отзывы и паттерны.
