# UI Specification: Master's Workspace (Post-Onboarding)

This document defines the information architecture, layout patterns, and UI prompts for the Master's personal cabinet in NODL. It is optimized for low-spec devices, with a compact, distraction-free interface and parity between desktop and mobile.

## Design Principles
- **Heartbeat of NODL**: After onboarding, the workspace is the default landing. All production features branch from here.
- **Clarity first**: Few persistent controls, concise tables/cards, progressive disclosure for advanced settings.
- **Low friction**: Quick actions exposed in context (e.g., reply, accept, schedule).
- **Consistency**: Shared components for lists, filters, and action bars keep navigation predictable.
- **Responsiveness**: Single-column on mobile, two/three-column on desktop with collapsible side nav.

## Global Layout
- **Shell**: Left rail with logo, status pill (availability/verification), and primary nav. Content area with sticky page header, filters/action bar, and scrollable body. Right rail (desktop) for context widgets (stats, calendar, support). Mobile converts rails into a drawer and bottom action bar.
- **Header**: Page title, breadcrumb (Home › Section), search, quick create (estimate/response), and status toggle ("Available/Hidden").
- **Empty/loading states**: Illustrated stubs, clear CTA ("Добавить прайс", "Создать портфолио"), skeleton loaders for lists.

## Primary Navigation (top-level)
1. **Заявки**
2. **Мои отклики**
3. **Чаты**
4. **Сметы и договоры**
5. **Прайс-лист**
6. **Портфолио**
7. **Геозона**
8. **Календарь**
9. **Статистика и аналитика**
10. **Рейтинг**
11. **Настройки** (профиль, уведомления, безопасность)
12. **Верификация**
13. **Финансы**

## Dashboard (Landing) Overview
- **Hero strip**: Verification status, rating badge, availability switch, shortcut to update profile.
- **KPI widgets**: New requests, active contracts, unread chats, upcoming visits, wallet balance.
- **Quick actions**: "Создать смету", "Добавить в портфолио", "Обновить прайс", "Откликнуться на тендер".
- **Feed**: Mixed list of latest requests, responses, and system notices with tags and inline actions.

## Section Blueprints
Each section follows the pattern: header with filters/sort, list/cards with key stats, right rail for context (desktop), slide-over modals on mobile.

### Заявки (Incoming Orders)
- Tabs: Все, Новые, В работе, Завершённые, Отменённые, Тендеры.
- Columns/fields: заказчик, адрес/гео, тип работ, бюджет/диапазон, дедлайн, теги (тендер/срочно), статус.
- Actions: Откликнуться, Задать вопрос (чат), Добавить в календарь, Отказаться. Inline badge when tender deadline is near.

### Мои отклики
- Tabs: Ожидают ответа, В шорт-листе, Принятые, Отклонённые, Черновики.
- Fields: заказ, ставка/цена, срок начала, оценка длительности, статус, последнее обновление.
- Actions: Редактировать предложение, Отозвать, Продублировать, Перейти в чат.

### Чаты
- List with filters (по заказу, по статусу, непрочитанные). Support in separate badge.
- Thread view with pinned order summary on the right (desktop) or top (mobile). Quick templates: уточнить адрес, подтвердить визит, отправить смету.

### Сметы и договоры
- Tabs: Черновики, Отправленные, Подписанные, Архив.
- Columns: заказ, сумма, дата отправки, статус подписи (в ожидании/подписано/отклонено), тип (смета/договор).
- Actions: Создать из шаблона, Поделиться, Скачать PDF, Запросить подпись. Preview drawer shows key позиции/итоги.

### Прайс-лист
- Category tree (работы/услуги) with price units (час, м², пог. м, фикс).
- Bulk edit mode, quick toggle "скрыть/показать" пункт.
- Preset templates (штукатурка, электрика, сантехника) for fast fill.
- Mobile: accordion list with inline edit and copy price from template.

### Портфолио
- Grid/list toggle. Each card: фото/видео, тип работы, площадь/объём, город, дата, бюджет, описание, теги.
- Actions: Добавить кейс, Добавить отзыв заказчика, Ссылка на внешнее видео.
- Story view for mobile to showcase highlights.

### Геозона
- Map with draggable radius + multi-polygon selection; fallback: list of город/район чекбоксы.
- Chips for allowed travel distance, surcharge toggle for удалённые районы.

### Календарь
- Views: Agenda (default mobile), Week (desktop), Month (planning).
- Event types: выезд, замер, работа, встреча, дедлайн тендера.
- Actions: Запланировать визит, Подтвердить время с заказчиком, Экспорт (ICS/Google), синк статусов заявок.

