// Groups where members are mutually exclusive — AND between two members is
// always a logical contradiction. OR is still valid ("show me 3★ or 4★").
// The UI disables the AND button when a group member is already selected.
export const orOnlyGroups: Record<string, string> = {
  'appraisal-star':  'A Pokémon has exactly one star rating',
  'iv-attack':       'Attack IV is a single value',
  'iv-defense':      'Defense IV is a single value',
  'iv-hp':           'HP IV is a single value',
  'shadow-purity':   'Shadow and Purified are mutually exclusive states',
  'gender':          'A Pokémon has one gender',
  'size':            'A Pokémon has one size',
  'mega-level':      'A Pokémon has one Mega level',
  'buddy-level':     'A Pokémon has one Buddy level',
  'catch-source':    'A Pokémon has one catch origin',
  'region':          'A Pokémon is from one region',
  'year':            'A Pokémon was caught in one year',
  'age-range':       'Age ranges overlap — AND would always return nothing',
  'distance-range':  'Distance ranges overlap — AND would always return nothing',
};

export type SearchOption = {
  id: string;
  label: string;
  token: string;
  category:
    | 'Appraisal'
    | 'Status'
    | 'Collection'
    | 'Catch Source'
    | 'Type'
    | 'Move'
    | 'Evolution'
    | 'Battle'
    | 'Gender'
    | 'Size'
    | 'Region'
    | 'Buddy'
    | 'Age & Year'
    | 'Other';
  description: string;
  /** If set, AND with another option sharing this group is disabled. */
  group?: string;
};

