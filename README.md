# Calculadora de Peajes (Toll Calculator — Web)

A fast, mobile-first web version of the Tkinter
[**TollCalculator**](https://github.com/ChumaSuey/TollCalculator) desktop app,
built with **React + Vite**. Designed to be opened on a phone while working the
tolls. No backend — it runs entirely in the browser and is hosted on GitHub Pages.

## Features

- **Dynamic rows:** add or remove `Monto` / `Cantidad` entries. Cantidad defaults to `1`.
- **Live total:** updates as you type, formatted as currency (`$1,234.50`).
- **Keyboard shortcuts** (when not typing in a field):
  - `Q` add a row
  - `W` reset all fields
  - `E` delete the last row
  - `Enter` on a Cantidad field adds a new row
- **Mobile-first UI:** large touch targets, sticky total bar, numeric keyboards, safe-area aware.
- **Dark / light theme:** follows your system by default, with a manual toggle that persists.
- **No data leaves your device** — nothing is sent anywhere.

## Requirements

- Node.js 20.19+ (or 22.12+)
- [pnpm](https://pnpm.io) — enable with `corepack enable`, or install globally with `npm i -g pnpm`

## Development

```bash
pnpm install
pnpm dev
```

The dev server serves the app under the `base` path:
`http://localhost:5173/Tollcalc-web/`.

## Scripts

| Command          | Description                     |
| ---------------- | ------------------------------- |
| `pnpm dev`       | Start the dev server with HMR   |
| `pnpm build`     | Production build into `dist/`   |
| `pnpm preview`   | Preview the production build    |
| `pnpm test`      | Run unit tests (Vitest)         |
| `pnpm lint`      | Lint with Oxlint                |

## Testing

Calculation and input-sanitizing logic live in `src/lib/calc.js` and are covered
by `src/lib/calc.test.js` — mirroring the original Python test cases.

```bash
pnpm test
```

## Deploying to GitHub Pages

This repo ships a workflow (`.github/workflows/deploy.yml`) that builds, tests,
and publishes the site on every push to `main`.

1. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main`:
   ```bash
   git push origin main
   ```
3. The workflow runs and the app goes live at
   `https://chumasuey.github.io/Tollcalc-web/`.

> The Vite `base` is set to `/Tollcalc-web/` in `vite.config.js` to match this
> repo's name. If you rename the repo or use a custom domain / user page, update
> `base` accordingly (use `/` for a user site or custom domain).
