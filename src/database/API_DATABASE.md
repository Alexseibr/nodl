# NODL Database Models (RU / EN / PL)

## User

**RU:**  
Пользователь платформы. Хранит Telegram ID, телефон, email, роли (user / seller / farmer / builder / foreman / storeOwner / admin / moderator), язык (ru/en/pl), гео-точку и адрес, баланс, реферальный код, статус верификации и FCM-токены.

**EN:**  
Platform user. Stores Telegram ID, phone, email, roles, language, geo point and address, balance, referral code, verification status and FCM tokens.

**PL:**  
Użytkownik platformy. Przechowuje ID Telegram, telefon, e-mail, role, język, punkt geo, adres, saldo, kod polecający, status weryfikacji i tokeny FCM.

---

## Store

**RU:**  
Публичный профиль продавца / фермера / строителя / бригады. Содержит локализованное название и описание, тип (store/farmer/builder/brigade), владельца (User), геоточку, адрес, расписание, категории, рейтинг, PRO-план, медиа и статус модерации.

**EN:**  
Public profile of seller / farmer / builder / brigade. Localized name and description, type, owner (User), geo point, address, schedule, categories, rating, PRO plan, media and moderation state.

**PL:**  
Publiczny profil sprzedawcy / rolnika / wykonawcy / brygady. Zawiera zlokalizowaną nazwę i opis, typ, właściciela (User), punkt geo, adres, godziny pracy, kategorie, ocenę, plan PRO, media i status moderacji.

---

## Category

**RU:**  
Древовидный справочник категорий (строительство, ремонт, фермерка и т.д.) с локализованными названиями, кодом и сортировкой.

**EN:**  
Tree-like category dictionary (construction, repair, farming, etc.) with localized names, code and ordering.

**PL:**  
Drzewo kategorii (budownictwo, remont, rolnictwo itd.) z lokalizowanymi nazwami, kodem i kolejnością.

---

## Ad

**RU:**  
Объявление: автор (User или Store), категория, локализованный заголовок и описание, цена в мультивалюте (BYN/RUB/PLN/EUR), геоточка, адрес, флаги продвижения (isPromoted, highlightUntil, bumpCount), счётчики просмотров/избранного, медиа и модерация.

**EN:**  
Classified ad: author (User or Store), category, localized title/description, multi-currency price, geo point, address, promotion flags, view/favorites counters, media and moderation.

**PL:**  
Ogłoszenie: autor (User lub Store), kategoria, zlokalizowany tytuł/opis, cena wielowalutowa, punkt geo, adres, flagi promocji, liczniki wyświetleń/ulubionych, media i moderacja.

---

## Tender

**RU:**  
Тендер по строительству/ремонту: заказчик, локализованный заголовок и описание, бюджет (min/max) с мультивалютой, дедлайн, категория, гео, вложения и статус (open/inProgress/closed).

**EN:**  
Construction/repair tender: customer, localized title/description, budget (min/max) with multi-currency, deadline, category, geo, attachments and status.

**PL:**  
Przetarg budowlany/remontowy: zleceniodawca, zlokalizowany tytuł/opis, budżet (min/max) z wieloma walutami, termin, kategoria, geo, załączniki i status.

---

## TenderResponse

**RU:**  
Отклик бригады/строителя на тендер: ссылка на Tender и Store (бригада), предложение по цене, комментарий, вложения, статус (sent/shortlisted/selected/rejected) и оценка после выполнения работ.

**EN:**  
Contractor response to tender: references Tender and Store, price offer, comment, attachments, status and rating after work completion.

**PL:**  
Odpowiedź wykonawcy na przetarg: odwołanie do Tender i Store, oferta cenowa, komentarz, załączniki, status i ocena po wykonaniu zlecenia.

---

## SubscriptionPlan

**RU:**  
Тарифный план (FREE/PRO/MAX) с привязкой к стране, мультивалютной ценой, списком фич и периодом биллинга (monthly/yearly).

**EN:**  
Tariff plan (FREE/PRO/MAX) with country binding, multi-currency price, features list and billing cycle.

**PL:**  
Plan taryfowy (FREE/PRO/MAX) powiązany z krajem, ceną wielowalutową, listą funkcji i okresem rozliczeniowym.

---

## UserSubscription

**RU:**  
Активная подписка пользователя/магазина на план (код, страна, биллинг, даты начала/окончания, autoRenew, isActive).

**EN:**  
Active subscription of user/store to plan (code, country, billing, start/end dates, autoRenew, isActive).

**PL:**  
Aktywna subskrypcja użytkownika/sklepu na plan (kod, kraj, rozliczenie, daty, autoRenew, isActive).

---

## Payment

**RU:**  
Платёж: пользователь/магазин, сумма, валюта, метод (card/telegramStars/cash), invoiceId, статус (created/pending/paid/failed/refunded) и payload платёжного шлюза.

**EN:**  
Payment: user/store, amount, currency, method, invoiceId, status and gateway payload.

**PL:**  
Płatność: użytkownik/sklep, kwota, waluta, metoda, invoiceId, status i dane bramki płatniczej.

---

## Review

**RU:**  
Отзывы о продавцах/пользователях: рейтинг, текст, теги (fake, rude, delay...), fraudScore для антифрода.

**EN:**  
Reviews of stores/users: rating, comment, tags, fraudScore for anti-fraud.

**PL:**  
Opinie o sklepach/użytkownikach: ocena, komentarz, tagi, fraudScore dla antyfraudu.

---

## Report

**RU:**  
Жалобы/репорты на объявления, пользователей, магазины, тендеры с привязкой к модератору и резолюции.

**EN:**  
Reports for ads, users, stores, tenders with moderator and resolution.

**PL:**  
Zgłoszenia dotyczące ogłoszeń, użytkowników, sklepów, przetargów z moderatorem i rozwiązaniem.

---

## GeoCountry / GeoRegion / GeoCity

**RU:**  
Справочники стран, регионов и городов NODL, с локализованными названиями и опциональной гео-точкой города.

**EN:**  
Dictionaries of countries, regions and cities with localized names and optional city geo point.

**PL:**  
Słowniki krajów, regionów i miast z lokalizowanymi nazwami i opcjonalnym punktem geo miasta.

---

## HeatmapEvent

**RU:**  
Сырые события для тепловой карты: какой Ad, кто/гость, где (geo), как смотрели (list/details/map).

**EN:**  
Raw events for heatmap: which Ad, who/guest, where (geo), how viewed (list/details/map).

**PL:**  
Surowe zdarzenia dla mapy cieplnej: które ogłoszenie, kto/gość, gdzie (geo), jak oglądane (lista/szczegóły/mapa).

---

## Favorite

**RU:**  
Связка избранных объявлений пользователя.

**EN:**  
User’s favorite ads mapping.

**PL:**  
Mapa ulubionych ogłoszeń użytkownika.

---

## Session

**RU:**  
Сессии авторизации (web/mobile/miniapp) с токеном, userAgent и IP.

**EN:**  
Auth sessions (web/mobile/miniapp) with token, userAgent and IP.

**PL:**  
Sesje autoryzacji (web/mobile/miniapp) z tokenem, userAgent i IP.

---

## LogEvent

**RU:**  
Технический лог: уровень (info/warn/error), источник, сообщение, контекст.

**EN:**  
Technical log: level, source, message, context.

**PL:**  
Log techniczny: poziom, źródło, komunikat, kontekst.
