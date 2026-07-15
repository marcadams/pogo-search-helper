# Changelog

All notable changes to this project are documented here.

---

## 2026-07-15

### Added
- **119 raid bosses** covering Jan–Jul 2026 plus Oct–Nov 2025 historical data
- **Monthly rotation tracking** — `featuredMonths` field on bosses, `currentRotation` export for the "Live" section
- **"Live" badge** — current month's bosses shown at top of Raids tab with green indicator
- **Human-readable dates** — "Last: July 2026" format instead of raw "2026-07"
- **GO Fest 2026 bosses:** Mega Mewtwo X, Mega Abomasnow, Mega Swampert, Raikou, Entei, Suicune, Uxie, Mesprit, Azelf, Giratina Altered, Zeraora
- **2025 historical bosses:** Cobalion, Terrakion, Virizion, Necrozma (Dusk Mane & Dawn Wings), Mega Tyranitar, Mega Scizor, Mega Heracross, Mega Beedrill, Mega Mawile
- **Early 2026 bosses:** Lunala, Palkia, Regieleki, Blacephalon, Thundurus/Tornadus Incarnate, all four Tapus, Nihilego, Buzzwole, Pheromosa, Xurkitree, plus Mega and Dynamax additions per month
- **Raid card component** — extracted reusable `RaidCard` with sprite, weakness pills, featured date, copy button
- **Dynamax category** — split into its own section
- **Raid Counters tab** — counter search strings for all bosses with type filter and search
- **47 → 119 raid bosses** over the session from historical images and web research
- **Test suite** — 80+ tests across 7 suites, CI workflow with 30s timeout
- **Google Analytics (GA4)** — tab switches, recipe copies, raid counter copies tracked
- **Transfer disclaimer** — footer and README
- **Recipes page** — 19 pre-made cleanup searches
- **Tab navigation** — Builder, Recipes, Raids
- **Sticky copy bar** — Copy, Save, Clear; desktop always-visible, mobile scroll-triggered
- **Save & Load** — localStorage with quick-save and inline drawer
- **NOT button** — add filters as excluded from cards
- **Empty-state UX** — "Add" + "NOT" when empty; full AND/OR/NOT after first selection
- **Token preview on buttons** — shows exact token each button produces
- **Mutual exclusivity enforcement** — AND disabled between contradictory groups
- **Per-term AND / OR joiner** — clickable badge between chips
- **130+ search options** across 14 categories, reconciled against Niantic docs
- **Hero graphic** — inline SVG Pokeball with radar rings, floating pills
- **GitHub Pages deployment** — auto build/deploy on push
- **LICENSE** — CC BY-NC 4.0 with trademark disclaimer

### Changed
- **Raid counter strings** — all OR-only (commas) for wider counter coverage
- **Current rotation** — trimmed to regular monthly bosses only (GO Fest weekend removed)
- **Year correction** — all dates fixed from 2025 to 2026
- **Theme** — dark charcoal with vibrant pink accent, lifted surfaces, visible input borders
- **Mobile buttons** — compact row, token previews hidden at small sizes
- **Joiner logic** — stored on preceding item to match string generation
- **GitHub Actions** — upgraded to v5 actions targeting Node.js 22

### Fixed
- SVG floating pills positioning
- SVG clipping
- `tsconfig.node.json` conflicting options
- CSS import declarations
- `vite.config.ts` type error
- Recipe data curly quotes
- Test timeout for CI
- Current rotation bloat from GO Fest weekend bosses
- **47 raid bosses** — full roster including:
  - Tier 5 (July 2026): Articuno, Zapdos, Moltres, Kyogre, Solgaleo, Kyurem, Shadow Palkia
  - Historical Legendary: Mewtwo, Rayquaza, Groudon, Dialga, Giratina Origin, Reshiram, Zekrom, Lugia, Ho-Oh, Latios, Latias, Heatran, Cresselia, Regigigas, Landorus Therian, Tornadus Therian, Thundurus Therian, Xerneas, Yveltal, Zacian, Zamazenta
  - Mythical: Darkrai, Deoxys, Genesect
  - Mega (July + historical): Lucario, Sceptile, Salamence, Aggron, Gengar, Charizard Y, Gyarados, Latios, Rayquaza, Garchomp
  - Dynamax (July): Chansey, Deino, Trubbish, Feebas
  - Regular: Pikachu
- **Raid tests** — `raidData.test.ts` (12 tests) and `RaidsPage.test.tsx` (13 tests)
- **Test suite** — Vitest + React Testing Library + jsdom, 80+ tests across 7 suites
- **CI test workflow** — `.github/workflows/test.yml` with 30s timeout
- **Google Analytics (GA4)** — tab switches, recipe copies, raid counter copies tracked
- **Transfer disclaimer** — amber warning in footer and README
- **Recipes page** — 19 pre-made cleanup searches across 7 categories
- **Tab navigation** — Builder, Recipes, Raids
- **Sticky copy bar** — Copy, Save, Clear; always visible on desktop, scroll-triggered on mobile
- **Save & Load** — localStorage-backed with quick-save and inline drawer
- **NOT button** — add filters as excluded directly from cards
- **Empty-state UX** — "Add" + "NOT" when nothing selected; full AND/OR/NOT after first selection
- **Token preview on buttons** — shows exact token each button produces
- **Mutual exclusivity enforcement** — AND disabled between contradictory groups
- **Per-term AND / OR joiner** — clickable badge between chips
- **130+ search options** across 14 categories, reconciled against Niantic docs
- **Hero graphic** — inline SVG Pokeball with radar rings, floating pills, animated search bar
- **GitHub Pages deployment** — auto build/deploy on push to main
- **LICENSE** — CC BY-NC 4.0 with trademark disclaimer

### Changed
- **Raid counter search strings** — switched from AND to all-OR syntax for wider counter coverage
- **Raid categories** — Mega and Dynamax split into their own sections
- **Theme** — dark charcoal with vibrant pink accent, lifted surfaces, visible input borders
- **Mobile buttons** — compact row, token previews hidden at small sizes
- **Joiner logic** — stored on preceding item to match string generation correctly

### Fixed
- SVG floating pills positioning (native `<animateTransform>`)
- SVG clipping (removed `preserveAspectRatio` and `max-height`)
- `tsconfig.node.json` conflicting options
- CSS import declarations
- `vite.config.ts` type error (`vitest/config`)
- Recipe data curly quotes
- Test timeout for CI runners

---

## 2026-07-14

### Added
- Initial project scaffolding — React + TypeScript + Vite
- Basic search string builder with global AND/OR radio toggle
- 14 initial search options across 5 categories
- Copy to clipboard
- Custom term input
- Dark theme with sky-blue accent
