# 🔍 Pokémon GO Search Helper

> Stop typing `4*&!shadow&!purified&shiny` from memory. Build it with a few taps instead.

Pokémon GO's search bar is surprisingly powerful — but the syntax is cryptic enough that most trainers only ever use it for basic stuff like `shiny` or `4*`. This tool exposes the full vocabulary and lets you snap filters together visually, with instant AND / OR logic per term and a one-tap copy to clipboard.

**[Live app →](https://marcadams.github.io/pogo-search-helper/)**

---

## What it does

Pick any combination of filters from categories like Appraisal, Status, Type, Move, Evolution, Catch Source, Region, Buddy, Size, and more. Each filter card shows the exact search token the game expects, so you learn the syntax as you go.

Tap **AND** to narrow your results, **OR** to broaden them. Mix and match freely — the app knows which filters are mutually exclusive (star ratings, gender, size, region...) and prevents logical contradictions automatically. Add custom terms for anything not covered by the presets, like `cp1500-2500` or a specific Pokémon name.

When you're done, hit **Copy** and paste directly into the Pokémon GO storage search bar.

### Example searches you can build

| Goal | Search string |
|---|---|
| Perfect IV shinies | `4*&shiny` |
| PvP Great League candidates | `3*,4*&cp-1500` |
| Shadow Pokémon that can be purified for new dex entries | `shadow&evolvenew` |
| Lucky trades from far away | `lucky&distance300-` |
| Everything caught this year that you haven't touched | `year2026&!favorite` |
| Buddy-ready Pokémon with legacy moves | `buddy4,buddy5&@special` |

---

## Features

- **130+ search tokens** across 14 categories, sourced from the complete in-game vocabulary
- **Per-term AND / OR** — each filter carries its own joiner, so you can mix logic in a single string
- **Mutual exclusivity enforcement** — AND is disabled between star ratings, genders, sizes, regions, and other groups where a Pokémon can only ever match one
- **Exclude toggle** — flip any selected filter to `!token` to invert it
- **Custom terms** — type in anything the presets don't cover
- **One-tap copy** — result goes straight to your clipboard

---

## Updating search terms

Edit `src/searchOptions.ts`. The search vocabulary is deliberately kept separate from the UI so it can be updated when Niantic adds new tokens without touching any component code.

---

## Developer setup

### Prerequisites

- **Node.js** 20.19+ or 22.12+ (22 LTS recommended)
- **npm** (included with Node.js)

### Run locally

```bash
npm install
npm run dev
```

Vite starts a dev server, usually at `http://localhost:5173`. Changes to source files hot-reload instantly.

### Production build

```bash
npm run build
```

TypeScript is checked and the app is bundled to `dist/`. Preview the production build locally:

```bash
npm run preview
```

### Deployment

The app is deployed automatically to GitHub Pages via GitHub Actions on every push to `main`. The workflow lives at `.github/workflows/deploy.yml`.

To enable it on a fork:

1. Go to **Settings → Pages** in your repository
2. Set the source to **GitHub Actions**
3. Push to `main` — the action builds and deploys in about a minute

---

*Fan-made utility. Pokémon and Pokémon GO are trademarks of Nintendo, Creatures Inc., and GAME FREAK inc.*
