# Calculadora de Peajes (Toll Calculator — Web)

A fast, mobile-first web version of the Tkinter **TollCalculator** desktop app,
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

This repo ships a workflow (`.github/workflows/deploy.yml`) that builds and
publishes the site on every push to `main`.

1. Create a new GitHub repo named **`tollcalc-web`**.
2. Push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-user>/tollcalc-web.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Pushing to `main` triggers the workflow. The app goes live at
   `https://<your-user>.github.io/tollcalc-web/`.

> The Vite `base` is set to `/tollcalc-web/` in `vite.config.js`. If you rename the
> repo or use a custom domain / user page, update `base` accordingly (use `/` for a
> user site or custom domain).