### Статистика и аналитика
- Widgets: конверсия откликов→договор, средний чек, среднее время ответа, загрузка календаря, география заказов, популярные услуги.
- Filters: период, категория услуги, гео, тип клиента (новый/повторный).

### Рейтинг
- Breakdown: общий балл, качество, коммуникация, сроки, стоимость.
- Timeline of последние отзывы, ответы мастера, флаги спорных ситуаций.
- Nudges: "Закройте 3 заказа без задержек, чтобы поднять рейтинг".

### Настройки
- Subsections: профиль (ФИО, фото, описание, навыки, категории), уведомления (push/email/телеграм), безопасность (2FA, устройства), команды/делегирование.
- Quick preview card to see публичный профиль.

### Верификация
- Steps timeline: Паспорт → Лицензии/СРО → Селфи → Проверка телефона/email → Выписка счета.
- Upload widget with progress, expected срок проверки, контакт поддержки.
- Badge previews ("Верифицирован", "В процессе", "Отказ — требуются документы").

### Финансы
- Wallet balance, ожидают выплаты, история транзакций, комиссии сервиса.
- Actions: Вывести, Привязать счёт/карту, Скачать акт/квитанцию, Настроить авто-выплаты.
- Security reminder and 2FA prompt for payouts.

## Responsive Patterns
- **Desktop**: 2–3 column grid; side nav collapses to icons; right rail for context widgets.
- **Mobile**: Single column, sticky top filters, bottom action bar for primary CTA; drawers for filters and creation flows.
- **Accessibility/Performance**: Minimal shadows, solid backgrounds, SVG icons, lazy loading images, offline-friendly placeholders.

## Visual Tokens (proposed)
- **Palette**: Primary #2962FF (action), Secondary #1BBF8C (success/availability), Accent #FFB020 (alerts), Surface #0F172A (dark ink on light backgrounds #F8FAFF), Neutral #E2E8F0 borders.
- **Typography**: Inter or SF, 14–16 px base, 18–20 px section headers, 12–13 px captions.
- **Corners/Shadows**: 8 px radius cards, subtle 0 6 18 rgba(15,23,42,0.06) shadow; hover lift +2 px.

## Component Inventory
- **List card** with status chips, price/time pills, and inline actions.
- **Filter bar** with segmented tabs, search, and dropdowns; saves last selection per section.
- **Stats widget** (mini KPI) with icon, value, delta; tap opens detail.
- **Action bar** (desktop right rail / mobile bottom) with up to 3 CTAs.
- **Upload module** for docs/photos with progress and error states (retry, replace).
- **Map selector** with radius slider and area tags.
- **Calendar chip row** for quick date shortcuts (today, завтра, неделя).
- **Rating tile** with stars, category subscores, and CTA to improve.

## Figma / Frontend Prompt (ready-to-use)
```
Создай UI в стиле NODL для личного кабинета мастера после онбординга.
Экраны: главная (дашборд), Заявки, Мои отклики, Чаты, Сметы/договоры, Прайс-лист, Портфолио, Геозона, Календарь, Статистика, Рейтинг, Настройки, Верификация, Финансы.

Требования: светлая тема, palette primary #2962FF, secondary #1BBF8C, accent #FFB020, surface #F8FAFF, текст #0F172A, бордер #E2E8F0. Шрифт Inter 14–16 базовый, 18–20 заголовки, 12–13 подписи. Радиус 8px, тень 0 6 18 rgba(15,23,42,0.06). На десктопе левый сайдбар и правый контекстный rail, на мобиле — выезжающее меню и нижняя панель действий.

Компоненты: карточки заявок/откликов с статус-чипами и CTA, фильтр-бар с табами, виджеты KPI, таблицы смет, грид портфолио, карта геозоны с радиусом, календарь (agenda/week/month), модуль загрузки документов, баннер верификации, кошелёк с балансом.

Адаптация: мобильный — одна колонка, закреплённые фильтры и нижняя CTA; десктоп — 2–3 колонки, правый rail для аналитики/календаря. Используй компактные таблицы, skeleton-лоадеры, пустые состояния с иллюстрацией и CTA.
```

## Next Steps
- Validate flows with PM/ops (which actions are mandatory post-onboarding).
- Align backend contract (IDs, statuses, pagination) with the UI data fields above.
- Prepare component tokens in the design system for reuse across apps.
