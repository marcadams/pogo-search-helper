# Changelog

All notable changes to this project are documented here.

---

## 2025-07-15

### Added
- **Raid Counters tab** — third tab with counter search strings for all July 2025 raid bosses (Tier 5, Shadow, Mega, Dynamax), official artwork sprites from PokeAPI, type weakness pills with multipliers, type filter bar, search by name
- **Raid boss roster** — Articuno, Zapdos, Moltres, Kyogre, Solgaleo, Kyurem, Shadow Palkia, Mega Lucario, Mega Sceptile, Mega Salamence, Mega Aggron, Dynamax Chansey/Deino/Trubbish/Feebas, Pikachu
- **Raid tests** — `raidData.test.ts` (11 tests) and `RaidsPage.test.tsx` (13 tests) covering data integrity, rendering, filtering, and search
- **Test suite** — Vitest + React Testing Library + jsdom, 80+ tests across 7 suites
- **CI test workflow** — `.github/workflows/test.yml` runs `npm test` on push/PR, 30s timeout for CI
- **Google Analytics (GA4)** — gtag.js integrated; tab switches fire `page_view`, recipe/raid copies fire custom events
- **Transfer disclaimer** — amber warning in footer and README
- **Recipes page** — 19 pre-made cleanup searches across 7 categories with one-tap copy
- **Tab navigation** — pill-style nav switching between Builder, Recipes, and Raids
- **Sticky copy bar** — fixed bottom bar with Copy, Save, and Clear; always visible on desktop, scroll-triggered on mobile
- **Save & Load** — localStorage-backed saved searches with quick-save, inline drawer, auto-naming
- **NOT button** — add filters as excluded (`!token`) directly from cards and custom input
- **Empty-state UX** — "Add" + "NOT" when nothing selected; full AND/OR/NOT after first selection
- **Token preview on buttons** — shows exact token each button will produce
- **Mutual exclusivity enforcement** — AND disabled between contradictory groups with locked joiner badges
- **Per-term AND / OR joiner** — clickable badge between chips to toggle
- **Expanded search options** — 130+ tokens across 14 categories, reconciled against Niantic's official docs
- **Hyper Training** (`hypertraining`), **Buddy Level 0** (`buddy0`), **Move by name** (`@scratch`)
- **Hero graphic** — inline SVG Pokeball with radar rings, floating pills, animated search bar
- **GitHub Pages deployment** — Actions workflow with auto build/deploy
- **`.gitignore`** — removed `node_modules/` and `.vscode/` from tracking
- **LICENSE** — CC BY-NC 4.0 with trademark disclaimer

### Changed
- **Theme** — dark charcoal base with vibrant pink (`#e879f9`) accent, lifted surface layers, visible input borders
- **Mobile buttons** — compact row, token previews hidden at small sizes
- **Hero SVG** — pink radar rings, search bar, and glow
- **Joiner badges** — show syntax character alongside word (`& AND`, `, OR`)
- **Joiner logic fix** — joiner now stored on preceding item (matches string generation)

### Fixed
- **SVG pills** — SVG-native `<animateTransform>` instead of broken CSS animation
- **SVG clipping** — removed `preserveAspectRatio` and `max-height`
- **tsconfig.node.json** — removed conflicting `allowImportingTsExtensions`
- **CSS imports** — `vite-env.d.ts` with Vite client types
- **vite.config.ts** — use `vitest/config` defineConfig for test property typing
- **Recipe data** — eliminated curly quotes breaking TypeScript
- **Test timeout** — increased to 30s for CI runners

---

## 2025-07-14

### Added
- Initial project scaffolding — React + TypeScript + Vite
- Basic search string builder with global AND/OR radio toggle
- 14 initial search options across 5 categories
- Copy to clipboard
- Custom term input
- Dark theme with sky-blue accent
