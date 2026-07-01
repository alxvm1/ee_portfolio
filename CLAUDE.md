# Project Rules

## TypeScript — нейминг

- Типы (type alias) — префикс `T`: `TProjectCategory`
- Интерфейсы — префикс `I`: `IUiDesignProject`
- Классы и исключения — без префикса: `ApiError`

## FSD — структура entities

```
entities/
  Project/
    api/       — функции вызова API (fetchPublishedProjects, createProject, uploadProjectAsset)
    config/    — константы (CATEGORY_TABLE)
    model/     — Effector модели; index.ts экспортирует объект <Entity>Model
    types/     — типы сущности (TProjectCategory, IUiDesignProject)
    ui/        — UI компоненты сущности (если есть)
    index.ts   — публичный barrel: только <Entity>Model и типы
```

## FSD — структура pages

```
pages/
  HomePage/
    model/     — локальная Effector логика страницы
    ui/        — вложенные компоненты
    index.tsx
  AdminPage/
    model/     — локальная Effector логика страницы
    ui/        — вложенные компоненты (ProjectsList, TextProjectForm и др.)
    index.tsx
    style.css
```

## Effector — нейминг

- Сторы: префикс `$` — `$projects`, `$session`, `$isLoading`. **Всегда через `$`**, без исключений.
- Булевы сторы: `$is...` или `$has...` — `$isCreating`, `$isSessionLoading`
- Эффекты: постфикс `Fx` — `fetchPublishedProjectsFx`, `signInFx`
- Ивенты: прошедшее время глагола — `categoryTabClicked`, `projectDeleteClicked`, `sessionChanged`

## Effector — структура файла модели

Порядок внутри файла строго фиксирован:

1. **Сначала все `create*`** — `createEvent`, `createStore`, `createEffect`
2. **Потом логика** — только через `sample`, не через методы стора (`.on`, `.reset`), кроме служебных сторов-счётчиков и накопителей состояния эффекта (`$isMutating`, `$formSubmitError`), где `.on`/`.reset` — единственно возможный способ подписки на `done`/`failData`/`finally` без нарушения принципа "никакой императивной логики вне `sample`"
3. **В конце один экспорт** — объект модели

Экспорты внутри объекта сортируются по типам: сначала events, потом stores.

```ts
// 1. create
const fetchPublishedProjectsFx = createEffect<{ category: TProjectCategory }, TAnyProject[], string>(...)
export const publicProjectsRequested = createEvent<{ category: TProjectCategory }>()
export const $projects = createStore<TAnyProject[]>([])
export const $projectsError = createStore<string | null>(null)

// 2. логика
sample({ clock: publicProjectsRequested, target: fetchPublishedProjectsFx })
sample({ clock: fetchPublishedProjectsFx.doneData, target: $projects })
sample({ clock: fetchPublishedProjectsFx.failData, target: $projectsError })

// 3. экспорт
export const projectModel = {
  events: { publicProjectsRequested },
  stores: { $projects, $projectsError },
}
```

## Effector — структура папки `model/`

Одним файлом `model/index.ts` обходимся только если внутри модели одна зона ответственности целиком (например, `features/Auth/model/` — там только сессия, дробить не на что). Если внутри модели несколько самостоятельных зон ответственности (как в `entities/Project`: список, деталь, мутации, сабмит форм) — модель дробится на несколько файлов внутри `model/`, каждый строго по одной зоне:

```
model/
  index.ts     — только барель: импортирует бизнес-модели этой папки и actions.ts,
                 экспортирует единый объект <Entity/Page>Model = { events: {...}, stores: {...} }
  category.ts  — одна бизнес-модель: все create*/sample/экспорты, связанные с категориями
  detail.ts    — другая бизнес-модель: всё про детальный просмотр
  actions.ts   — единственное место, куда можно импортировать сразу несколько бизнес-моделей
                 из этой же папки; здесь описываются sample-связи МЕЖДУ ними
                 (например: "после успешной мутации — перезапросить список")
```

