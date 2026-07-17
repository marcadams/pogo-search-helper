// Base stats for popular PvP Pokemon
// Source: pokemongo.fandom.com / gamepress
export type PvpMon = {
  id: string;
  name: string;
  dexNumber: number;
  baseAtk: number;
  baseDef: number;
  baseHp: number;
};

export const pvpMons: PvpMon[] = [
  // Great League staples
  { id: 'medicham', name: 'Medicham', dexNumber: 308, baseAtk: 121, baseDef: 152, baseHp: 155 },
  { id: 'azumarill', name: 'Azumarill', dexNumber: 184, baseAtk: 112, baseDef: 152, baseHp: 225 },
  { id: 'galarian-stunfisk', name: 'Galarian Stunfisk', dexNumber: 618, baseAtk: 144, baseDef: 171, baseHp: 240 },
  { id: 'registeel', name: 'Registeel', dexNumber: 379, baseAtk: 143, baseDef: 285, baseHp: 190 },
  { id: 'altaria', name: 'Altaria', dexNumber: 334, baseAtk: 141, baseDef: 201, baseHp: 181 },
  { id: 'swampert', name: 'Swampert', dexNumber: 260, baseAtk: 208, baseDef: 175, baseHp: 225 },
  { id: 'bastiodon', name: 'Bastiodon', dexNumber: 411, baseAtk: 94, baseDef: 286, baseHp: 155 },
  { id: 'sableye', name: 'Sableye', dexNumber: 302, baseAtk: 141, baseDef: 136, baseHp: 137 },
  { id: 'trevenant', name: 'Trevenant', dexNumber: 709, baseAtk: 201, baseDef: 154, baseHp: 198 },
  { id: 'lickitung', name: 'Lickitung', dexNumber: 108, baseAtk: 108, baseDef: 137, baseHp: 207 },
  { id: 'umbreon', name: 'Umbreon', dexNumber: 197, baseAtk: 126, baseDef: 240, baseHp: 216 },
  { id: 'skarmory', name: 'Skarmory', dexNumber: 227, baseAtk: 148, baseDef: 226, baseHp: 163 },
  { id: 'whiscash', name: 'Whiscash', dexNumber: 340, baseAtk: 151, baseDef: 141, baseHp: 242 },
  { id: 'walrein', name: 'Walrein', dexNumber: 365, baseAtk: 182, baseDef: 176, baseHp: 242 },
  { id: 'noctowl', name: 'Noctowl', dexNumber: 164, baseAtk: 145, baseDef: 156, baseHp: 225 },
  { id: 'annihilape', name: 'Annihilape', dexNumber: 979, baseAtk: 220, baseDef: 169, baseHp: 242 },
  // Ultra League staples
  { id: 'giratina-altered', name: 'Giratina (Altered)', dexNumber: 487, baseAtk: 187, baseDef: 225, baseHp: 284 },
  { id: 'cresselia', name: 'Cresselia', dexNumber: 488, baseAtk: 152, baseDef: 258, baseHp: 260 },
  { id: 'talonflame', name: 'Talonflame', dexNumber: 663, baseAtk: 176, baseDef: 155, baseHp: 186 },
  { id: 'jellicent', name: 'Jellicent', dexNumber: 593, baseAtk: 159, baseDef: 178, baseHp: 225 },
  { id: 'poliwrath', name: 'Poliwrath', dexNumber: 62, baseAtk: 182, baseDef: 184, baseHp: 207 },
  { id: 'cobalion', name: 'Cobalion', dexNumber: 638, baseAtk: 192, baseDef: 229, baseHp: 209 },
  { id: 'machamp', name: 'Machamp', dexNumber: 68, baseAtk: 234, baseDef: 159, baseHp: 207 },
  // Common across leagues
  { id: 'garchomp', name: 'Garchomp', dexNumber: 445, baseAtk: 261, baseDef: 193, baseHp: 239 },
  { id: 'mewtwo', name: 'Mewtwo', dexNumber: 150, baseAtk: 300, baseDef: 182, baseHp: 214 },
  { id: 'dialga', name: 'Dialga', dexNumber: 483, baseAtk: 275, baseDef: 211, baseHp: 205 },
  { id: 'togekiss', name: 'Togekiss', dexNumber: 468, baseAtk: 225, baseDef: 217, baseHp: 198 },
  { id: 'sylveon', name: 'Sylveon', dexNumber: 700, baseAtk: 203, baseDef: 205, baseHp: 216 },
  { id: 'dragonite', name: 'Dragonite', dexNumber: 149, baseAtk: 263, baseDef: 198, baseHp: 209 },
  { id: 'lucario', name: 'Lucario', dexNumber: 448, baseAtk: 236, baseDef: 144, baseHp: 172 },
  { id: 'charjabug', name: 'Charjabug', dexNumber: 737, baseAtk: 145, baseDef: 161, baseHp: 174 },
  { id: 'feraligatr', name: 'Feraligatr', dexNumber: 160, baseAtk: 205, baseDef: 188, baseHp: 198 },
  { id: 'venusaur', name: 'Venusaur', dexNumber: 3, baseAtk: 198, baseDef: 189, baseHp: 190 },
  { id: 'charizard', name: 'Charizard', dexNumber: 6, baseAtk: 223, baseDef: 173, baseHp: 186 },
  { id: 'pidgeot', name: 'Pidgeot', dexNumber: 18, baseAtk: 166, baseDef: 154, baseHp: 195 },
  { id: 'steelix', name: 'Steelix', dexNumber: 208, baseAtk: 148, baseDef: 272, baseHp: 181 },
  { id: 'toxicroak', name: 'Toxicroak', dexNumber: 454, baseAtk: 211, baseDef: 133, baseHp: 195 },
  { id: 'scrafty', name: 'Scrafty', dexNumber: 560, baseAtk: 163, baseDef: 222, baseHp: 163 },
  { id: 'mandibuzz', name: 'Mandibuzz', dexNumber: 630, baseAtk: 129, baseDef: 205, baseHp: 242 },
  { id: 'carbink', name: 'Carbink', dexNumber: 703, baseAtk: 95, baseDef: 285, baseHp: 137 },
];