// Keep this data isolated so search vocabulary can be updated without changing UI code.
export const searchOptions: SearchOption[] = [

  // ── Appraisal ────────────────────────────────────────────────────────────────
  { id: 'perfect',    label: 'Perfect IV (4★)',   token: '4*',       category: 'Appraisal', group: 'appraisal-star', description: '100% IV — all three stats are 15.' },
  { id: 'three-star', label: '3★ (82–98% IV)',    token: '3*',       category: 'Appraisal', group: 'appraisal-star', description: 'Three-star appraisal (82–98% IV).' },
  { id: 'two-star',   label: '2★ (67–80% IV)',    token: '2*',       category: 'Appraisal', group: 'appraisal-star', description: 'Two-star appraisal (67–80% IV).' },
  { id: 'one-star',   label: '1★ (51–64% IV)',    token: '1*',       category: 'Appraisal', group: 'appraisal-star', description: 'One-star appraisal (51–64% IV).' },
  { id: 'zero-star',  label: '0★ (0–49% IV)',     token: '0*',       category: 'Appraisal', group: 'appraisal-star', description: 'Zero-star appraisal (0–49% IV).' },
  { id: 'iv4-atk',   label: 'Perfect Attack IV',  token: '4attack',  category: 'Appraisal', group: 'iv-attack',      description: 'Attack IV of exactly 15.' },
  { id: 'iv4-def',   label: 'Perfect Defense IV', token: '4defense', category: 'Appraisal', group: 'iv-defense',     description: 'Defense IV of exactly 15.' },
  { id: 'iv4-hp',    label: 'Perfect HP IV',      token: '4hp',      category: 'Appraisal', group: 'iv-hp',          description: 'HP IV of exactly 15.' },
  { id: 'iv0-atk',   label: '0 Attack IV',        token: '0attack',  category: 'Appraisal', group: 'iv-attack',      description: 'Attack IV of 0. Useful for PvP.' },
  { id: 'iv0-def',   label: '0 Defense IV',       token: '0defense', category: 'Appraisal', group: 'iv-defense',     description: 'Defense IV of 0.' },
  { id: 'iv0-hp',    label: '0 HP IV',            token: '0hp',      category: 'Appraisal', group: 'iv-hp',          description: 'HP IV of 0.' },


  // ── Status ───────────────────────────────────────────────────────────────────
  { id: 'shiny',              label: 'Shiny',                   token: 'shiny',              category: 'Status', description: 'Shiny Pokémon.' },
  { id: 'shadow',             label: 'Shadow',                  token: 'shadow',             category: 'Status', group: 'shadow-purity', description: 'Shadow Pokémon.' },
  { id: 'purified',           label: 'Purified',                token: 'purified',           category: 'Status', group: 'shadow-purity', description: 'Purified Pokémon.' },
  { id: 'lucky',              label: 'Lucky',                   token: 'lucky',              category: 'Status', description: 'Lucky Pokémon.' },
  { id: 'favorite',           label: 'Favorite',                token: 'favorite',           category: 'Status', description: 'Pokémon you have marked as favorite.' },
  { id: 'traded',             label: 'Traded',                  token: 'traded',             category: 'Status', description: 'Pokémon obtained through a trade.' },
  { id: 'defender',           label: 'Defending Gym',           token: 'defender',           category: 'Status', description: 'Pokémon currently assigned to defend a Gym.' },
  { id: 'candyxl',            label: 'Powered Up with XL Candy',token: 'candyxl',            category: 'Status', description: 'Pokémon that have been powered up using XL Candy.' },
  { id: 'locationbackground', label: 'Location Background',     token: 'locationbackground', category: 'Status', description: 'Pokémon that have a Location Background.' },
  { id: 'specialbackground',  label: 'Special Background',      token: 'specialbackground',  category: 'Status', description: 'Pokémon that have a Special Background.' },
  { id: 'background',         label: 'Any Background',          token: 'background',         category: 'Status', description: 'Pokémon that have any background (location or special).' },
  { id: 'adventureeffect',    label: 'Adventure Effect Move',   token: 'adventureeffect',    category: 'Status', description: 'Pokémon that know a move with an Adventure Effect.' },

  // ── Collection ───────────────────────────────────────────────────────────────
  { id: 'legendary',  label: 'Legendary',       token: 'legendary',  category: 'Collection', description: 'Legendary Pokémon.' },
  { id: 'mythical',   label: 'Mythical',        token: 'mythical',   category: 'Collection', description: 'Mythical Pokémon.' },
  { id: 'ultrabeast', label: 'Ultra Beast',     token: 'ultrabeast', category: 'Collection', description: 'Ultra Beast Pokémon.' },
  { id: 'dynamax',    label: 'Dynamax',         token: 'dynamax',    category: 'Collection', description: 'Dynamax Pokémon.' },
  { id: 'gigantamax', label: 'Gigantamax',      token: 'gigantamax', category: 'Collection', description: 'Gigantamax Pokémon.' },
  { id: 'costume',    label: 'Costume / Event', token: 'costume',    category: 'Collection', description: 'Costumed or event Pokémon.' },
  { id: 'fusion',     label: 'Fusion',          token: 'fusion',     category: 'Collection', description: 'Pokémon that can fuse or are currently fused (e.g. Necrozma forms).' },
  { id: 'eggsonly',   label: 'Baby (Eggs Only)',token: 'eggsonly',   category: 'Collection', description: 'Baby Pokémon that can only be obtained from eggs.' },


  // ── Catch Source ─────────────────────────────────────────────────────────────
  { id: 'hatched',    label: 'Hatched from Egg',      token: 'hatched',    category: 'Catch Source', group: 'catch-source', description: 'Pokémon that hatched from an egg.' },
  { id: 'raid',       label: 'Raid',                  token: 'raid',       category: 'Catch Source', group: 'catch-source', description: 'Pokémon caught from any raid.' },
  { id: 'remoteraid', label: 'Remote Raid',           token: 'remoteraid', category: 'Catch Source', group: 'catch-source', description: 'Pokémon caught from a Remote Raid.' },
  { id: 'megaraid',   label: 'Mega Raid',             token: 'megaraid',   category: 'Catch Source', group: 'catch-source', description: 'Pokémon caught from a Mega Raid.' },
  { id: 'exraid',     label: 'EX Raid',               token: 'exraid',     category: 'Catch Source', group: 'catch-source', description: 'Pokémon caught from an EX Raid.' },
  { id: 'primalraid', label: 'Primal Raid',           token: 'primalraid', category: 'Catch Source', group: 'catch-source', description: 'Pokémon caught from a Primal Raid.' },
  { id: 'gbl',        label: 'GO Battle League',      token: 'gbl',        category: 'Catch Source', group: 'catch-source', description: 'Pokémon earned as GO Battle League rewards.' },
  { id: 'research',   label: 'Research Task',         token: 'research',   category: 'Catch Source', group: 'catch-source', description: 'Pokémon caught via Research Tasks.' },
  { id: 'rocket',     label: 'Team GO Rocket',        token: 'rocket',     category: 'Catch Source', group: 'catch-source', description: 'Pokémon caught from Team GO Rocket grunts or leaders.' },
  { id: 'snapshot',   label: 'Photobomb (Snapshot)',  token: 'snapshot',   category: 'Catch Source', group: 'catch-source', description: 'Pokémon that appeared as photobombs during GO Snapshot.' },

  // ── Type ─────────────────────────────────────────────────────────────────────
  { id: 'type-normal',   label: 'Normal',   token: 'normal',   category: 'Type', description: 'Pokémon that are Normal type.' },
  { id: 'type-fire',     label: 'Fire',     token: 'fire',     category: 'Type', description: 'Pokémon that are Fire type.' },
  { id: 'type-water',    label: 'Water',    token: 'water',    category: 'Type', description: 'Pokémon that are Water type.' },
  { id: 'type-grass',    label: 'Grass',    token: 'grass',    category: 'Type', description: 'Pokémon that are Grass type.' },
  { id: 'type-electric', label: 'Electric', token: 'electric', category: 'Type', description: 'Pokémon that are Electric type.' },
  { id: 'type-ice',      label: 'Ice',      token: 'ice',      category: 'Type', description: 'Pokémon that are Ice type.' },
  { id: 'type-fighting', label: 'Fighting', token: 'fighting', category: 'Type', description: 'Pokémon that are Fighting type.' },
  { id: 'type-poison',   label: 'Poison',   token: 'poison',   category: 'Type', description: 'Pokémon that are Poison type.' },
  { id: 'type-ground',   label: 'Ground',   token: 'ground',   category: 'Type', description: 'Pokémon that are Ground type.' },
  { id: 'type-flying',   label: 'Flying',   token: 'flying',   category: 'Type', description: 'Pokémon that are Flying type.' },
  { id: 'type-psychic',  label: 'Psychic',  token: 'psychic',  category: 'Type', description: 'Pokémon that are Psychic type.' },
  { id: 'type-bug',      label: 'Bug',      token: 'bug',      category: 'Type', description: 'Pokémon that are Bug type.' },
  { id: 'type-rock',     label: 'Rock',     token: 'rock',     category: 'Type', description: 'Pokémon that are Rock type.' },
  { id: 'type-ghost',    label: 'Ghost',    token: 'ghost',    category: 'Type', description: 'Pokémon that are Ghost type.' },
  { id: 'type-dragon',   label: 'Dragon',   token: 'dragon',   category: 'Type', description: 'Pokémon that are Dragon type.' },
  { id: 'type-dark',     label: 'Dark',     token: 'dark',     category: 'Type', description: 'Pokémon that are Dark type.' },
  { id: 'type-steel',    label: 'Steel',    token: 'steel',    category: 'Type', description: 'Pokémon that are Steel type.' },
  { id: 'type-fairy',    label: 'Fairy',    token: 'fairy',    category: 'Type', description: 'Pokémon that are Fairy type.' },


  // ── Move ─────────────────────────────────────────────────────────────────────
  { id: 'move-any',      label: 'Any move (type filter)',        token: '@fire',    category: 'Move', description: 'Pokémon with at least one move of a given type. Replace "fire" with any type.' },
  { id: 'move-fast',     label: 'Fast move (type filter)',       token: '@1fire',   category: 'Move', description: 'Pokémon with a Fast Move of a given type. Replace "fire" with any type.' },
  { id: 'move-charged',  label: 'Charged move (type filter)',    token: '@2fire',   category: 'Move', description: 'Pokémon with a Charged Move of a given type. Replace "fire" with any type.' },
  { id: 'move-charged2', label: '2nd Charged move (type filter)',token: '@3fire',   category: 'Move', description: 'Pokémon with a second Charged Move of a given type. Replace "fire" with any type.' },
  { id: 'move-weather',  label: 'Weather Boosted Move',          token: '@weather', category: 'Move', description: 'Pokémon that have a move currently boosted by the in-game weather.' },
  { id: 'move-special',  label: 'Special / Legacy Move',         token: '@special', category: 'Move', description: 'Pokémon that know a special or legacy (Community Day) move.' },
  { id: 'move-second',   label: 'Has 2nd Charged Move',          token: '!@move',   category: 'Move', description: 'Pokémon that already have a second Charged Move unlocked.' },
  { id: 'move-weak-to',  label: 'Weak to type',                  token: '<water',   category: 'Move', description: 'Pokémon weak to a given type. Replace "water" with any type.' },
  { id: 'move-strong-vs',label: 'Super Effective vs type',       token: '>water',   category: 'Move', description: 'Pokémon with moves Super Effective against a given type. Replace "water" with any type.' },

  // ── Evolution ────────────────────────────────────────────────────────────────
  { id: 'can-evolve',  label: 'Can Evolve',               token: 'evolve',      category: 'Evolution', description: 'Pokémon currently eligible to evolve.' },
  { id: 'evolvenew',   label: 'Evolve for New Dex Entry', token: 'evolvenew',   category: 'Evolution', description: 'Pokémon that will add a new entry to your Pokédex when evolved.' },
  { id: 'tradeevolve', label: 'Trade Evolve (free)',      token: 'tradeevolve', category: 'Evolution', description: 'Pokémon eligible to evolve for free after being traded.' },
  { id: 'evolvequest', label: 'Buddy Quest to Evolve',   token: 'evolvequest', category: 'Evolution', description: 'Pokémon that require completing a buddy task before they can evolve.' },
  { id: 'item',        label: 'Evolve with Item',         token: 'item',        category: 'Evolution', description: 'Pokémon that require an evolutionary item to evolve.' },
  { id: 'megaevolve',  label: 'Can Mega Evolve',          token: 'megaevolve',  category: 'Evolution', description: 'Pokémon that are currently eligible for Mega Evolution.' },
  { id: 'mega0',       label: 'Never Mega Evolved',       token: 'mega0',       category: 'Evolution', group: 'mega-level', description: 'Pokémon that can Mega Evolve but have not yet.' },
  { id: 'mega1',       label: 'Mega Level 1',             token: 'mega1',       category: 'Evolution', group: 'mega-level', description: 'Pokémon at Mega Level 1.' },
  { id: 'mega2',       label: 'Mega Level 2',             token: 'mega2',       category: 'Evolution', group: 'mega-level', description: 'Pokémon at Mega Level 2.' },
  { id: 'mega3',       label: 'Mega Level 3',             token: 'mega3',       category: 'Evolution', group: 'mega-level', description: 'Pokémon at Mega Level 3 (max).' },

  // ── Battle ───────────────────────────────────────────────────────────────────
  { id: 'cp-under-1500', label: 'CP ≤ 1500 (GL)',        token: 'cp-1500',   category: 'Battle', description: 'Pokémon at or below 1500 CP — Great League range.' },
  { id: 'cp-under-2500', label: 'CP ≤ 2500 (UL)',        token: 'cp-2500',   category: 'Battle', description: 'Pokémon at or below 2500 CP — Ultra League range.' },
  { id: 'cp-2500-plus',  label: 'CP 2500+ (ML)',          token: 'cp2500-',   category: 'Battle', description: 'Pokémon at or above 2500 CP — Master League range.' },
  { id: 'cp-500-under',  label: 'CP ≤ 500 (Little Cup)', token: 'cp-500',    category: 'Battle', description: 'Pokémon at or below 500 CP — Little Cup range.' },
  { id: 'maxmove1plus',  label: 'Max Move ready',         token: 'maxmove1-', category: 'Battle', description: 'Dynamax/Gigantamax Pokémon (and Zacian/Zamazenta) eligible for Max Battles.' },


  // ── Gender ───────────────────────────────────────────────────────────────────
  { id: 'male',          label: 'Male',          token: 'male',          category: 'Gender', group: 'gender', description: 'Male Pokémon.' },
  { id: 'female',        label: 'Female',        token: 'female',        category: 'Gender', group: 'gender', description: 'Female Pokémon.' },
  { id: 'genderunknown', label: 'Unknown Gender', token: 'genderunknown', category: 'Gender', group: 'gender', description: 'Pokémon with no gender.' },

  // ── Size ─────────────────────────────────────────────────────────────────────
  { id: 'xxs', label: 'XXS (Extra Small)', token: 'xxs', category: 'Size', group: 'size', description: 'Pokémon with an XXS (extra small) size rating.' },
  { id: 'xs',  label: 'XS (Small)',        token: 'xs',  category: 'Size', group: 'size', description: 'Pokémon with an XS (small) size rating.' },
  { id: 'xl',  label: 'XL (Large)',        token: 'xl',  category: 'Size', group: 'size', description: 'Pokémon with an XL (large) size rating.' },
  { id: 'xxl', label: 'XXL (Extra Large)', token: 'xxl', category: 'Size', group: 'size', description: 'Pokémon with an XXL (extra large) size rating.' },

  // ── Region ───────────────────────────────────────────────────────────────────
  { id: 'region-kanto',  label: 'Kanto (Gen 1)',  token: 'kanto',  category: 'Region', group: 'region', description: 'Pokémon originally from the Kanto region.' },
  { id: 'region-johto',  label: 'Johto (Gen 2)',  token: 'johto',  category: 'Region', group: 'region', description: 'Pokémon originally from the Johto region.' },
  { id: 'region-hoenn',  label: 'Hoenn (Gen 3)',  token: 'hoenn',  category: 'Region', group: 'region', description: 'Pokémon originally from the Hoenn region.' },
  { id: 'region-sinnoh', label: 'Sinnoh (Gen 4)', token: 'sinnoh', category: 'Region', group: 'region', description: 'Pokémon originally from the Sinnoh region.' },
  { id: 'region-unova',  label: 'Unova (Gen 5)',  token: 'unova',  category: 'Region', group: 'region', description: 'Pokémon originally from the Unova region.' },
  { id: 'region-kalos',  label: 'Kalos (Gen 6)',  token: 'kalos',  category: 'Region', group: 'region', description: 'Pokémon originally from the Kalos region.' },
  { id: 'region-alola',  label: 'Alola (Gen 7)',  token: 'alola',  category: 'Region', group: 'region', description: 'Pokémon originally from the Alola region.' },
  { id: 'region-galar',  label: 'Galar (Gen 8)',  token: 'galar',  category: 'Region', group: 'region', description: 'Pokémon originally from the Galar region.' },
  { id: 'region-hisui',  label: 'Hisui',          token: 'hisui',  category: 'Region', group: 'region', description: 'Pokémon in their Hisuian form.' },
  { id: 'region-paldea', label: 'Paldea (Gen 9)', token: 'paldea', category: 'Region', group: 'region', description: 'Pokémon originally from the Paldea region.' },

  // ── Buddy ─────────────────────────────────────────────────────────────────────
  { id: 'buddy1',    label: 'Buddy Level 1 (Good)',       token: 'buddy1',    category: 'Buddy', group: 'buddy-level', description: 'Pokémon that have reached Good Buddy status.' },
  { id: 'buddy2',    label: 'Buddy Level 2 (Great)',      token: 'buddy2',    category: 'Buddy', group: 'buddy-level', description: 'Pokémon that have reached Great Buddy status.' },
  { id: 'buddy3',    label: 'Buddy Level 3 (Ultra)',      token: 'buddy3',    category: 'Buddy', group: 'buddy-level', description: 'Pokémon that have reached Ultra Buddy status.' },
  { id: 'buddy4',    label: 'Buddy Level 4 (Best)',       token: 'buddy4',    category: 'Buddy', group: 'buddy-level', description: 'Pokémon that have reached Best Buddy status.' },
  { id: 'buddy5',    label: 'Buddy Level 5 (Best+ribbon)',token: 'buddy5',    category: 'Buddy', group: 'buddy-level', description: 'Pokémon that have Best Buddy status with the ribbon.' },
  { id: 'candykm1',  label: 'Candy per 1 km',   token: 'candykm1',  category: 'Buddy', group: 'candy-km', description: 'Pokémon that earn candy every 1 km walked as buddy.' },
  { id: 'candykm3',  label: 'Candy per 3 km',   token: 'candykm3',  category: 'Buddy', group: 'candy-km', description: 'Pokémon that earn candy every 3 km walked as buddy.' },
  { id: 'candykm5',  label: 'Candy per 5 km',   token: 'candykm5',  category: 'Buddy', group: 'candy-km', description: 'Pokémon that earn candy every 5 km walked as buddy.' },
  { id: 'candykm10', label: 'Candy per 10 km',  token: 'candykm10', category: 'Buddy', group: 'candy-km', description: 'Pokémon that earn candy every 10 km walked as buddy.' },
  { id: 'candykm20', label: 'Candy per 20 km',  token: 'candykm20', category: 'Buddy', group: 'candy-km', description: 'Pokémon that earn candy every 20 km walked as buddy.' },


  // ── Age & Year ────────────────────────────────────────────────────────────────
  { id: 'age0',    label: 'Caught Today',           token: 'age0',     category: 'Age & Year', group: 'age-range',      description: 'Pokémon caught within the last 24 hours.' },
  { id: 'age0-7',  label: 'Caught in Last 7 Days',  token: 'age0-7',   category: 'Age & Year', group: 'age-range',      description: 'Pokémon caught within the last 7 days.' },
  { id: 'age0-30', label: 'Caught in Last 30 Days', token: 'age0-30',  category: 'Age & Year', group: 'age-range',      description: 'Pokémon caught within the last 30 days.' },
  { id: 'year2016',label: 'Caught in 2016',         token: 'year2016', category: 'Age & Year', group: 'year',           description: 'Pokémon caught during 2016 — the launch year.' },
  { id: 'year2017',label: 'Caught in 2017',         token: 'year2017', category: 'Age & Year', group: 'year',           description: 'Pokémon caught during 2017.' },
  { id: 'year2018',label: 'Caught in 2018',         token: 'year2018', category: 'Age & Year', group: 'year',           description: 'Pokémon caught during 2018.' },
  { id: 'year2019',label: 'Caught in 2019',         token: 'year2019', category: 'Age & Year', group: 'year',           description: 'Pokémon caught during 2019.' },
  { id: 'year2020',label: 'Caught in 2020',         token: 'year2020', category: 'Age & Year', group: 'year',           description: 'Pokémon caught during 2020.' },
  { id: 'year2021',label: 'Caught in 2021',         token: 'year2021', category: 'Age & Year', group: 'year',           description: 'Pokémon caught during 2021.' },
  { id: 'year2022',label: 'Caught in 2022',         token: 'year2022', category: 'Age & Year', group: 'year',           description: 'Pokémon caught during 2022.' },
  { id: 'year2023',label: 'Caught in 2023',         token: 'year2023', category: 'Age & Year', group: 'year',           description: 'Pokémon caught during 2023.' },
  { id: 'year2024',label: 'Caught in 2024',         token: 'year2024', category: 'Age & Year', group: 'year',           description: 'Pokémon caught during 2024.' },
  { id: 'year2025',label: 'Caught in 2025',         token: 'year2025', category: 'Age & Year', group: 'year',           description: 'Pokémon caught during 2025.' },
  { id: 'year2026',label: 'Caught in 2026',         token: 'year2026', category: 'Age & Year', group: 'year',           description: 'Pokémon caught during 2026.' },
  { id: 'distance100plus',  label: 'Caught 100+ km Away',  token: 'distance100-',  category: 'Age & Year', group: 'distance-range', description: 'Pokémon caught ≥ 100 km from your location. Useful for distance trading.' },
  { id: 'distance300plus',  label: 'Caught 300+ km Away',  token: 'distance300-',  category: 'Age & Year', group: 'distance-range', description: 'Pokémon caught ≥ 300 km from your location.' },
  { id: 'distance1000plus', label: 'Caught 1000+ km Away', token: 'distance1000-', category: 'Age & Year', group: 'distance-range', description: 'Pokémon caught ≥ 1000 km from your location.' },

  // ── Other ─────────────────────────────────────────────────────────────────────
  { id: 'tagged',      label: 'Has a Tag',       token: '#',       category: 'Other', description: 'Pokémon that have any tag applied.' },
  { id: 'count-dupes', label: 'Duplicates (2+)', token: 'count2-', category: 'Other', description: 'Pokémon species you have 2 or more of. Useful for mass-transferring extras.' },
];

// Also register candy-km as or-only (a Pokémon has one candy distance)
orOnlyGroups['candy-km'] = 'A Pokémon has one buddy candy distance';
