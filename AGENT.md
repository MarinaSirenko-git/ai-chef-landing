# AI-assisted Development Workflow

This project was built using an AI-assisted frontend workflow in Cursor.

The goal was not to replace manual development, but to reduce repetitive scaffolding and setup work during landing page production.

## Tools Used

- **Cursor** — AI-assisted editing and command-driven setup
- **Custom Cursor commands** — standardized project bootstrap (see below)
- **Vite** — dev server and production bundling
- **GSAP** — animation library (installed, defaults configured)
- **Plain CSS** — BEM-oriented layered styles with CSS custom properties
- **Git / GitHub** — planned for version control and hosting (not initialized in repo yet)
- **Cloudflare Pages** — documented as the recommended static deploy target (not configured yet)

## Custom Commands Used

Commands run during initial project setup:

| Command | Purpose |
| --- | --- |
| `create-landing-starter-html` | Vite vanilla scaffold, folder structure, GSAP, minimal HTML skeleton |
| `setup-styles-css` | Layered CSS architecture (reset, variables, layout, components, utilities) |
| `setup-project-readme` | Project README with stack, scripts, and deployment notes |
| `setup-agent-doc` | This workflow document |

Commands available for later steps (not run yet):

- `init-git-project` — initialize Git and `.gitignore`
- `create-github-repo` — create remote repository
- `commit-changes` / `push-changes` — version control workflow
- `setup-github-pages-deploy` — GitHub Pages deployment
- `setup-cloudflare-workers-static` / `deploy-cloudflare-workers-static` — Cloudflare Workers static assets
- `run-web-perf-audit` — browser-based performance audit
- `setup-styles-tailwind` — alternative styling path (not used; project uses plain CSS)

The Vue starter (`create-landing-starter-vue`) and Tailwind setup (`setup-styles-tailwind`) are not relevant to this HTML project.

## What Was Automated

- Vite project initialization and dependency installation (`vite`, `gsap`)
- Standard `src/` layout (`assets/`, `scripts/`, `styles/`)
- Accessible HTML starter (`skip-link`, `header`, `main`, `footer`)
- CSS file structure and import chain in `main.css`
- Design tokens in `variables.css` (colors, spacing, radii, responsive overrides)
- Base reset, typography, container utility, button BEM block, and reduced-motion utility
- README generation from detected `package.json` scripts and stack
- Production build verification (`npm run build`)

## What Was Manually Reviewed

The developer should review and own:

- **Content and copy** — page text, headings, and CTAs are still placeholder-level
- **Visual design** — brand colors, typography, and section layouts beyond the starter tokens
- **Section markup** — hero and other landing sections are not implemented yet (`hero.css` is a placeholder)
- **GSAP animations** — only default tween settings exist; no scroll or entrance animations yet
- **Assets** — images, icons, and fonts in `src/assets/` are empty placeholders
- **Deployment** — Cloudflare or GitHub hosting must be configured and verified before launch
- **Legal / credits** — reference designs and attribution in README `Credits`

## Developer Decisions

- **Vanilla HTML over Vue** — simpler static landing without a SPA framework
- **Plain CSS over Tailwind** — maintainable BEM layers and centralized CSS variables
- **GSAP included early** — animation tooling available before section implementation
- **Cloudflare Pages as deploy target** — documented in README; Workers static commands remain optional
- **Minimal starter scope** — no demo sections or Tailwind until explicitly requested

## Quality Checks

| Check | Status |
| --- | --- |
| `npm run build` | Passed during scaffold and CSS setup |
| Accessibility | Base only — skip link, semantic landmarks, `prefers-reduced-motion` utility |
| Performance audit | Not run (`run-web-perf-audit` available) |
| Responsive layout | CSS variables adjust at `768px`; full section layouts pending |
| Git workflow | Not initialized yet |
| Deployment | Documented; not live |

## Notes

AI was used as a development assistant for repeatable setup tasks. Final implementation decisions, design, content, deployment, and acceptance remain with the developer.

Update this file when new commands are run (e.g. Git init, deploy, or performance audit) so the workflow stays accurate.
