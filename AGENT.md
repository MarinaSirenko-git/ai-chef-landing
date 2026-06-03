# AI-assisted development workflow

This project was built with an **AI-assisted frontend workflow in Cursor**. The goal was not to replace manual development, but to reduce repetitive scaffolding and move through routine landing-page tasks faster — while the developer keeps ownership of architecture, semantics, accessibility, performance, and final quality.

A Cursor **command** is a Markdown file that describes a working contract for the agent:

- what the command is allowed to do
- what it must not do
- which files it reads
- which files it can update
- where it should write a report
- when it should stop
- what counts as a successful result

The more precise the contract, the less chaos you get.

## Tools used

| Tool | Role |
|------|------|
| **Cursor** | AI-assisted editing, custom commands |
| **Figma MCP** | Design audit, token extraction, asset export |
| **Chrome DevTools MCP** | Real browser performance audits |
| **Cloudflare Wrangler** | Workers Static Assets deploy |
| **Vite** | Dev server and production bundling |
| **Git / GitHub** | Version control with safety checks |

## Full automation pipeline

This is the end-to-end flow used for this landing page. Run commands in order unless noted.

```txt
1.  Project bootstrap          (starter + styles + docs)
2.  Git init + commits          (safe version control)
3.  Figma audit                 (design quality gate)
4.  Design tokens               (colors, type, spacing)
5.  Asset export                (SVG / WebP / JPG categorization)
6.  Section map                 (frontend-oriented page structure)
7.  Semantic HTML skeleton      (landmarks, headings, lists)
8.  BEM structure review        (class naming cleanup)
9.  Base CSS                    (reset, variables, sections — not pixel-perfect)
10. Accessibility attributes    (aria, alt, heading hierarchy)
11. Basic SEO                   (title, meta, OG, canonical)
12. Assets quality review       (size, fallbacks, lazy-load rules)
13. Assets quality fixes        (picture wiring, optimization)
14. Manual desktop polish       (developer — not automated)
15. Cloudflare deploy           (build → wrangler deploy)
16. Performance audit           (Chrome DevTools MCP / web-perf)
```

Reports from Figma-related commands are written under `.cursor-output/figma/`.

---

## Step 1 — Git workflow

These commands add **engineering hygiene**, not just CLI wrappers.

| Command | Purpose |
|---------|---------|
| `user-init-git-project` | Initialize Git, create `.gitignore` |
| `user-commit-changes` | Review status and diff; block `.env`, keys, `node_modules`, `dist`; run build if available; create Conventional Commit |
| `user-create-github-repo` | Create remote repository |
| `user-push-changes` | Check branch and uncommitted changes; `git fetch`; `git pull --rebase origin main`; then push |

**Status in this project:** initialized, committed, pushed.

---

## Step 2 — Project starter

Bootstrap separates **project creation** from **styling choice**.

| Command | Purpose |
|---------|---------|
| `user-create-landing-starter-html` | Vite vanilla scaffold, folder structure, minimal HTML skeleton |
| `user-create-landing-starter-vue` | Alternative: Vite + Vue scaffold (not used here) |
| `user-setup-styles-css` | Layered CSS: variables, base, layout, components, sections, utilities |
| `user-setup-styles-tailwind` | Alternative: Tailwind setup (not used here) |
| `user-setup-project-readme` | README from detected stack and scripts |
| `user-setup-agent-doc` | This workflow document |

**Decisions for this project:**

- Vanilla HTML over Vue — static landing, no SPA
- Plain CSS over Tailwind — BEM layers and centralized CSS variables

**Status:** all starter commands completed.

---

## Step 3 — Deployment

Evaluated GitHub Pages vs Cloudflare Pages. For this test, **Cloudflare Workers Static Assets** was chosen: production-like hosting, preview URLs, custom domain support, observability.

| Command | Purpose |
|---------|---------|
| `user-setup-cloudflare-workers-static` | Create `wrangler.jsonc`, add deploy scripts, configure assets directory, enable observability, update README |
| `user-deploy-cloudflare-workers-static` | Verify auth, run build, dry-run deploy, deploy, save URL to README |
| `user-run-web-perf-audit` | Real browser audit via Chrome DevTools MCP or Cloudflare `/web-perf` |

**Deploy flow:**

```txt
Vite project → npm run build → wrangler deploy → workers.dev URL → performance audit
```

**Important rule for `user-run-web-perf-audit`:** `curl`, `head`, and `wget` are **not** a performance audit. The command must use Chrome DevTools MCP or Cloudflare `/web-perf`.

