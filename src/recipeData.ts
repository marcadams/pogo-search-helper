export type Recipe = {
  id: string;
  name: string;
  string: string;
  description: string;
  category: string;
};

export const recipes: Recipe[] = [
  { id: 'trash-low-iv', name: 'Low IV trash', string: '0*,1*&!shiny&!legendary&!mythical&!favorite', description: 'All 0- and 1-star not shiny, legendary, mythical, or favorited. Safe to mass-transfer.', category: 'Bulk Transfer' },
  { id: 'old-dupes', name: 'Old duplicates', string: '0*,1*,2*&!shiny&!favorite&age31-&count2-', description: 'Low-IV kept over a month with duplicates. Prime transfer candidates.', category: 'Bulk Transfer' },
  { id: 'event-costume-trash', name: 'Costumed low-IV', string: 'costume&0*,1*&!shiny&!favorite', description: 'Low-IV costumed Pokemon. Cannot evolve them, so only keep favorites.', category: 'Bulk Transfer' },
  { id: 'gl-candidates', name: 'Great League IVs', string: '0attack&3defense,4defense&3hp,4hp&cp-1500', description: 'Low attack + high def/HP in GL range. The ideal PvP stat spread.', category: 'PvP Hunting' },
  { id: 'ul-candidates', name: 'Ultra League candidates', string: '3*,4*&cp1500-2500', description: 'High-IV Pokemon in the Ultra League CP range.', category: 'PvP Hunting' },
  { id: 'ml-powerhouses', name: 'Master League ready', string: '4*&cp2500-', description: 'Perfect IV Pokemon already at 2500+ CP. Your Master League core.', category: 'PvP Hunting' },
  { id: 'shiny-low-iv', name: 'Low-IV shinies', string: 'shiny&0*,1*', description: 'Shinies with bad IVs. Keep for trades or living dex.', category: 'Shiny Management' },
  { id: 'shiny-dupes', name: 'Shiny duplicates', string: 'shiny&count2-', description: 'Species where you have 2+ shinies. Great trade fodder.', category: 'Shiny Management' },
  { id: 'evolve-new-dex', name: 'Evolve for new dex entries', string: 'evolvenew', description: 'Pokemon that will fill a new Pokedex slot when evolved. Priority evolves.', category: 'Evolution Session' },
  { id: 'evolve-mass', name: 'Bulk evolve (XP grind)', string: 'evolve&!legendary&!mythical&!shadow&!favorite', description: 'Everything you can evolve minus valuables. Pop a Lucky Egg and go.', category: 'Evolution Session' },
  { id: 'trade-evolve-free', name: 'Free trade evolves', string: 'tradeevolve&traded', description: 'Traded Pokemon you can evolve for free. No candy cost.', category: 'Evolution Session' },
  { id: 'shadow-good-iv', name: 'Shadows worth keeping', string: 'shadow&3*,4*', description: 'High-IV shadows. Shadow bonus is 20% extra damage in raids.', category: 'Shadow & Purification' },
  { id: 'purify-cheap', name: 'Cheap purification', string: 'shadow&!3*&!4*&!shiny', description: 'Low-IV non-shiny shadows. Purify for the medal, then transfer.', category: 'Shadow & Purification' },
  { id: 'distance-trades', name: 'Distance trade fodder', string: 'distance100-&!favorite&!shiny&!legendary', description: 'Caught 100+ km away. Trade for 3 candy per trade and pilot medal.', category: 'Trading Prep' },
  { id: 'lucky-trade-targets', name: 'Lucky trade candidates', string: 'age2016,age2017,age2018&!lucky&!favorite', description: 'Old Pokemon from 2016-2018 have higher lucky rates. Save for trades.', category: 'Trading Prep' },
  { id: 'hundos', name: 'All perfect Pokemon', string: '4*', description: 'Your 100% IV collection. Never transfer these.', category: 'Quick Checks' },
  { id: 'nundos', name: 'All zero IV (nundos)', string: '0*&0attack&0defense&0hp', description: 'The rarest finds: 0/0/0 IVs. Collectors treasure these.', category: 'Quick Checks' },
  { id: 'legacy-moves', name: 'Legacy / special moves', string: '@special', description: 'Pokemon with exclusive moves (Community Day, events). High trade value.', category: 'Quick Checks' },
  { id: 'mega-ready', name: 'Mega-ready (never mega-evolved)', string: 'megaevolve&mega0&3*,4*', description: 'Good-IV Pokemon you can Mega Evolve but have not yet. Start building levels.', category: 'Quick Checks' },
];
