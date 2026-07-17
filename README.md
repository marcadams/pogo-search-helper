# 🔍 Pokémon GO Search Helper

[![Deploy](https://github.com/marcadams/pogo-search-helper/actions/workflows/deploy.yml/badge.svg)](https://github.com/marcadams/pogo-search-helper/actions/workflows/deploy.yml)
[![Tests](https://github.com/marcadams/pogo-search-helper/actions/workflows/test.yml/badge.svg)](https://github.com/marcadams/pogo-search-helper/actions/workflows/test.yml)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](LICENSE)

**Stop typing `4*&!shadow&shiny` from memory.**

A visual builder for Pokémon GO's in-storage search syntax. Pick filters, combine them with AND / OR / NOT logic, copy the result, paste it into the game. Also includes cleanup recipes and a raid counter reference for current bosses.

**[Open the app →](https://marcadams.github.io/pogo-search-helper/)**

---

## Features

- **130+ tokens** across 14 categories - Appraisal, Type, Move, Evolution, Catch Source, Region, Buddy, Size, and more
- **Per-term AND / OR / NOT** - mix logic freely in a single string, with live token previews on every button
- **Mutual exclusivity checks** - AND is blocked between star ratings, genders, sizes, regions, and other groups where it would always return nothing
- **Raid Counters** - search strings for counters to every current raid boss, with type filters, weakness multipliers, and official artwork
- **Cleanup Recipes** - 19 pre-made searches for bulk transfer, PvP hunting, shiny management, evolution sessions, and more
- **Save & Load** - store your favorite searches in localStorage, quick-save from the sticky bar
- **Sticky copy bar** - always-visible on desktop, slides up on mobile when you scroll past the result panel
- **One-tap copy** to clipboard from anywhere
- **Mobile-first** - responsive layout, compact touch targets, no wasted space
- **Deep linking** - share direct links to any tab (`#tips`, `#raids`, `#pvp`, `#types`, `#recipes`)

## Tabs

### Builder
Pick filters visually, combine with AND / OR / NOT, and copy the generated search string.

### Recipes
Ready-to-use searches for common storage tasks:

| Category | Examples |
|---|---|
| Bulk Transfer | Low IV trash, old duplicates, costumed junk |
| PvP Hunting | Great/Ultra/Master League candidates |
| Shiny Management | Low-IV shinies, shiny duplicates |
| Evolution Session | New dex entries, mass XP evolves, free trade evolves |
| Shadow & Purification | Keepers vs purify-and-dump |
| Trading Prep | Distance trade fodder, lucky trade targets |
| Quick Checks | Hundos, nundos, legacy moves, mega-ready |

### Raids
Counter search strings for current raid bosses. Each string filters your storage for Pokemon with super-effective fast AND charged moves against that boss. Includes all July 2026 bosses plus historical data.

### Types
Interactive 18x18 type effectiveness chart. Tap any type to see what it's strong/weak against, or scroll the full heatmap matrix.

### PvP
IV Rank Checker for capped leagues. Select a Pokemon, enter your IVs, and instantly see where they rank out of 4,096 possible combinations. Includes a detailed explainer on why low Attack IVs are optimal in Great/Ultra League.

### Tips
Catch rate multipliers reference, curated tips on catching, XP grinding, PvP mechanics, Stardust optimization, trading, and hidden game mechanics. All verified against current 2026 game state.

---

## Contributing

Key files:

- [`src/searchOptions.ts`](src/searchOptions.ts) - all search tokens and group definitions
- [`src/recipeData.ts`](src/recipeData.ts) - pre-made recipe searches
- [`src/raidData.ts`](src/raidData.ts) - raid boss counters (update monthly)
- [`src/pvpData.ts`](src/pvpData.ts) - Pokemon base stats for PvP IV ranking
- [`src/typeChart.ts`](src/typeChart.ts) - type effectiveness data

Adding or updating tokens/recipes/raids/Pokemon requires no UI code changes.

```bash
# Fork, clone, then:
npm install
npm run dev
```

Open `http://localhost:5173`.

### Running tests

```bash
npm test          # single run
npm run test:watch  # watch mode
```

### Production build

```bash
npm run build
npm run preview
```

### Deployment

Deployed automatically to GitHub Pages via GitHub Actions on every push to `main`. Workflow at `.github/workflows/deploy.yml`.

To enable on a fork:
1. Go to **Settings → Pages**
2. Set the source to **GitHub Actions**
3. Push to `main`

---

## Disclaimer

This tool generates search strings for Pokémon GO but cannot guarantee accuracy. **Always review your Pokémon before transferring.** The authors accept no responsibility for any Pokémon accidentally transferred, traded, or otherwise lost through use of this tool.

## License

[CC BY-NC 4.0](LICENSE) - free to use, share, and modify with attribution. Commercial use is not permitted.

This project is an independent fan-made utility. Pokémon and Pokémon GO are trademarks of Nintendo, Creatures Inc., and GAME FREAK inc. Pokémon GO is developed and published by Scopely (acquired from Niantic in 2025). This project is not affiliated with, endorsed by, or connected to any of these companies.