**Status:** deployed to [https://ai-chef-landing.marina-sirenko1-80f.workers.dev](https://ai-chef-landing.marina-sirenko1-80f.workers.dev). Performance audit completed; fixes applied (see Results below).

---

## Step 4 — Figma workflow

Figma is treated as a **source of data**. Frontend rules decide how that data becomes code.

There is no “Figma → finished landing page” magic button. Designs can contain `Frame 123`, messy groups, decorative layers, and effects that must not be copied directly into HTML.

### 4.1 Design audit (gate)

| Command | Purpose |
|---------|---------|
| `user-audit-figma-before-code` | Report on sections, layer quality, variables, assets, layout risks, a11y risks |

Stop here if the design is too messy or missing structure.

### 4.2 Tokens and assets

| Command | Purpose |
|---------|---------|
| `user-extract-design-tokens` | Extract colors, typography, spacing, radius, shadows; separate official Figma variables from inferred values |
| `user-export-figma-assets` | Export and categorize: SVG for icons/logos, WebP/JPG/PNG for photos, CSS-only for simple shapes |

### 4.3 Structure and markup

| Command | Purpose |
|---------|---------|
| `user-generate-section-map` | Frontend section map (hero, services, process, blog, faq, cta, footer, etc.) — prevents copying raw Figma layers |
| `user-generate-html-skeleton` | Semantic HTML from section map |

**HTML rules enforced:**

- one `<main>`, one `<h1>`, `<h2>` for sections, `<h3>` for cards
- `<nav>`, `<ul>/<li>/<a>` for menus
- `<button>` for actions, `<details>/<summary>` for simple FAQ
- proper `alt` attributes
- `<picture>` when WebP and JPG/PNG fallback both exist

| Command | Purpose |
|---------|---------|
| `user-generate-bem-structure` | Review classes: remove Figma-like names, fix BEM, add reusable blocks and typography utilities |

Example pattern:

```html
<h2 class="services__title section-title"></h2>
<p class="services__text section-text"></p>
```

### 4.4 Styles, a11y, SEO

| Command | Purpose |
|---------|---------|
| `user-generate-base-css` | First CSS layer: reset, variables, typography, container, sections, buttons, cards, forms, images, a11y helpers. Not final pixel-perfect CSS. |
| `user-add-a11y-attributes` | Headings, `aria-labelledby`, images, buttons vs links, forms, duplicate ids |
| `user-add-basic-seo` | Title, meta description, canonical, Open Graph, Twitter card, favicon |

### 4.5 Assets quality

| Command | Purpose |
|---------|---------|
| `user-review-assets-quality` | File sizes, WebP fallbacks, `<picture>` wiring, hero lazy-load rules, unused assets |
| `user-fix-assets-quality` | Safe fixes: wire fallbacks, remove `loading="lazy"` from hero, optimize heavy images when safe |

**Status:** full Figma pipeline completed for the desktop Landing frame. Recipes and detail pages in the Figma file were not exported.

---

## Step 5 — Manual work (developer)

After the automated pass, the developer manually polished the **desktop layout** to match the design more closely — spacing, section-specific layout, process slider, demo video block, and other details that require human judgment.

This step is **not** automated and is where final quality lives.

---

## What was automated

- Vite project initialization and folder structure
- Layered CSS architecture and design tokens from Figma
- Semantic HTML skeleton for all landing sections
- BEM class review and reusable typography/section utilities
- Base CSS for every section (first pass)
- Accessibility attribute pass and SEO metadata
- Figma asset export, optimization, and `<picture>` fallback wiring
- Cloudflare Workers Static Assets setup and deploy
- Browser-based performance audit and follow-up fixes (remove unused GSAP, self-host fonts, cache headers)

## What stays with the developer

- **Final visual polish** — pixel-level desktop matching
- **Responsive layouts** — out of scope; Figma had no mobile/tablet frames
- **Content decisions** — copy edits, CTA wording, legal text
- **Interactive behavior** — e.g. process slider, demo video UX
- **Architecture choices** — vanilla vs Vue, CSS vs Tailwind
- **Acceptance** — whether the page is ready to ship

## Quality checks

| Check | Status |
|-------|--------|
| `npm run build` | Passed |
| Semantic HTML + landmarks | Passed |
| Accessibility (Lighthouse) | 100/100 on deployed URL |
| SEO metadata | Canonical, OG, Twitter card added |
| Asset fallbacks | WebP + JPG/PNG via `<picture>` |
| Deploy | Live on Workers Static Assets |
| Performance audit | LCP **459 ms**, CLS **0.00** (after fixes) |
| Responsive mobile/tablet | Not in scope |

## Lessons learned

1. **Commands must be strict.** Vague commands led to incomplete audits (e.g. checking headers instead of running Chrome DevTools) or unpredictable agent behavior.
2. **Cursor can be unstable on long command chains.** If a command fails mid-run, Cursor may show a blank screen or lose commands from the list — restarting the window or app usually helps.
3. **Separate real tokens from guesses.** Figma variables and inferred values must be labeled differently so the agent does not treat guesses as official design tokens.
4. **Figma → code needs a section map.** Without it, agents copy layer names and frame structure directly into HTML.
5. **AI assists; developer owns quality.** This workflow is about speed on routine work, not replacing frontend engineering.

## Updating this document

When new commands are run (deploy, perf audit, new sections), update the **Status** rows and the pipeline so this file stays accurate.
