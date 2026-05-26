# AI Chef Landing

Marketing landing page for AI Chef — a lightweight, accessible static site built with Vite.

**Demo:** *Coming soon*

## Stack

- HTML / CSS / JavaScript
- Vite
- GSAP
- Plain CSS (BEM, CSS variables)
- Cloudflare Pages (recommended deployment)

## Features

- Semantic HTML structure (`header`, `main`, `footer`)
- Responsive layout via CSS custom properties
- Accessible base structure (skip link, focus styles)
- Organized asset folders for images, icons, and fonts
- GSAP ready for page animations
- Production build via Vite

## Project Structure

```txt
src/
  assets/
    images/
    icons/
    fonts/
  scripts/
    main.js
  styles/
    main.css
    base/
    layout/
    components/
    sections/
    utilities/
index.html
public/
```

## Getting Started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Build

```bash
npm run build
```

Output is written to `dist/`.

## Preview

Preview the production build locally:

```bash
npm run preview
```

## Deployment

Deploy to [Cloudflare Pages](https://pages.cloudflare.com/) with these settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Production branch | `main` |

For Workers-based static hosting, use `setup-cloudflare-workers-static` and `deploy-cloudflare-workers-static`.

## Accessibility Notes

- Semantic page structure with landmark regions
- Skip link to main content (`#main-content`)
- Use a proper heading hierarchy as sections are added
- Reduced motion support in `src/styles/utilities/animations.css`

## Performance Notes

- Keep images in `src/assets/images/` and prefer modern formats (WebP) where possible
- Add `loading="lazy"` to below-the-fold images as content grows
- Run `npm run build` before deploying to verify the bundle

## Implementation Notes

- Styles use a layered CSS architecture (reset, variables, typography, layout, components, utilities)
- Section-specific styles live under `src/styles/sections/` — add markup first, then styles
- GSAP defaults are configured in `src/scripts/main.js`
- Tailwind is not used; use `setup-styles-tailwind` only if you switch styling approaches

## AI-assisted workflow

This project uses an AI-assisted development workflow.

See [AGENT.md](./AGENT.md) for details.

## Credits

Add design or reference credits here when applicable.