// CP multipliers by half-level (level 1 = index 0, 1.5 = index 1, etc.)
export const cpmByLevel: number[] = [
  0.094,  0.13513744, 0.16639787, 0.19265091, 0.21573247,
  0.23657266, 0.25572005, 0.27353038, 0.29024988, 0.30605738,
  0.3210876,  0.33544503, 0.34921268, 0.36245776, 0.3752356,
  0.38759242, 0.39956728, 0.41119355, 0.4225,     0.43292641,
  0.44310755, 0.45305996, 0.46279839, 0.47233608, 0.48168495,
  0.49085581, 0.49985844, 0.50870176, 0.51739395, 0.52594251,
  0.53435433, 0.54263576, 0.55079269, 0.55883060, 0.56675452,
  0.57456912, 0.58227891, 0.58988812, 0.59740001, 0.60481860,
  0.61215729, 0.61941595, 0.62659894, 0.63370973, 0.64075050,
  0.64772201, 0.65462830, 0.66147029, 0.66824940, 0.67496601,
  0.68162170, 0.68821716, 0.69475311, 0.70123023, 0.70764929,
  0.71401101, 0.72031612, 0.72656534, 0.73275942, 0.73889911,
  0.74498516, 0.75101829, 0.75699925, 0.76292877, 0.76880758,
  0.77463641, 0.78041600, 0.78614706, 0.79183030, 0.79746642,
  0.80305612, 0.80860010, 0.81409904, 0.81955361, 0.82496449,
  0.83033234, 0.83565782, 0.84094158, 0.84618427, 0.85138654,
  0.85654903, 0.86167234, 0.86675711, 0.87180394, 0.87681342,
  0.88178615, 0.88672271, 0.89162367, 0.89648960, 0.90132104,
];

