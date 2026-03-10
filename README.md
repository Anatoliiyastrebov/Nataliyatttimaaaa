# Анкета по здоровью

Полнофункциональный сайт для сбора анкет по здоровью с поддержкой двух языков (RU/EN) и безопасной отправкой в Telegram через отдельный relay-сервер.

## Особенности

- 🎨 Современный wellness-дизайн
- 🌍 Двуязычность (русский/английский)
- 📱 Полная адаптивность для мобильных устройств
- 📋 4 типа анкет (малыши, дети, женская, мужская)
- 🔄 Пошаговая навигация с индикатором прогресса
- ✅ Валидация полей
- 🔀 Условная логика для полей
- 📤 Интеграция с Telegram через relay (токен скрыт от браузера)
- 📄 Страница Impressum (для соответствия европейским законам)
- ✅ Согласие на обработку данных

## Установка

```bash
npm install
```

## Запуск локально

```bash
npm run dev
```

Сайт будет доступен на `http://localhost:3000`

## Деплой на Vercel

Проект уже настроен для деплоя на Vercel как Vite-приложение.

Базовые настройки:

- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Шаги:

1. Зайдите в Vercel и создайте новый проект, выбрав репозиторий  
   [`Nadejda-Melnikova`](https://github.com/Anatoliiyastrebov/Nadejda-Melnikova).
2. Убедитесь, что:
   - команда сборки: `npm run build`
   - директория вывода: `dist`
3. Нажмите **Deploy** — после сборки сайт будет доступен по вашему Vercel-домену.

Файл `vercel.json` уже содержит настройки для правильной работы роутинга (все пути отдаются через `index.html`), чтобы страницы анкет и политики конфиденциальности корректно открывались по прямым ссылкам.

## Настройка фронтенда

1. Создайте `.env` в корне проекта на основе `.env.example`
2. Укажите URL relay-сервера:

```env
VITE_TELEGRAM_RELAY_BASE_URL=https://your-relay-domain.com
```

## Relay-сервер (без Vercel Functions)

Сервис находится в `relay-server/` и может быть развернут где угодно (Railway, Render, VPS, Docker и т.д.).

### Локальный запуск relay

```bash
cd relay-server
npm install
cp .env.example .env
npm run dev
```

Переменные в `relay-server/.env`:

```env
PORT=8080
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
ALLOWED_ORIGIN=https://your-frontend-domain.com
```

### Эндпоинты relay

- `POST /sendMessage` — принимает JSON: `{ "text": "...", "parse_mode": "HTML" }`
- `POST /sendDocument` — принимает multipart: `document` и опционально `caption`
- `GET /health` — healthcheck

## Структура проекта

```
src/
├── components/          # React компоненты
├── pages/              # Страницы приложения
├── data/               # Данные анкет
├── utils/              # Утилиты (i18n, telegram)
└── styles/             # Стили
```

## Технологии

- React 18
- TypeScript
- React Router
- Vite
- CSS Modules

## Лицензия

MIT

