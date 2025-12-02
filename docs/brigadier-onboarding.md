# Brigadier Onboarding Flow (NODL)

## Goal
Collect key information about a brigadier’s team, including composition, competencies, and responsibilities, to build a publishable profile.

## Stepper Overview
The onboarding contains nine steps shown in a progress stepper:
1) Who you are / basics
2) Team composition
3) Specializations
4) Geo-zone and travel range
5) Workload and parallel projects
6) Equipment and capabilities
7) Pricing and payment format
8) Documents and responsibility
9) Final profile review

## Mobile-First UI Guidance
- Primary accent color: `#009F8A`
- Background: `#F5F5F5`
- Cards: `#FFFFFF`, radius 16px
- Fonts: Inter / Montserrat
- Minimalistic layout with large tappable elements
- Each screen shows the stepper at the top

### Step 1: Who are you as a brigadier?
- Title: “Расскажите о вашей бригаде”
- Fields: brigade name (optional), brigadier full name, city/base, short description (≤ 300 chars)
- Hint: “Это увидит заказчик в поиске и в карточке бригады.”
- Layout: white card, accent color for actions
- CTA: **[Продолжить]**

### Step 2: Team composition
- Title: “Кто входит в вашу бригаду?”
- Model: 2–10 people
- UI: button **[ + Добавить участника ]** adds a row: Name (text), Role (dropdown), Employment type (dropdown), Experience (dropdown)
- Roles: Универсал, Отделочник, Электрик, Сантехник, Каменщик, Монтажник, Подсобник
- Employment: Постоянно в бригаде / Привлекается по мере необходимости
- Hint: “Можно начать с 2–3 ключевых людей, остальных добавите позже.”
- CTA: **[Продолжить]**

### Step 3: Brigade specializations
- Title: “Какие работы выполняет ваша бригада?”
- UI: grid of square cards with icon + name, multi-select (3–10)
- Specializations: Капремонт квартир, Черновые работы, Чистовая отделка, Электрика, Сантехника, Отопление / котлы, Кровля, Фундаменты, Монтаж/демонтаж, Ландшафт, Фасады, Объекты под ключ
- Selected state: green outline (NODL Green) with light fill
- CTA: **[Продолжить]**

### Step 4: Geo-zone and travel
- Title: “В каких районах вы работаете?”
- Elements: auto-detect city; radio options — В пределах города, Город + 30 км, Вся область, Вся страна
- Map/stub with base city point and radius; slider for radius (0–100 km) when city+ option is active
- Checkbox: “Готовы выезжать на соседние города / страны”
- CTA: **[Продолжить]**

### Step 5: Workload and parallel projects
- Title: “Сколько объектов вы можете вести одновременно?”
- Slider: 1–5 objects concurrently
- Checkboxes: “Работаем только по одному объекту”; “Берём несколько объектов, если сроки позволяют”
- Field: average project duration (days/weeks)
- Hint: “Это поможет NODL не перегружать вашу бригаду лишними заказами.”
- CTA: **[Продолжить]**

### Step 6: Equipment and capabilities
- Title: “Какими ресурсами располагает бригада?”
- Checkboxes: Свой транспорт; Инструмент для черновых работ; Инструмент для чистовой отделки; Леса / вышки; Сварочное оборудование; Грузчики в команде; Можем закупать материалы сами
- Field: special capabilities (e.g., ночные/выходные, работа на действующих объектах)
- CTA: **[Продолжить]**

### Step 7: Pricing and payment format
- Title: “Как вы обычно считаете оплату?”
- Radio: По смете / По фикс-цене за объект / По дневной/часовой ставке
- If fixed: table “Тип объекта / Цена от / Валюта” (e.g., квартиры до 50м², 50–100м²)
- If hourly: rate input with currency (BYN/RUB/PLN)
- If estimate: show hint that detailed estimates live elsewhere
- Hint: “Цены примерные. Точные суммы вы сможете считать в сметах NODL.”
- CTA: **[Продолжить]**

### Step 8: Documents and responsibility
- Title: “Юридический статус вашей бригады”
- Radio: Работаем как частные мастера / Работаем как ИП / фирма
- If legal entity: organization name, country (BY/RU/PL), registration number, upload supporting docs
- Checkbox: acceptance of taking orders only with official estimate + act
- CTA: **[Продолжить]**

### Step 9: Final profile review
- Title: “Проверьте профиль вашей бригады”
- Summary card: brigade name, city, team size, specializations, geo-zone, payment type, legal status
- Buttons: **[Подтвердить и отправить на проверку]** (primary), **[Вернуться и исправить]** (secondary)
- Confirmation screen copy: “Бригада отправлена на проверку NODL. Обычно это занимает 15–60 минут. Вы уже можете просматривать заказы и настраивать кабинет.”

## Prompt for Figma / UI Generation
```
UI онбординга бригадира NODL

Сделай дизайн онбординга для роли “Бригадир” в платформе NODL.
Нужны экраны mobile + desktop, в том же стиле, что и онбординг мастера:

Цвет: #009F8A
Фон: #F5F5F5
Карточки: #FFFFFF, radius 16px
Шрифт: Inter / Montserrat
Минимализм, удобство, крупные элементы

Шаги онбординга:

Экран «Кто вы как бригадир?»
название бригады
город
краткое описание
кнопка [Продолжить]

Экран «Состав бригады»
список участников: имя, роль, тип занятости, опыт
кнопка [+ Добавить участника]
минимум 2 участника
кнопка [Продолжить]

Экран «Специализации бригады»
сетка карточек с типами работ (капремонт, отделка, электрика, сантехника и т.д.)
мультивыбор, выбранное подсвечено зелёной рамкой
кнопка [Продолжить]

Экран «Геозона и выезды»
выбор: город / область / вся страна
карта с радиусом
слайдер радиуса
чекбокс “готовы выезжать дальше”
кнопка [Продолжить]

Экран «Загруженность и параллельные объекты»
слайдер “объектов одновременно”
чекбоксы по типу загрузки
средняя длительность объекта
кнопка [Продолжить]

Экран «Техника и ресурсы»
чекбоксы: транспорт, инструменты, леса, сварка, грузчики, закупка материалов
поле для особых условий
кнопка [Продолжить]

Экран «Цены и формат оплаты»
выбор: по смете / фикс / почасовая
таблица типовых объектов или ставка за час
подсказка, что это примерные цены
кнопка [Продолжить]

Экран «Документы и ответственность»
выбор: частная бригада / ИП / фирма
поля для реквизитов
загрузка документов
чекбокс подтверждения условий
кнопка [Продолжить]

Финальный обзор
резюме профиля бригады
[Подтвердить и отправить на проверку]
[Вернуться и исправить]

У всех экранов сверху должен быть визуальный степпер прогресса (1–9 шагов).
```
