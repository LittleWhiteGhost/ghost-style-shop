# Ghost Style - React + TypeScript + Firebase

Современный интернет-магазин одежды на React с авторизацией и базой данных.

## Технологии

- **React 18** + **TypeScript**
- **Vite** - сборщик
- **Firebase** - авторизация, база данных, хостинг
- **React Router** - роутинг

## Установка

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка Firebase

1. Создайте проект на [Firebase Console](https://console.firebase.google.com/)
2. Включите **Authentication** (Email/Password и Google)
3. Создайте **Firestore Database**
4. Скопируйте конфиг из Project Settings
5. Вставьте в `src/services/firebase.ts`:

```typescript
export const firebaseConfig = {
  apiKey: "ваш_api_key",
  authDomain: "ваш_project.firebaseapp.com",
  projectId: "ваш_project_id",
  storageBucket: "ваш_project.appspot.com",
  messagingSenderId: "ваш_sender_id",
  appId: "ваш_app_id"
};
```

### 3. Запуск

```bash
npm run dev
```

Откройте http://localhost:3000

## Структура проекта

```
src/
├── components/       # React компоненты
│   ├── Header.tsx
│   ├── Layout.tsx
│   ├── Loading.tsx
│   └── ProductCard.tsx
├── context/         # React Context
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── pages/           # Страницы
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Catalog.tsx
│   ├── NewArrivals.tsx
│   ├── Account.tsx
│   ├── Settings.tsx
│   └── Cart.tsx
├── services/        # Firebase сервисы
│   ├── firebase.ts
│   ├── auth.ts
│   └── products.ts
├── styles/          # Стили
│   └── global.css
├── App.tsx
├── main.tsx
└── routes.tsx
```

## Деплой на Firebase Hosting

```bash
# Установите Firebase CLI
npm install -g firebase-tools

# Войдите в Firebase
firebase login

# Инициализируйте проект
firebase init hosting

# Соберите проект
npm run build

# Задеплойте
firebase deploy
```

## Функционал

- Регистрация/Вход (Email + Google)
- Каталог товаров
- Новинки
- Корзина с localStorage
- Личный кабинет
- Настройки (тема, уведомления, язык)
- Черно-белый дизайн с glass эффектом
