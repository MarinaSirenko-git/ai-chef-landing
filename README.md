**[EN](#en)**  ·  **[RU](#ru)**

---



# AIChefMate — Responsive Landing Page

> **Front-end portfolio case study.** Engineering a desktop-only Figma design into a layout that holds up flawlessly across every screen — from a 360px phone to a 34" ultrawide — with fluid scaling, hand-tuned per-section reflow, and a near-perfect Lighthouse profile.

**Stack:** HTML · CSS · JavaScript · GSAP · Vite · Cloudflare Workers Static Assets  
**Lighthouse:** Performance 98 · Accessibility 100 · Best Practices 100 · SEO 100

🔗 **Live demo:** [https://ai-chef-landing.marina-sirenko1-80f.workers.dev](https://ai-chef-landing.marina-sirenko1-80f.workers.dev)  
🎨 **Design:** [AIChefMate template by Olga Averchenko](https://olgaaverchenko.gumroad.com/l/aichefmate) · front-end implementation by me

---

## Context

The design came as a single, maximum-size desktop mockup. The responsive layer — how it behaves on laptops, tablets, and phones — was entirely undefined, which is exactly where the engineering happens. I owned every adaptation decision: breakpoints, reflow order, what scales, what hides, how shapes transform.

## The challenge

A mockup drawn for one wide screen encodes proportions and hierarchy, not absolute heights to reproduce pixel-for-pixel. Translated literally it overflows on a laptop and breaks on a phone. The real work was turning that fixed canvas into a system that scales by content and ratio while keeping the design's character intact — and doing it without per-device hacks or anything breaking between breakpoints.

## What I built

- **Full responsive system, 360 → 1920+.** Pure CSS, desktop-first, with a breakpoint matrix (1536 / 1024 / 768 / 480) mapped to real devices rather than arbitrary numbers.
- **Fluid scaling with `clamp()` instead of hard steps.** Typography, spacing, and components scale proportionally between anchor widths — the layout reads consistently at any size and never needs a "zoom to fit" workaround.
- **Per-section reflow strategies** where naive stacking would break the design:
  - Hero gallery: 3 → 2 → 1 columns, hiding side images progressively rather than squashing them.
  - Benefits bento grid: vertical capsules soften into readable cards on mobile while keeping the colour rhythm.
  - Pricing: 3 → 1 stack with the featured plan's emphasis preserved after it loses its raised position.
  - Step slider: swipe and buttons working together via scroll-snap.
  - Footer: multi-column desktop layout reflowing into a clean single-column stack.
- **Native video with custom mini-controls** in place of a YouTube embed — the pill-shaped frame clipped native controls, so the controls were rebuilt inside the capsule's safe zone, free of third-party branding.
- **GSAP animation** on the hero, process slider, and FAQ accordion for a more alive first impression.
- **Performance & delivery:** responsive WebP images, self-hosted fonts, long-cache headers, SEO essentials, deployed on Cloudflare Workers Static Assets.

## Engineering approach

The design specified one screen size; every responsive decision was mine to make and justify — adaptation treated as a design problem, not a mechanical resize.

Verified on physical hardware and an emulated device matrix:

- **Physical:** MacBook Air 13", Samsung Galaxy S21, Xiaomi 34" ultrawide monitor.
- **Emulated:** iPad Air, iPad Mini, iPad Pro 11"/13", iPhone 17 Pro Max, iPhone SE, generic laptops, plus a custom Samsung S21 profile.

AI-assisted automation (Cursor commands + MCP) handled repetitive markup, keeping focus on layout and UX decisions. See [AGENT.md](./AGENT.md) for the workflow details.



## Results


| Metric         | Score |
| -------------- | ----- |
| Performance    | 98    |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 100   |


Renders correctly across the full device matrix above, on a structured, maintainable codebase.

## Tech stack


| Area             | Tools                                                               |
| ---------------- | ------------------------------------------------------------------- |
| Markup & styling | HTML, CSS (pure, desktop-first, `clamp()`-based fluid scaling, BEM) |
| Behaviour        | Vanilla JavaScript                                                  |
| Animation        | GSAP                                                                |
| Build            | Vite                                                                |
| Hosting          | Cloudflare Workers Static Assets (Wrangler)                         |


## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ (LTS recommended)
- npm (comes with Node.js)

### Install & run locally

```bash
# clone the repo, then:
npm install
npm run dev
```

Open the URL shown in the terminal — usually `http://localhost:5173`.

### Available scripts


| Command                | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `npm run dev`          | Vite dev server with hot reload                             |
| `npm run build`        | Production build → `dist/`                                  |
| `npm run preview`      | Preview the production build locally                        |
| `npm run dev:cf`       | Local preview via Wrangler (Cloudflare Workers environment) |
| `npm run deploy`       | Build and deploy to Cloudflare Workers                      |
| `npm run format`       | Format project files with Prettier                          |
| `npm run format:check` | Check formatting without writing                            |


### Project structure

```txt
src/
  assets/          # images, icons, fonts, video
  scripts/         # main.js, sliders, accordion, demo video
  styles/
    base/          # reset, variables, typography, fonts
    layout/        # container, sections
    components/    # buttons, cards
    sections/      # one CSS file per landing section
    utilities/     # accessibility, images, animations
index.html
public/            # _headers (cache rules), favicon
wrangler.jsonc     # Cloudflare Workers config
```

## Deployment

This project is deployed to **Cloudflare Workers Static Assets**.

**Production URL:** [https://ai-chef-landing.marina-sirenko1-80f.workers.dev](https://ai-chef-landing.marina-sirenko1-80f.workers.dev)

```bash
npm run deploy
```

SPA fallback is not enabled — this is a static landing page without client-side routing.

## Credits

- **Design:** [AIChefMate template by Olga Averchenko](https://olgaaverchenko.gumroad.com/l/aichefmate).
- **Front-end:** responsive engineering, animation, optimization, and deployment by me.
- Brand name and content belong to the original template author.

---



# AIChefMate — адаптивный лендинг

> **Front-end кейс для портфолио.** Из десктопного макета Figma — в вёрстку, которая уверенно держится на любом экране: от 360px телефона до 34" ultrawide. Fluid-масштабирование, ручной reflow по секциям и почти идеальный Lighthouse.

**Стек:** HTML · CSS · JavaScript · GSAP · Vite · Cloudflare Workers Static Assets  
**Lighthouse:** Performance 98 · Accessibility 100 · Best Practices 100 · SEO 100

🔗 **Live demo:** [https://ai-chef-landing.marina-sirenko1-80f.workers.dev](https://ai-chef-landing.marina-sirenko1-80f.workers.dev)  
🎨 **Дизайн:** [шаблон AIChefMate — Olga Averchenko](https://olgaaverchenko.gumroad.com/l/aichefmate) · front-end реализация — моя

---

## Контекст

Дизайн представлен в виде максимального десктопного макета. Адаптив, (а именно как сайт ведёт себя на ноутбуке, планшете и телефоне) не был описан. Мной была проделана следующая работа: breakpoints, порядок reflow, что масштабируется, что скрывается, как меняются формы.

## Задача

Макет под широкий экран задаёт пропорции и иерархию, а не абсолютные высоты «пиксель в пиксель». Буквальный перенос ломается на ноутбуке и телефоне. Нужно было превратить фиксированный холст в систему, которая масштабируется по контенту и ratio, сохраняя характер дизайна — без костылей под каждое устройство и без поломок между breakpoints.

## Что сделано

- **Полная responsive-система, 360 → 1920+.** Чистый CSS, desktop-first, сетка breakpoints (1536 / 1024 / 768 / 480) под реальные устройства, а не случайные числа.
- **Fluid-масштабирование через `clamp()`** вместо жёстких ступеней. Типографика, отступы и компоненты плавно меняются между опорными ширинами — макет читается на любом размере без «zoom to fit».
- **Reflow по секциям**, где простое складывание в колонку ломает дизайн:
  - Hero gallery: 3 → 2 → 1 колонка, боковые изображения скрываются постепенно.
  - Benefits bento: вертикальные капсулы на mobile становятся читаемыми карточками с сохранением цветового ритма.
  - Pricing: 3 → 1 колонка, акцент featured-плана сохранён без «приподнятой» карточки.
  - Step slider: swipe и кнопки вместе через scroll-snap.
  - Footer: многоколоночный desktop → чистый single-column stack на mobile.
- **Нативное видео с кастомными mini-controls** вместо YouTube — pill-форма обрезала стандартные controls, поэтому панель пересобрана внутри «безопасной» зоны капсулы.
- **GSAP-анимации** в hero, process slider и FAQ accordion.
- **Performance & delivery:** responsive WebP, self-hosted шрифты, cache headers, SEO, деплой на Cloudflare Workers Static Assets.

## Подход

В макете был один размер экрана; каждое адаптивное решение — моя ответственность. Адаптация как design problem, а не механический resize.

Проверено на реальных устройствах и эмуляции:

- **Физически:** MacBook Air 13", Samsung Galaxy S21, Xiaomi 34" ultrawide.
- **Эмуляция:** iPad Air, iPad Mini, iPad Pro 11"/13", iPhone 17 Pro Max, iPhone SE, ноутбуки, профиль Samsung S21.

Рутинную разметку ускоряла AI-автоматизация (Cursor commands + MCP), фокус оставался на layout и UX. Подробнее — [AGENT.md](./AGENT.md).



## Результаты


| Метрика        | Оценка |
| -------------- | ------ |
| Performance    | 98     |
| Accessibility  | 100    |
| Best Practices | 100    |
| SEO            | 100    |


Корректный рендер на всей матрице устройств, структурированная и поддерживаемая кодовая база.

## Стек


| Область  | Инструменты                                     |
| -------- | ----------------------------------------------- |
| Вёрстка  | HTML, CSS (pure, desktop-first, `clamp()`, BEM) |
| Логика   | Vanilla JavaScript                              |
| Анимация | GSAP                                            |
| Сборка   | Vite                                            |
| Хостинг  | Cloudflare Workers Static Assets (Wrangler)     |


## Запуск проекта

### Требования

- [Node.js](https://nodejs.org/) 20+ (рекомендуется LTS)
- npm (устанавливается вместе с Node.js)

### Установка и локальный запуск

```bash
# после клонирования репозитория:
npm install
npm run dev
```

Откройте URL из терминала — обычно `http://localhost:5173`.

### Доступные команды


| Команда                | Описание                                                        |
| ---------------------- | --------------------------------------------------------------- |
| `npm run dev`          | Dev-сервер Vite с hot reload                                    |
| `npm run build`        | Production-сборка → `dist/`                                     |
| `npm run preview`      | Локальный просмотр production-сборки                            |
| `npm run dev:cf`       | Локальный preview через Wrangler (окружение Cloudflare Workers) |
| `npm run deploy`       | Сборка и деплой на Cloudflare Workers                           |
| `npm run format`       | Форматирование Prettier                                         |
| `npm run format:check` | Проверка форматирования без записи                              |


### Структура проекта

```txt
src/
  assets/          # изображения, иконки, шрифты, видео
  scripts/         # main.js, слайдеры, accordion, demo video
  styles/
    base/          # reset, variables, typography, fonts
    layout/        # container, sections
    components/    # buttons, cards
    sections/      # один CSS-файл на секцию лендинга
    utilities/     # accessibility, images, animations
index.html
public/            # _headers (cache rules), favicon
wrangler.jsonc     # конфиг Cloudflare Workers
```

## Деплой

Проект размещён на **Cloudflare Workers Static Assets**.

**Production URL:** [https://ai-chef-landing.marina-sirenko1-80f.workers.dev](https://ai-chef-landing.marina-sirenko1-80f.workers.dev)

```bash
npm run deploy
```

SPA fallback не включён — это статический лендинг без client-side routing.

## Credits

- **Дизайн:** [шаблон AIChefMate — Olga Averchenko](https://olgaaverchenko.gumroad.com/l/aichefmate).
- **Front-end:** адаптив, анимации, оптимизация и деплой — моя работа.
- Название бренда и контент принадлежат автору шаблона.

