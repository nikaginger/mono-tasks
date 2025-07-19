# mononote. App

## Описание функционала

Приложение "mononone." позволяет:
- Создавать новые задачи с указанием:
    - Заголовка (обязательно)
    - Описания
    - Категории (Bug/Feature/Documentation/Refactor/Test)
    - Статуса (To Do/In Progress/Done)
    - Приоритета (Low/Medium/High)
- Редактировать существующие задачи
- Удалять задачи
- Просматривать список всех задач
- Автоматическое сохранение задач в localStorage

## Инструкция по запуску

1. Убедитесь, что у вас установлен Node.js (версия 16 или выше)
2. Установите зависимости:
```bash
npm install
```
3. Запустите приложение в режиме разработки:
```bash
npm run dev
```
4. Для production-сборки:
```bash
npm run build
```

## Используемые технологии

### Основной стек:
- React 18
- TypeScript
- Redux Toolkit (state management)
- React Router (навигация)
- Vite (сборка)

### Стилизация:
- Tailwind CSS

### Архитектура:
- Feature-Sliced Design
- Atomic Design (для компонентов)

## Архитектура проекта

Проект организован по принципам Feature-Sliced Design:

```
src/
├── app/                    # Инициализация приложения
├── entities/               # Бизнес-сущности (Task)
├── features/               # Фичи (task CRUD operations)
├── pages/                  # Страницы приложения
├── shared/                 # Общие модули
│   ├── api/                # API клиент
│   ├── lib/                # Вспомогательные функции
│   ├── ui/                 # UI компоненты
│   └── utils/              # Утилиты
└── widgets/                # Виджеты (композиция фич)
```

## Демо

[Посмотреть работающую версию приложения](https://mono-tasks.vercel.app/)