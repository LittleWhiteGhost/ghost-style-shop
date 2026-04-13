# Ghost Style - Telegram Web App Shop

Магазин одежды **Ghost Style** - Telegram Web Application

## 📱 Описание

Современное Telegram Web App для магазина одежды с стильным дизайном и удобной навигацией.

## ✨ Функционал

- 🛍️ **Каталог** - просмотр товаров магазина
- ✨ **Новинки** - новые поступления
- 👤 **Аккаунт** - личный кабинет пользователя
- ⚙️ **Настройки** - настройки приложения

## 🚀 Установка и запуск

### 1. Создайте бота через BotFather
1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям для создания бота
4. Сохраните токен бота

### 2. Настройте Web App
1. Отправьте BotFather команду `/newapp`
2. Выберите вашего бота
3. Укажите название: `Ghost Style`
4. Укажите описание
5. Загрузите иконку (640x640 px)
6. Когда попросит URL, укажите URL вашего размещенного приложения

### 3. Разместите приложение

Рекомендуемые платформы для хостинга:
- **GitHub Pages** (бесплатно)
- **Vercel** (бесплатно)
- **Netlify** (бесплатно)

#### Размещение на GitHub Pages:
```bash
# Инициализируйте git репозиторий
cd ghost-style-shop
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main

# Включите GitHub Pages в настройках репозитория
```

### 4. Подключите Web App к боту

Отправьте BotFather:
```
/menuButton
```

Или добавьте кнопку через код бота:
```javascript
// Пример на Node.js с node-telegram-bot-api
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('YOUR_BOT_TOKEN', { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendAnimation(msg.chat.id, null, {
    reply_markup: {
      inline_keyboard: [[
        {
          text: "Открыть магазин",
          web_app: {
            url: "https://your-domain.github.io/ghost-style-shop"
          }
        }
      ]]
    }
  });
});
```

## 📁 Структура проекта

```
ghost-style-shop/
├── index.html          # Главный HTML файл
├── styles/
│   └── main.css       # Стили приложения
├── js/
│   └── app.js         # Логика приложения
└── README.md          # Документация
```

## 🎨 Особенности

- ✅ Адаптивный дизайн для мобильных устройств
- ✅ Интеграция с Telegram Web App API
- ✅ Haptic feedback
- ✅ Темная тема по умолчанию
- ✅ Плавные анимации
- ✅ Современный UI

## 🔧 Технологии

- HTML5
- CSS3 (Grid, Flexbox, CSS Variables)
- Vanilla JavaScript
- Telegram Web App SDK

## 📝 Лицензия

MIT

---

Создано с 👻 для Ghost Style