- Бизнес-модели (`category.ts`, `detail.ts` и т.п.) внутри одного `model/` **не импортируют друг друга напрямую** — только `entities` (для `pages`-моделей) или ничего постороннего (для `entities`-моделей, они самая нижняя точка).
- `actions.ts` — исключение из этого правила: туда можно и нужно импортировать сразу несколько соседних бизнес-моделей, чтобы связать их через `sample`. Официальная рекомендация Effector для аналогичного файла (`init.js`): он ничего не экспортирует, только импортирует юниты из разных моделей и описывает связи между ними (effector.dev, Best practices, v21) [https://v21.effector.dev/docs/conventions/best-practices/].
- Если связь нужна только с `entities`/`features`-моделью снаружи текущей папки `model/` (а не между двумя бизнес-моделями внутри одной папки) — `actions.ts` можно не создавать, wiring пишется прямо в файле нужной бизнес-модели (см. раздел "Изоляция моделей" выше).

## Effector — формы (обязательно)

**Все формы в проекте реализуются через `effector-forms` (`createForm`/`useForm`/`useField`), а не через `useState` на каждое поле.** Это правило без исключений — локальный `useState` для отдельных полей формы (`title`, `description`, `email`, `password` и т.п.) запрещён.

```ts
// model — createForm описывает поля, правила валидации и связь с эффектом сабмита
import { createForm } from "effector-forms";
import { sample } from "effector";

export const loginForm = createForm({
  fields: {
    email: {
      init: "",
      rules: [
        { name: "email", validator: (v: string) => /\S+@\S+\.\S+/.test(v) },
      ],
    },
    password: {
      init: "",
      rules: [{ name: "required", validator: (v: string) => Boolean(v) }],
    },
  },
  validateOn: ["submit"],
});

sample({ clock: loginForm.formValidated, target: signInFx });
```

```tsx
// компонент — useForm/useField, без единого useState на поле
import { useForm } from "effector-forms"

const { fields, submit, eachValid } = useForm(loginForm)

<input value={fields.email.value} onChange={e => fields.email.onChange(e.target.value)} />
```

- Валидация полей — через `rules` в `createForm`, не через ручные `if`-проверки в обработчике сабмита.
- Ошибка с сервера (например, из `failData` эффекта) добавляется полю через `sample({ source: someFx.failData, target: form.fields.addError })`, а не через отдельный `$error`-стор, живущий рядом с формой.
- Сброс формы после успешного сабмита — `form.reset` (или `fill`/`set`), не ручное обнуление каждого поля по отдельности.
- Файловые инпуты (`<input type="file">`) под `effector-forms` не подпадают напрямую (библиотека не про файлы) — для них состояние выбранного файла/файлов остаётся на уровне поля формы через `rules`/`init: null`, но сам объект `File` не хранится в сторе как значение по умолчанию — передавать в `submit`-эффект отдельным полем, задокументированным как исключение из общего правила "всё через `fields.value`".

## Effector — архитектурные ограничения

### Экспорт юнитов

- Из модели **нельзя** экспортировать эффекты (`createEffect`).
- Экспортировать разрешено только **сторы** и **ивенты**.
- Модель экспортирует один именованный объект: `export const projectModel = { ... }`

### Изоляция моделей

- Модели **не импортируют** друг друга напрямую внутри одного слоя (`entities` не импортирует другой `entities`).
- `pages`-модели могут импортировать модели `entities`/`features` — это и есть точка связывания.
- В `pages` файл `actions.ts` можно не создавать — если связь с entity нужна только для импорта, wiring пишется прямо в файле модели страницы.

### useUnit в React

- Сторы собираются в один массив: `const [projects, error, isLoading] = useUnit([$projects, $projectsError, $isLoading])`
- Ивенты — отдельный `useUnit` на каждый или отдельным массивом: `const [tabClicked, formOpened] = useUnit([categoryTabClicked, createFormOpened])`
- **Не смешивать сторы и ивенты в одном массиве** `useUnit`
- Не использовать `.watch()` в компонентах для получения данных — если нужно среагировать на завершение эффекта (например, сбросить форму), заводить производный стор-сигнал (например, счётчик `$formResetCount`, инкрементируемый через `.on(effectFx.done, n => n + 1)`) и читать его через `useUnit` + `useEffect`

### Логика

- `sample` для связи юнитов — `watch` только для отладки
- Никогда `$store.getState()` — данные передавать через `source` в `sample`
- Все юниты создаются статически на уровне модуля, не в рантайме
- Бизнес-логика (запросы, мутации, реакции на их результат) полностью вне React-компонентов; чисто визуальный UI-стейт (какая вкладка выбрана визуально, открыта ли форма) может оставаться в `useState`, если он не участвует в потоке данных к бизнес-эффектам
- В `sample` для одного и того же набора связанных эффектов использовать единообразно либо `.done`, либо `.doneData` — не смешивать в одном `clock`

### Эффекты

- Всегда типизировать тремя дженериками: `createEffect<Params, Result, Error>(fn)`
- Никогда не вызывать ивенты/эффекты внутри тела эффекта — использовать `sample`
- Если операция состоит из нескольких последовательных шагов, которые всегда выполняются вместе (например, "загрузить файлы → создать запись"), — описывать их одним эффектом, а не дробить на отдельные `sample`-цепочки, которые можно случайно рассинхронизировать
- Внешние подписки (например, слушатель изменения сессии), которые не укладываются в модель "одноразовый async-вызов", — оборачивать в эффект, который один раз подписывается и вызывает событие (`someEvent(payload)`) из колбэка; подписка настраивается через `sample({ clock: initEvent, target: [checkFx, initListenerFx] })`, а не в `useEffect` компонента

## Алиасы и пути

- `@app/*` → `src/app/*`
- `@pages/*` → `src/pages/*`
- `@widgets/*` → `src/widgets/*`
- `@features/*` → `src/features/*`
- `@entities/*` → `src/entities/*`
- `@shared/*` → `src/shared/*`
- `@/*` → `src/*`

## Supabase — типы и структура данных

- Типы сущностей (`IUiDesignProject`, `IGraphicDesignProject`, `IIllustrationProject`) повторяют структуру строк в таблицах Supabase **без маппинга** — snake_case-поля (`thumbnail_url`, `is_published`) остаются как есть, без перевода в camelCase.
- Общая часть между несколькими типами проекта выносится в базовый интерфейс (`IBaseProject`) и расширяется через `extends`.
- Каждая категория проекта хранится в отдельной таблице; соответствие категории и имени таблицы — константа `CATEGORY_TABLE` в `config/`, типизированная через `as const satisfies Record<TProjectCategory, string>`, чтобы `.from(table)` получал буквенный (literal) тип, а не широкий `string`.

## Компоненты — UI

- `shared/ui/*` — компоненты без собственной бизнес-логики, получают все данные через пропсы; не обращаются к Effector-моделям и не делают сетевые запросы напрямую.
- Компоненты, переиспользуемые на нескольких страницах (например, переключатель категорий), выносятся в `widgets/`, а не дублируются внутри `pages/*/ui/`.
