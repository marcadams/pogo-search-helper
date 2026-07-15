# 🔍 Pokémon GO Search Helper

[![Deploy](https://github.com/YOUR_USERNAME/pogo-search-helper/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/pogo-search-helper/actions/workflows/deploy.yml)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](LICENSE)

**Stop typing `4*&!shadow&shiny` from memory.**

A visual builder for Pokémon GO's in-storage search syntax. Pick filters, combine them with AND / OR / NOT logic, copy the result, paste it into the game. Also includes a library of ready-made cleanup recipes for common storage tasks.

**[Open the app →](https://marcadams.github.io/pogo-search-helper/)**

---

## Features

- **130+ tokens** across 14 categories — Appraisal, Type, Move, Evolution, Catch Source, Region, Buddy, Size, and more
- **Per-term AND / OR / NOT** — mix logic freely in a single string, with live token previews on every button
- **Mutual exclusivity checks** — AND is blocked between star ratings, genders, sizes, regions, and other groups where it would always return nothing
- **Cleanup Recipes** — 18 pre-made searches for bulk transfer, PvP hunting, shiny management, evolution sessions, shadow evaluation, trading prep, and quick checks
- **Save & Load** — store your favorite searches in localStorage, quick-save from the sticky bar, load them back with one tap
- **Sticky copy bar** — always-visible on desktop, slides up on mobile when you scroll past the result panel
- **One-tap copy** to clipboard from anywhere
- **Mobile-first** — responsive layout, compact touch targets, no wasted space

## Recipes

Switch to the **Recipes** tab for ready-to-use searches including:

| Category | Examples |
|---|---|
| Bulk Transfer | Low IV trash, old duplicates, costumed junk |
| PvP Hunting | Great/Ultra/Master League candidates |
| Shiny Management | Low-IV shinies, shiny duplicates |
| Evolution Session | New dex entries, mass XP evolves, free trade evolves |
| Shadow & Purification | Keepers vs purify-and-dump |
| Trading Prep | Distance trade fodder, lucky trade targets |
| Quick Checks | Hundos, nundos, legacy moves, mega-ready |

---

## Contributing

Contributions are welcome. Key files:

- [`src/searchOptions.ts`](src/searchOptions.ts) — all search tokens and group definitions
- [`src/recipeData.ts`](src/recipeData.ts) — pre-made recipe searches

Adding or updating tokens/recipes requires no UI code changes.

```bash
# Fork, clone, then:
npm install
npm run dev
```

Open `http://localhost:5173`.

### Production build

```bash
npm run build
npm run preview
```

### Deployment

Deployed automatically to GitHub Pages via GitHub Actions on every push to `main`. The workflow lives at `.github/workflows/deploy.yml`.

To enable on a fork:
1. Go to **Settings → Pages**
2. Set the source to **GitHub Actions**
3. Push to `main`

---

## License

[CC BY-NC 4.0](LICENSE) — free to use, share, and modify with attribution. Commercial use is not permitted.

This project is an independent fan-made utility. Pokémon and Pokémon GO are trademarks of Nintendo, Creatures Inc., and GAME FREAK inc. Pokémon GO is developed and published by Scopely (acquired from Niantic in 2025). This project is not affiliated with, endorsed by, or connected to any of these companies.
