export type RaidBoss = {
  id: string;
  name: string;
  dexNumber: number;
  types: string[];
  category: 'Legendary' | 'Mythical' | 'Mega' | 'Dynamax' | 'Regular';
  /** Weaknesses ordered by priority (double-weak first) */
  weaknesses: { type: string; multiplier: string }[];
  /** The search string to find counters in your storage */
  counterSearch: string;
  note?: string;
};

// Sprite URL helper — uses PokeAPI official artwork
export function spriteUrl(dexNumber: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dexNumber}.png`;
}

export const raidBosses: RaidBoss[] = [
  // ── Tier 5 Raids ───────────────────────────────────────────────────────────
  {
    id: 'articuno',
    name: 'Articuno',
    dexNumber: 144,
    types: ['Ice', 'Flying'],
    category: 'Legendary',
    weaknesses: [
      { type: 'Rock', multiplier: '2.56x' },
      { type: 'Fire', multiplier: '1.6x' },
      { type: 'Electric', multiplier: '1.6x' },
      { type: 'Steel', multiplier: '1.6x' },
    ],
    counterSearch: '@1rock,@2rock,@1fire,@2fire,@1electric,@2electric,@1steel,@2steel',
    note: 'Double weak to Rock. Rampardos, Rhyperior, Tyranitar with Smack Down are top picks.',
  },
  {
    id: 'zapdos',
    name: 'Zapdos',
    dexNumber: 145,
    types: ['Electric', 'Flying'],
    category: 'Legendary',
    weaknesses: [
      { type: 'Rock', multiplier: '1.6x' },
      { type: 'Ice', multiplier: '1.6x' },
    ],
    counterSearch: '@1rock,@2rock,@1ice,@2ice',
    note: 'Rock is preferred for STAB overlap with many Ground types. Rhyperior, Rampardos, Mamoswine.',
  },
  {
    id: 'moltres',
    name: 'Moltres',
    dexNumber: 146,
    types: ['Fire', 'Flying'],
    category: 'Legendary',
    weaknesses: [
      { type: 'Rock', multiplier: '2.56x' },
      { type: 'Electric', multiplier: '1.6x' },
      { type: 'Water', multiplier: '1.6x' },
    ],
    counterSearch: '@1rock,@2rock,@1electric,@2electric,@1water,@2water',
    note: 'Double weak to Rock. Rampardos and Rhyperior dominate. Water and Electric are backup options.',
  },
  {
    id: 'kyogre',
    name: 'Kyogre',
    dexNumber: 382,
    types: ['Water'],
    category: 'Legendary',
    weaknesses: [
      { type: 'Electric', multiplier: '1.6x' },
      { type: 'Grass', multiplier: '1.6x' },
    ],
    counterSearch: '@1electric,@2electric,@1grass,@2grass',
    note: 'Prioritize Electric (Kartana, Zekrom, Xurkitree). Grass is equally effective but fewer top options.',
  },
  {
    id: 'solgaleo',
    name: 'Solgaleo',
    dexNumber: 791,
    types: ['Psychic', 'Steel'],
    category: 'Legendary',
    weaknesses: [
      { type: 'Fire', multiplier: '1.6x' },
      { type: 'Ground', multiplier: '1.6x' },
      { type: 'Ghost', multiplier: '1.6x' },
      { type: 'Dark', multiplier: '1.6x' },
    ],
    counterSearch: '@1fire,@2fire,@1ground,@2ground,@1ghost,@2ghost,@1dark,@2dark',
    note: 'Many weaknesses to exploit. Reshiram, Chandelure (Ghost/Fire), Groudon, Darkrai all work.',
  },
  {
    id: 'kyurem',
    name: 'Kyurem',
    dexNumber: 646,
    types: ['Dragon', 'Ice'],
    category: 'Legendary',
    weaknesses: [
      { type: 'Fighting', multiplier: '1.6x' },
      { type: 'Rock', multiplier: '1.6x' },
      { type: 'Steel', multiplier: '1.6x' },
      { type: 'Dragon', multiplier: '1.6x' },
      { type: 'Fairy', multiplier: '1.6x' },
    ],
    counterSearch: '@1steel,@2steel,@1fighting,@2fighting,@1fairy,@2fairy,@1dragon,@2dragon',
    note: 'Many weaknesses. Steel (Metagross) and Fighting (Lucario, Terrakion) are safest. Dragon hits hard but takes SE back.',
  },

  // ── Shadow Raids ───────────────────────────────────────────────────────────
  {
    id: 'shadow-palkia',
    name: 'Shadow Palkia',
    dexNumber: 484,
    types: ['Water', 'Dragon'],
    category: 'Legendary',
    weaknesses: [
      { type: 'Dragon', multiplier: '1.6x' },
      { type: 'Fairy', multiplier: '1.6x' },
    ],
    counterSearch: '@1dragon,@2dragon,@1fairy,@2fairy',
    note: 'Dragon and Fairy equally effective. Dragon counters hit hard but take SE damage back. Fairy is safer.',
  },

  // ── Mega Raids ─────────────────────────────────────────────────────────────
  {
    id: 'mega-lucario',
    name: 'Mega Lucario',
    dexNumber: 448,
    types: ['Fighting', 'Steel'],
    category: 'Mega',
    weaknesses: [
      { type: 'Fire', multiplier: '1.6x' },
      { type: 'Fighting', multiplier: '1.6x' },
      { type: 'Ground', multiplier: '1.6x' },
    ],
    counterSearch: '@1fire,@2fire,@1fighting,@2fighting,@1ground,@2ground',
    note: 'Fire is best (Reshiram, Chandelure). Ground (Groudon) and Fighting (Conkeldurr) also strong.',
  },
  {
    id: 'mega-sceptile',
    name: 'Mega Sceptile',
    dexNumber: 254,
    types: ['Grass'],
    category: 'Mega',
    weaknesses: [
      { type: 'Fire', multiplier: '1.6x' },
      { type: 'Ice', multiplier: '1.6x' },
      { type: 'Poison', multiplier: '1.6x' },
      { type: 'Flying', multiplier: '1.6x' },
      { type: 'Bug', multiplier: '1.6x' },
    ],
    counterSearch: '@1fire,@2fire,@1ice,@2ice,@1flying,@2flying,@1poison,@2poison',
    note: 'Many weaknesses. Fire and Ice are the strongest options (Reshiram, Mamoswine, Galarian Darmanitan).',
  },
  {
    id: 'mega-salamence',
    name: 'Mega Salamence',
    dexNumber: 373,
    types: ['Dragon', 'Flying'],
    category: 'Mega',
    weaknesses: [
      { type: 'Ice', multiplier: '2.56x' },
      { type: 'Dragon', multiplier: '1.6x' },
      { type: 'Fairy', multiplier: '1.6x' },
      { type: 'Rock', multiplier: '1.6x' },
    ],
    counterSearch: '@1ice,@2ice,@1dragon,@2dragon,@1fairy,@2fairy,@1rock,@2rock',
    note: 'Double weak to Ice. Mamoswine, Galarian Darmanitan, and Glaceon are top picks. Dragon works but risky.',
  },
  {
    id: 'mega-aggron',
    name: 'Mega Aggron',
    dexNumber: 306,
    types: ['Steel'],
    category: 'Mega',
    weaknesses: [
      { type: 'Fire', multiplier: '1.6x' },
      { type: 'Fighting', multiplier: '1.6x' },
      { type: 'Ground', multiplier: '1.6x' },
    ],
    counterSearch: '@1fire,@2fire,@1fighting,@2fighting,@1ground,@2ground',
    note: 'Same weaknesses as Lucario. Reshiram, Groudon, Conkeldurr, Lucario all strong picks.',
  },

  // ── Dynamax (Max Mondays) ──────────────────────────────────────────────────
  {
    id: 'dynamax-chansey',
    name: 'Dynamax Chansey',
    dexNumber: 113,
    types: ['Normal'],
    category: 'Dynamax',
    weaknesses: [
      { type: 'Fighting', multiplier: '1.6x' },
    ],
    counterSearch: '@1fighting,@2fighting',
    note: 'Only weak to Fighting. Machamp, Lucario, Conkeldurr. Chansey is extremely bulky — bring your best.',
  },
  {
    id: 'dynamax-deino',
    name: 'Dynamax Deino',
    dexNumber: 633,
    types: ['Dark', 'Dragon'],
    category: 'Dynamax',
    weaknesses: [
      { type: 'Fairy', multiplier: '2.56x' },
      { type: 'Fighting', multiplier: '1.6x' },
      { type: 'Bug', multiplier: '1.6x' },
      { type: 'Ice', multiplier: '1.6x' },
      { type: 'Dragon', multiplier: '1.6x' },
    ],
    counterSearch: '@1fairy,@2fairy,@1fighting,@2fighting,@1ice,@2ice,@1dragon,@2dragon',
    note: 'Double weak to Fairy. Gardevoir, Togekiss, Sylveon demolish it. Fighting and Ice also strong.',
  },
  {
    id: 'dynamax-trubbish',
    name: 'Dynamax Trubbish',
    dexNumber: 568,
    types: ['Poison'],
    category: 'Dynamax',
    weaknesses: [
      { type: 'Ground', multiplier: '1.6x' },
      { type: 'Psychic', multiplier: '1.6x' },
    ],
    counterSearch: '@1ground,@2ground,@1psychic,@2psychic',
    note: 'Ground and Psychic. Groudon, Garchomp, Mewtwo, Espeon all work well.',
  },
  {
    id: 'dynamax-feebas',
    name: 'Dynamax Feebas',
    dexNumber: 349,
    types: ['Water'],
    category: 'Dynamax',
    weaknesses: [
      { type: 'Electric', multiplier: '1.6x' },
      { type: 'Grass', multiplier: '1.6x' },
    ],
    counterSearch: '@1electric,@2electric,@1grass,@2grass',
    note: 'Same as Kyogre counters — Electric and Grass. Zekrom, Kartana, Roserade.',
  },

  // ── Other (kept from before) ───────────────────────────────────────────────
  {
    id: 'pikachu',
    name: 'Pikachu',
    dexNumber: 25,
    types: ['Electric'],
    category: 'Regular',
    weaknesses: [
      { type: 'Ground', multiplier: '1.6x' },
    ],
    counterSearch: '@1ground,@2ground',
    note: 'Only weak to Ground. Garchomp, Groudon, Excadrill, Landorus.',
  },
];
