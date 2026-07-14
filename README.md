# 🔍 Pokémon GO Search Helper

[![Deploy](https://github.com/YOUR_USERNAME/pogo-search-helper/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/pogo-search-helper/actions/workflows/deploy.yml)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](LICENSE)

**Stop typing `4*&!shadow&shiny` from memory.**

A visual builder for Pokémon GO's in-storage search syntax. Pick filters, combine them with AND / OR logic, copy the result, paste it into the game.

**[Open the app →](https://marcadams.github.io/pogo-search-helper/)**

---

## Features

- **130+ tokens** across 14 categories — Appraisal, Type, Move, Evolution, Catch Source, Region, Buddy, Size, and more
- **Per-term AND / OR** — mix logic freely in a single string
- **Mutual exclusivity checks** — AND is blocked between star ratings, genders, sizes, regions, and other groups where it'd always return nothing
- **Exclude toggle** — flip any filter to `!token`
- **Custom terms** — for anything not covered by the presets
- **One-tap copy** to clipboard

## Example searches

| What you want | String |
|---|---|
| Perfect IV shinies | `4*&shiny` |
| PvP Great League candidates | `3*,4*&cp-1500` |
| Shadows worth purifying for dex | `shadow&evolvenew` |
| Long-distance lucky trades | `lucky&distance300-` |
| This year's catches, unfavorited | `year2026&!favorite` |
| Best buddies with legacy moves | `buddy4,buddy5&@special` |

---

## Contributing

Contributions are welcome. The search vocabulary lives entirely in [`src/searchOptions.ts`](src/searchOptions.ts) — adding or updating tokens doesn't require touching any UI code.

```bash
# Fork, clone, then:
npm install
npm run dev
```

Open `http://localhost:5173`.

## License

[CC BY-NC 4.0](LICENSE) — free to use, share, and modify with attribution. Commercial use is not permitted.

This project is an independent fan-made utility. Pokémon and Pokémon GO are trademarks of Nintendo, Creatures Inc., and GAME FREAK inc. Pokémon GO is developed and published by Scopely (acquired from Niantic in 2025). This project is not affiliated with, endorsed by, or connected to any of these companies.