// Extended roster - Gen 1
export const pvpMonsExtended: PvpMon[] = [
  { id: 'bulbasaur', name: 'Bulbasaur', dexNumber: 1, baseAtk: 118, baseDef: 111, baseHp: 128 },
  { id: 'ivysaur', name: 'Ivysaur', dexNumber: 2, baseAtk: 151, baseDef: 143, baseHp: 155 },
  { id: 'blastoise', name: 'Blastoise', dexNumber: 9, baseAtk: 171, baseDef: 207, baseHp: 188 },
  { id: 'pikachu', name: 'Pikachu', dexNumber: 25, baseAtk: 112, baseDef: 96, baseHp: 111 },
  { id: 'raichu', name: 'Raichu', dexNumber: 26, baseAtk: 193, baseDef: 151, baseHp: 155 },
  { id: 'nidoqueen', name: 'Nidoqueen', dexNumber: 31, baseAtk: 180, baseDef: 173, baseHp: 207 },
  { id: 'nidoking', name: 'Nidoking', dexNumber: 34, baseAtk: 204, baseDef: 156, baseHp: 191 },
  { id: 'clefable', name: 'Clefable', dexNumber: 36, baseAtk: 178, baseDef: 162, baseHp: 216 },
  { id: 'wigglytuff', name: 'Wigglytuff', dexNumber: 40, baseAtk: 156, baseDef: 90, baseHp: 295 },
  { id: 'hypno', name: 'Hypno', dexNumber: 97, baseAtk: 144, baseDef: 193, baseHp: 198 },
  { id: 'dewgong', name: 'Dewgong', dexNumber: 87, baseAtk: 139, baseDef: 177, baseHp: 207 },
  { id: 'muk', name: 'Muk', dexNumber: 89, baseAtk: 190, baseDef: 172, baseHp: 233 },
  { id: 'alolan-muk', name: 'Alolan Muk', dexNumber: 89, baseAtk: 190, baseDef: 172, baseHp: 233 },
  { id: 'gengar', name: 'Gengar', dexNumber: 94, baseAtk: 261, baseDef: 149, baseHp: 155 },
  { id: 'electrode', name: 'Electrode', dexNumber: 101, baseAtk: 173, baseDef: 173, baseHp: 155 },
  { id: 'chansey', name: 'Chansey', dexNumber: 113, baseAtk: 60, baseDef: 128, baseHp: 487 },
  { id: 'kangaskhan', name: 'Kangaskhan', dexNumber: 115, baseAtk: 181, baseDef: 165, baseHp: 233 },
  { id: 'scyther', name: 'Scyther', dexNumber: 123, baseAtk: 218, baseDef: 170, baseHp: 172 },
  { id: 'lapras', name: 'Lapras', dexNumber: 131, baseAtk: 165, baseDef: 174, baseHp: 277 },
  { id: 'snorlax', name: 'Snorlax', dexNumber: 143, baseAtk: 190, baseDef: 169, baseHp: 330 },
  { id: 'gyarados', name: 'Gyarados', dexNumber: 130, baseAtk: 237, baseDef: 186, baseHp: 216 },
  // Gen 2
  { id: 'typhlosion', name: 'Typhlosion', dexNumber: 157, baseAtk: 223, baseDef: 173, baseHp: 186 },
  { id: 'meganium', name: 'Meganium', dexNumber: 154, baseAtk: 168, baseDef: 202, baseHp: 190 },
  { id: 'lanturn', name: 'Lanturn', dexNumber: 171, baseAtk: 146, baseDef: 137, baseHp: 268 },
  { id: 'quagsire', name: 'Quagsire', dexNumber: 195, baseAtk: 152, baseDef: 143, baseHp: 216 },
  { id: 'scizor', name: 'Scizor', dexNumber: 212, baseAtk: 236, baseDef: 181, baseHp: 172 },
  { id: 'heracross', name: 'Heracross', dexNumber: 214, baseAtk: 234, baseDef: 179, baseHp: 190 },
  { id: 'blissey', name: 'Blissey', dexNumber: 242, baseAtk: 129, baseDef: 169, baseHp: 496 },
  { id: 'tyranitar', name: 'Tyranitar', dexNumber: 248, baseAtk: 251, baseDef: 207, baseHp: 225 },
  { id: 'lugia', name: 'Lugia', dexNumber: 249, baseAtk: 193, baseDef: 310, baseHp: 235 },
  { id: 'ho-oh', name: 'Ho-Oh', dexNumber: 250, baseAtk: 239, baseDef: 244, baseHp: 214 },
  // Gen 3
  { id: 'blaziken', name: 'Blaziken', dexNumber: 257, baseAtk: 240, baseDef: 141, baseHp: 190 },
  { id: 'sceptile', name: 'Sceptile', dexNumber: 254, baseAtk: 223, baseDef: 169, baseHp: 172 },
  { id: 'gardevoir', name: 'Gardevoir', dexNumber: 282, baseAtk: 237, baseDef: 195, baseHp: 169 },
  { id: 'aggron', name: 'Aggron', dexNumber: 306, baseAtk: 198, baseDef: 257, baseHp: 172 },
  { id: 'flygon', name: 'Flygon', dexNumber: 330, baseAtk: 205, baseDef: 168, baseHp: 190 },
  { id: 'milotic', name: 'Milotic', dexNumber: 350, baseAtk: 192, baseDef: 219, baseHp: 216 },
  { id: 'salamence', name: 'Salamence', dexNumber: 373, baseAtk: 277, baseDef: 168, baseHp: 216 },
  { id: 'metagross', name: 'Metagross', dexNumber: 376, baseAtk: 257, baseDef: 228, baseHp: 190 },
  { id: 'rayquaza', name: 'Rayquaza', dexNumber: 384, baseAtk: 284, baseDef: 170, baseHp: 213 },
  { id: 'kyogre', name: 'Kyogre', dexNumber: 382, baseAtk: 270, baseDef: 228, baseHp: 205 },
  { id: 'groudon', name: 'Groudon', dexNumber: 383, baseAtk: 270, baseDef: 228, baseHp: 205 },
  // Gen 4
  { id: 'torterra', name: 'Torterra', dexNumber: 389, baseAtk: 202, baseDef: 188, baseHp: 216 },
  { id: 'infernape', name: 'Infernape', dexNumber: 392, baseAtk: 222, baseDef: 151, baseHp: 183 },
  { id: 'empoleon', name: 'Empoleon', dexNumber: 395, baseAtk: 210, baseDef: 186, baseHp: 197 },
  { id: 'roserade', name: 'Roserade', dexNumber: 407, baseAtk: 243, baseDef: 185, baseHp: 155 },
  { id: 'rhyperior', name: 'Rhyperior', dexNumber: 464, baseAtk: 241, baseDef: 190, baseHp: 251 },
  { id: 'electivire', name: 'Electivire', dexNumber: 466, baseAtk: 249, baseDef: 163, baseHp: 181 },
  { id: 'magmortar', name: 'Magmortar', dexNumber: 467, baseAtk: 247, baseDef: 172, baseHp: 181 },
  { id: 'mamoswine', name: 'Mamoswine', dexNumber: 473, baseAtk: 247, baseDef: 146, baseHp: 242 },
  { id: 'gallade', name: 'Gallade', dexNumber: 475, baseAtk: 237, baseDef: 195, baseHp: 169 },
  { id: 'darkrai', name: 'Darkrai', dexNumber: 491, baseAtk: 285, baseDef: 198, baseHp: 172 },
  // Gen 5
  { id: 'serperior', name: 'Serperior', dexNumber: 497, baseAtk: 161, baseDef: 204, baseHp: 181 },
  { id: 'samurott', name: 'Samurott', dexNumber: 503, baseAtk: 212, baseDef: 157, baseHp: 216 },
  { id: 'excadrill', name: 'Excadrill', dexNumber: 530, baseAtk: 255, baseDef: 129, baseHp: 242 },
  { id: 'conkeldurr', name: 'Conkeldurr', dexNumber: 534, baseAtk: 243, baseDef: 158, baseHp: 233 },
  { id: 'chandelure', name: 'Chandelure', dexNumber: 609, baseAtk: 271, baseDef: 182, baseHp: 155 },
  { id: 'haxorus', name: 'Haxorus', dexNumber: 612, baseAtk: 284, baseDef: 172, baseHp: 183 },
  { id: 'hydreigon', name: 'Hydreigon', dexNumber: 635, baseAtk: 256, baseDef: 188, baseHp: 211 },
  { id: 'reshiram', name: 'Reshiram', dexNumber: 643, baseAtk: 275, baseDef: 211, baseHp: 205 },
  { id: 'zekrom', name: 'Zekrom', dexNumber: 644, baseAtk: 275, baseDef: 211, baseHp: 205 },
  { id: 'landorus', name: 'Landorus', dexNumber: 645, baseAtk: 261, baseDef: 182, baseHp: 205 },
  // Gen 6+
  { id: 'greninja', name: 'Greninja', dexNumber: 658, baseAtk: 223, baseDef: 152, baseHp: 176 },
  { id: 'talonflame-pvp', name: 'Talonflame', dexNumber: 663, baseAtk: 176, baseDef: 155, baseHp: 186 },
  { id: 'goodra', name: 'Goodra', dexNumber: 706, baseAtk: 220, baseDef: 242, baseHp: 207 },
  { id: 'zygarde-50', name: 'Zygarde (50%)', dexNumber: 718, baseAtk: 203, baseDef: 232, baseHp: 239 },
  { id: 'decidueye', name: 'Decidueye', dexNumber: 724, baseAtk: 210, baseDef: 179, baseHp: 186 },
  { id: 'incineroar', name: 'Incineroar', dexNumber: 727, baseAtk: 214, baseDef: 175, baseHp: 216 },
  { id: 'primarina', name: 'Primarina', dexNumber: 730, baseAtk: 232, baseDef: 195, baseHp: 190 },
  { id: 'kommo-o', name: 'Kommo-o', dexNumber: 784, baseAtk: 222, baseDef: 240, baseHp: 181 },
];

// Merge all into one sorted list
pvpMons.push(...pvpMonsExtended);
pvpMons.sort((a, b) => a.name.localeCompare(b.name));
