# NODL: регистрация + верификация пользователей (RU/PL/EN + BYN/RUB/PLN)

## Как использовать
Скопируйте блок «Главный мегапромт» в Codex, чтобы он сгенерировал весь модуль регистрации. Для частичной генерации используйте «Под-промты» ниже.

---

## Главный мегапромт

Создай модуль регистрации для веб-платформы **NODL**.

### Условия и требования

1. **Типы пользователей**  
   Обязательно реализовать роли:  
   - Customer (заказчик)  
   - Master (частный мастер)  
   - Brigadier (бригадир + до 10 человек в команде)  
   - Company (юридическое лицо)  
   После регистрации пользователь выбирает свою роль → фронт перестраивается под эту роль.

2. **Способы регистрации**

   **Телефон (основной)**  
   Код подтверждения отправляется через:  
   - Telegram  
   - WhatsApp  
   - Viber  
   - SMS  
   ⚠️ Сервисы для интеграции: Telegram Login Widget (или отправка через Bot API), WhatsApp Cloud API, Viber Business API, SMSC.ru / Twilio / TurboSMS.

   **Email (обязательно)**  
   — подтверждение email через ссылку.  
   — email используется для: смет, договоров, счетов, отправки документов, восстановления доступа.

   **Соцсети (опционально)**  
   Google / Apple ID / VK.

3. **Мультиязычность**  
   Язык интерфейса определяется автоматически:  
   - RU — Беларусь + Россия  
   - PL — Польша  
   - EN — если язык браузера не RU/PL  
   Все тексты должны быть вынесены в JSON: `/locales/ru.json`, `/locales/pl.json`, `/locales/en.json`.

4. **Мультивалютность по гео**  
   При регистрации пользователь получает валюту по стране:  

   | Страна    | Валюта |
   |-----------|--------|
   | Беларусь  | BYN    |
   | Россия    | RUB    |
   | Польша    | PLN    |

   Хранить валюту в профиле: `preferredCurrency: "BYN" | "RUB" | "PLN"`.

5. **Форма регистрации (frontend)**  
   Включает:  
   - выбор страны  
   - выбор языка  
   - ввод телефона или email  
   - способ получения кода (TG / WA / Viber / SMS)  
   - ввод кода  
   - создание профиля  
   - выбор роли  
   - сбор обязательных данных (имя, город, пароль — если почта)  
   UI требования: mobile-first, desktop адаптация, лёгкий интерфейс для мастеров на слабых ПК, брендовые цвета NODL (#009F8A).

6. **Backend API (Node.js / Express / PostgreSQL)**  
   Создать эндпоинты:  
   - `POST /auth/request-code`  
   - `POST /auth/verify-code`  
   - `POST /auth/register`  
   - `POST /auth/resend`  
   - `POST /auth/email-confirm`  
   - `POST /auth/set-role`  
   - `GET  /auth/me`  
   - `POST /auth/logout`  
   Хеширование паролей — bcrypt. JWT токены — access + refresh. Сессии — Redis.

7. **Проверка по странам**  
   Валидация форматов телефонов: Беларусь (+375), Россия (+7), Польша (+48).

8. **Безопасность**  
   - 5 попыток ввода кода → блокировка на 15 минут.  
   - запрет на массовую отправку кодов.  
   - защита от повторной регистрации одного номера.

9. **Результат, который должен сгенерировать Codex**

   **Backend:**  
   - `/routes/auth.js`  
   - `/controllers/authController.js`  
   - `/services/smsService.js`, `/waService.js`, `/tgService.js`, `/viberService.js`  
   - `/models/User.js`  
   - `/middleware/auth.js`  
   - SQL миграции для PostgreSQL  
   - Redis session config

   **Frontend:**  
   - `/pages/register`  
   - `/pages/verify`  
   - `/components/PhoneInput`  
   - `/components/AuthMethodSelector`  
   - `/components/RoleSelector`  
   - `/utils/api/auth.js`  
   - UI в фирменном стиле NODL  
   - JSON локализации: `/locales/ru.json`, `/locales/pl.json`, `/locales/en.json`

---

## Под-промты (короткие и точечные)
Используйте эти запросы для генерации отдельных частей, если нет нужды перегенерировать модуль целиком.

### A. Промт для API отправки кода
Сгенерируй backend-эндпоинт `POST /auth/request-code` с поддержкой Telegram, WhatsApp, Viber и SMS. Страна → Беларусь/Россия/Польша. Валидация форматов телефонов. Ограничение: 5 отправок в час.

### B. Промт для UI страницы регистрации
Создай страницу регистрации NODL (React + mobile-first). Блоки: страна, язык, телефон/email, выбор метода получения кода. Используй бренд NODL (#009F8A). Все тексты вынеси в i18n JSON.

### C. Промт для базы данных
Создай таблицу `users`: `id, phone, email, country, language, currency, role, passwordHash, createdAt, updatedAt`. Добавь таблицу `verification_codes`.

### D. Промт для выбора роли
Сгенерируй компонент `RoleSelector`: Customer / Master / Brigadier / Company. Mobile-first. Иконки. Бренд NODL. После выбора → `POST /auth/set-role`.
