# AI Chef Landing

Marketing landing page for **AIChefMate** — a test case for an AI-assisted frontend production workflow in Cursor.

**Live demo:** [https://ai-chef-landing.marina-sirenko1-80f.workers.dev/](https://ai-chef-landing.marina-sirenko1-80f.workers.dev/)

## Why this project exists

This repository is not just a landing page. It is the first real output of an experiment:

> Can I speed up landing page production with Cursor without losing control over code quality?

The goal behind the experiment is practical. I am improving frontend skills for my next professional step and preparing to take on routine landing-page work (for example via Upwork) while keeping costs under control. Courses, subscriptions, tokens, and plugins add up — so the workflow itself had to become more efficient.

The approach was deliberately **not** “AI, build a website for me.” Instead, the work was split into repeatable steps, and Cursor helped move through routine tasks faster while the developer kept ownership of architecture, semantics, accessibility, performance, and final polish.

A community Figma template (AI Chef / meal-planning theme) was chosen as the source design because it is representative of real client work: multiple sections, typography, imagery, cards, pricing, FAQ, and marketing copy — complex enough to stress-test the pipeline, but still a single static page.

## What this project is for

This repo documents and demonstrates:

- A **command-driven Cursor workflow** for landing pages (see [AGENT.md](./AGENT.md))
- A **Figma → code pipeline** that treats design as data, not as copy-paste HTML
- **Safe Git and deploy automation** with engineering hygiene built in
- A **production deploy** on Cloudflare Workers Static Assets with a real performance audit

It is a learning and portfolio artifact first. The next step is to see how the same approach scales to more complex applications.

## Why there is no mobile or tablet layout

The Figma source contains a **single desktop artboard** (Landing frame, ~1440px). There are no mobile or tablet frames in the design file, and responsive layouts were **intentionally out of scope** for this experiment.

Reasons:

1. **Scope control** — the goal was to validate the full pipeline (audit → tokens → assets → HTML → CSS → a11y → SEO → deploy → perf) on one viewport, not to deliver a production-ready multi-breakpoint site.
2. **Honest workflow testing** — many real projects start from desktop-only Figma files; the commands had to handle that case safely instead of pretending breakpoints exist.
3. **Manual polish budget** — after the automated pass, time went into matching the desktop design more closely, not into designing and testing separate layouts.

The base CSS layer includes minimal breakpoint hooks left over from scaffolding, but **mobile and tablet views were not designed, implemented, tested, or manually refined**. Treat the live site as a desktop-first demo.

## Results

### Workflow acceleration

After one full pass through the command pipeline, the repeatable flow looked like this:

```txt
Figma
→ audit
→ tokens
→ assets
→ section map
→ semantic HTML
→ BEM review
→ base CSS
→ accessibility
→ SEO
→ assets review
→ fixes
→ deploy
→ performance audit
→ manual desktop polish
```

Each Cursor command acts as a small **working contract** (what it may do, what it must not do, which files it reads/writes, when to stop). That made the process far more predictable than open-ended prompts.

Approximate cost for the full experiment on a basic Cursor subscription (Composer 2.5): usage went from **18% to 35%** of the monthly limit. The Figma design cost **€2** in Figma Community; Figma MCP required a paid Figma plan.

### Performance

The site was deployed to Cloudflare Workers Static Assets and audited with Chrome DevTools MCP (via the `user-run-web-perf-audit` command — not curl/headers).

| Metric | Before fixes | After fixes | Good threshold |
|--------|-------------|-------------|----------------|
| **LCP** | 655 ms | **459 ms** | < 2.5 s |
| **CLS** | 0.02 | **0.00** | < 0.1 |
| **TTFB** | 334 ms | — | < 800 ms |

Fixes applied after the first audit: removed unused GSAP, self-hosted Syne and Work Sans fonts (dropped Google Fonts), added long-cache headers for hashed assets, wired WebP + fallback images through `<picture>`, and optimized heavy raster exports.

Lighthouse accessibility scored **100/100** on the deployed URL.

## Stack

- HTML / CSS / JavaScript (vanilla, no framework)
- Vite — dev server and production build
- Plain CSS — BEM, layered architecture, CSS custom properties
- Cloudflare Workers Static Assets — production hosting

## Project structure

```txt
src/
  assets/          # images, icons, fonts, logos
  scripts/         # main.js, process-slider.js
  styles/
    base/          # reset, variables, typography, fonts
    layout/        # container, sections
    components/    # buttons, cards
    sections/      # one file per landing section
    utilities/     # accessibility, images, animations
index.html
public/            # _headers (cache rules)
wrangler.jsonc     # Cloudflare Workers config
```

## Getting started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

### Build

```bash
npm run build
```

Output is written to `dist/`.

### Preview production build

```bash
npm run preview
```

## Deployment

This project is deployed to Cloudflare Workers Static Assets.

### Production URL

[View deployed site](https://ai-chef-landing.marina-sirenko1-80f.workers.dev)

### Deploy command

```bash
npm run deploy
```

### Local Cloudflare preview

```bash
npm run dev:cf
```

### Performance audit

After deployment, run:

```txt
user-run-web-perf-audit https://ai-chef-landing.marina-sirenko1-80f.workers.dev
```

### Routing

SPA fallback is not enabled. This is expected for simple static landing pages or projects without a client-side router.

## AI-assisted workflow

This project was built with custom Cursor commands and MCP tools (Figma, Chrome DevTools, Cloudflare).

See **[AGENT.md](./AGENT.md)** for the full automation pipeline, command list, and what stays with the developer.

## Credits

- UI design based on a Figma Community template (AI Chef / meal planning theme)
- Built as part of a Cursor workflow experiment, 2026
