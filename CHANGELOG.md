# Changelog

All notable changes to this project are documented here.

---

## 2025-07-15 (evening)

### Added
- **Hyper Training token** — `hypertraining` status filter per Niantic's official docs
- **Buddy Level 0** — `buddy0` for Pokemon with no buddy history
- **Move by name example** — `@scratch` template for named-move searches
- **Evolve right now recipe** — `evolve&evolvenew` combo in Evolution Session recipes (Niantic-recommended)
- **Empty-state UX** — when no filters are selected, cards show "Add" + "NOT" only (no AND/OR since there's nothing to join with); full AND/OR/NOT appears after first selection

### Changed
- **README** — updated to reflect recipes, save/load, sticky bar, and all current features
- **CHANGELOG** — created with full history

---

## 2025-07-15

### Added
- **Recipes page** — 18 pre-made cleanup searches across 7 categories (Bulk Transfer, PvP Hunting, Shiny Management, Evolution Session, Shadow & Purification, Trading Prep, Quick Checks) with one-tap copy
- **Tab navigation** — pill-style nav to switch between Builder and Recipes views
- **Sticky copy bar** — fixed bottom bar with Copy, Save, and Clear buttons; always visible on desktop, scroll-triggered on mobile
- **Save & Load** — localStorage-backed saved searches with quick-save from sticky bar, inline drawer in result panel, auto-naming
- **NOT button** — add filters as excluded (`!token`) directly from option cards and custom input, visually separated from AND/OR with a divider
- **Token preview on buttons** — each AND/OR/NOT button shows the exact token it will produce (e.g. `&shiny`, `,shiny`, `!shiny`)
- **Mutual exclusivity enforcement** — AND is disabled between logically contradictory groups (star ratings, gender, size, region, buddy level, catch source, etc.) with locked joiner badges
- **Per-term AND / OR joiner** — each selected filter carries its own joiner instead of a global radio; clickable badge between chips to toggle
- **Expanded search options** — 130+ tokens across 14 categories with group annotations
- **Hero graphic** — inline SVG Pokeball scene with radar rings, floating type pills, animated search bar
- **GitHub Pages deployment** — Actions workflow with automatic build and deploy on push to main
- **`.gitignore`** — removed committed `node_modules/` and `.vscode/` from tracking
- **`vite-env.d.ts`** — Vite client type declarations for CSS imports
- **LICENSE** — CC BY-NC 4.0 with trademark disclaimer

### Changed
- **Theme overhaul** — dark charcoal base with vibrant pink (`#e879f9`) primary accent, lifted surface layers for better contrast, visible input borders
- **Mobile button layout** — AND/OR/NOT stay in a compact row on mobile, token previews hidden at small sizes
- **Hero SVG colors** — updated radar rings, search bar, and glow to match pink theme

### Fixed
- **SVG floating pills** — replaced CSS animation with SVG-native `<animateTransform>` to fix positioning
- **SVG clipping** — removed `preserveAspectRatio="xMidYMid slice"` and `max-height` constraint
- **tsconfig.node.json** — removed `allowImportingTsExtensions` (conflicts with `composite: true`)
- **CSS import error** — added `vite-env.d.ts` with `/// <reference types="vite/client" />`
- **Stray closing brace** — fixed duplicate `}` after `stickyCopy` function

---

## 2025-07-14

### Added
- Initial project scaffolding — React + TypeScript + Vite
- Basic search string builder with global AND/OR radio toggle
- 14 initial search options across 5 categories
- Copy to clipboard
- Custom term input
- Dark theme with sky-blue accent
