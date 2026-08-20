# Crypto Tracker — шпаргалка по проекту

## Стек и зачем каждая часть

| Технология          | Роль                 | Зачем именно она                                    |
| ------------------- | -------------------- | --------------------------------------------------- |
| **Vite**            | Сборщик и dev-сервер | Быстрый HMR, замена Webpack/Next.js dev-сервера     |
| **TanStack Router** | Роутинг (file-based) | Типобезопасные роуты, параметры, search-params      |
| **TanStack Query**  | Кэш серверных данных | Кэширование, повторные запросы, автообновление      |
| **TanStack Table**  | Headless-таблицы     | Сортировка/фильтрация без готовой вёрстки           |
| **Zustand**         | Клиентский стейт     | Watchlist, фильтры — без Redux-бойлерплейта         |
| **Zod**             | Валидация + типы     | Проверка ответа API, вывод TS-типов через `z.infer` |
| **Tailwind CSS**    | Стилизация           | Утилитарные классы вместо styled-components         |
| **clsx**            | Условные классы      | `clsx('base', isActive && 'active')`                |

**API:** CoinGecko — https://api.coingecko.com/api/v3

- `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1` — список монет
- `/coins/{id}` — детальная страница
- `/coins/{id}/market_chart?vs_currency=usd&days=7` — данные для графика
- `/search?query=...` — поиск

---

## Структура проекта

```
src/
  routes/
    __root.tsx          → корневой layout + DevTools здесь
    index.tsx           → "/"
    coins.tsx            → layout для /coins/*
    coins/
      index.tsx          → "/coins"
      $coinId.tsx         → "/coins/:coinId"
    watchlist.tsx        → "/watchlist"
  core/
    devTools.tsx         → обёртка над Router/Query devtools
  main.tsx               → создание router + queryClient, рендер
  routeTree.gen.ts       → АВТОГЕНЕРИРУЕТСЯ, не редактировать руками
```

---

## Ключевые команды

| Команда            | Что делает                                                          |
| ------------------ | ------------------------------------------------------------------- |
| `yarn dev`         | Запуск dev-сервера, генерирует/обновляет `routeTree.gen.ts` на лету |
| `yarn build`       | `tsc -b && vite build` — проверка типов + сборка в `dist/`          |
| `yarn preview`     | Локальный просмотр продакшн-сборки из `dist/`                       |
| `yarn lint`        | Запуск ESLint                                                       |
| `npx tsr generate` | Разовая генерация `routeTree.gen.ts` без dev-сервера                |

**Важно:** `routeTree.gen.ts` генерируется только пока запущен `yarn dev` или во время `yarn build`. Если файл пустой/устарел — просто запусти `yarn dev`.

---

## File-based роутинг: как добавить новый роут

1. Создать пустой файл в `src/routes/`, например `src/routes/about.tsx`
2. Держать `yarn dev` запущенным — плагин сам допишет туда:
   ```tsx
   export const Route = createFileRoute('/about')({
     component: RouteComponent,
   });
   ```
3. Путь в `createFileRoute('...')` должен совпадать с расположением файла — руками менять не нужно, генерируется автоматически

Правила именования:

- `index.tsx` → индексная страница уровня
- `$param.tsx` → динамический сегмент (`/coins/$coinId` → `/coins/123`)
- `__root.tsx` → обязательный корневой layout

---

## ENV: dev vs production

```
.env.development   → VITE_SHOW_DEVTOOLS=true
.env.production    → VITE_SHOW_DEVTOOLS=false
```

- `yarn dev` → режим `development` автоматически
- `yarn build` → режим `production` автоматически
- Флаг `--mode` не нужен, если окружений всего два (dev/prod)
- Переменные для клиента обязаны начинаться с `VITE_`, иначе Vite их не отдаст в `import.meta.env`

**DevTools подключаются через `__root.tsx`** (внутри дерева роутера, а не в `main.tsx` рядом с `RouterProvider` — иначе `useRouterState` не найдёт контекст):

```tsx
// src/routes/__root.tsx
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <DevTools />
    </>
  ),
});
```

---

## Порядок плагинов в vite.config.ts (важно!)

```typescript
plugins: [
  tanstackRouter({ target: 'react', autoCodeSplitting: true }), // ПЕРВЫМ
  react(),
  tailwindcss(),
];
```

`tanstackRouter` обязательно до `react()`, иначе генерация роутов сломается.

---

## Что дальше (следующие шаги)

- [ ] Подключить `useQuery` для `/coins/markets` на странице списка монет
- [ ] Добавить `validateSearch` (Zod) для пагинации `?page=`
- [ ] Собрать таблицу через `@tanstack/react-table` (сортировка по цене/капе/24ч)
- [ ] Zustand store для watchlist с `persist` в localStorage
- [ ] Детальная страница `$coinId` — `useQuery` + возможно график через `market_chart`
- [ ] Loader на роуте `/coins/$coinId` через `context.queryClient.ensureQueryData`
